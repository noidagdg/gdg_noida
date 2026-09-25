import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { completeApplicationSchema, draftRequestSchema } from "@/lib/project-form/schema";
import { currentApplication, serializeApplication, setApplicationCookie, trackToPrisma } from "@/lib/project-form/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const detailInclude = { teamMembers: true, businessFair: true, startupProject: true, hardwareProject: true, roboDetails: true, projectImages: { select: { id: true, filename: true, mimeType: true, size: true } } } satisfies Prisma.ApplicationInclude;

export async function GET() {
  try {
    const application = await currentApplication();
    return NextResponse.json({ application: application ? serializeApplication(application) : null });
  } catch {
    return NextResponse.json({ error: "We could not load your saved application." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const parsed = draftRequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "The draft data is invalid." }, { status: 400 });
    const { values, currentStep } = parsed.data;
    const existing = await currentApplication();
    if (existing?.status === "SUBMITTED") return NextResponse.json({ error: "This application has already been submitted." }, { status: 409 });
    const selectedTrack = trackToPrisma(values.selectedTrack);
    const trackChanged = Boolean(existing?.selectedTrack && selectedTrack && existing.selectedTrack !== selectedTrack);
    const basicData = {
      currentStep, selectedTrack, name: values.name || null, email: values.email || null, phoneNumber: values.phoneNumber || null,
      applicantType: values.applicantType || null, organizationName: values.organizationName || null, city: values.city || null,
      teamName: values.teamName || null, numberOfTeamMembers: values.numberOfTeamMembers === "" ? null : values.numberOfTeamMembers,
    };
    const application = await prismaSave(existing?.id, basicData, values, trackChanged, false);
    if (!existing) await setApplicationCookie(application.accessToken);
    return NextResponse.json({ application: serializeApplication(application) });
  } catch {
    return NextResponse.json({ error: "We could not save your draft. Please try again." }, { status: 500 });
  }
}

async function prismaSave(
  existingId: string | undefined,
  basicData: { currentStep: number; selectedTrack: ReturnType<typeof trackToPrisma>; name: string | null; email: string | null; phoneNumber: string | null; applicantType: "STUDENT" | "WORKING_PROFESSIONAL" | "ENTREPRENEUR_FOUNDER" | "OTHER" | null; organizationName: string | null; city: string | null; teamName: string | null; numberOfTeamMembers: number | null },
  values: ReturnType<typeof draftRequestSchema.parse>["values"],
  trackChanged: boolean,
  submit: boolean,
) {
  return prisma.$transaction(async (tx) => {
    const application = existingId
      ? await tx.application.update({ where: { id: existingId }, data: { ...basicData, ...(submit ? { status: "SUBMITTED", submittedAt: new Date() } : {}) } })
      : await tx.application.create({ data: { ...basicData, ...(submit ? { status: "SUBMITTED", submittedAt: new Date() } : {}) } });
    if (trackChanged) {
      await Promise.all([tx.businessFairDetails.deleteMany({ where: { applicationId: application.id } }), tx.startupProjectDetails.deleteMany({ where: { applicationId: application.id } }), tx.hardwareProjectDetails.deleteMany({ where: { applicationId: application.id } }), tx.roboDetails.deleteMany({ where: { applicationId: application.id } }), tx.projectImage.deleteMany({ where: { applicationId: application.id } })]);
    }
    await tx.teamMember.deleteMany({ where: { applicationId: application.id } });
    if (values.teamMembers.length) await tx.teamMember.createMany({ data: values.teamMembers.map((member) => ({ applicationId: application.id, ...member })) });
    if (basicData.selectedTrack === "BUSINESS_FAIR") await tx.businessFairDetails.upsert({ where: { applicationId: application.id }, create: { applicationId: application.id, ...values.business }, update: values.business });
    if (basicData.selectedTrack === "STARTUPS_PROJECTS_OSS") await tx.startupProjectDetails.upsert({ where: { applicationId: application.id }, create: { applicationId: application.id, ...values.startup }, update: values.startup });
    if (basicData.selectedTrack === "HARDWARE_PROJECTS") await tx.hardwareProjectDetails.upsert({ where: { applicationId: application.id }, create: { applicationId: application.id, ...values.hardware }, update: values.hardware });
    if (basicData.selectedTrack === "ROBO_RACE_WAR") await tx.roboDetails.upsert({ where: { applicationId: application.id }, create: { applicationId: application.id, ...values.robo }, update: values.robo });
    return tx.application.findUniqueOrThrow({ where: { id: application.id }, include: detailInclude });
  });
}

export async function POST(request: Request) {
  try {
    const draft = draftRequestSchema.safeParse(await request.json());
    if (!draft.success) return NextResponse.json({ error: "The application data is invalid." }, { status: 400 });
    const { values } = draft.data;
    const basic = { ...values, numberOfTeamMembers: values.numberOfTeamMembers === "" ? null : values.numberOfTeamMembers };
    const validation = completeApplicationSchema.safeParse({ basic: { name: basic.name, email: basic.email, phoneNumber: basic.phoneNumber, applicantType: basic.applicantType, organizationName: basic.organizationName, city: basic.city, teamName: basic.teamName, numberOfTeamMembers: basic.numberOfTeamMembers, teamMembers: basic.teamMembers }, selectedTrack: values.selectedTrack, business: values.business, startup: values.startup, hardware: values.hardware, robo: values.robo });
    if (!validation.success) return NextResponse.json({ error: "Please correct the highlighted fields before submitting." }, { status: 400 });
    const existing = await currentApplication();
    if (!existing) return NextResponse.json({ error: "Save your application before submitting." }, { status: 400 });
    if (existing.status === "SUBMITTED") return NextResponse.json({ error: "This application has already been submitted." }, { status: 409 });
    if (values.selectedTrack === "HARDWARE_PROJECTS") {
      const imageCount = await (await import("@/lib/prisma")).prisma.projectImage.count({ where: { applicationId: existing.id } });
      if (!imageCount) return NextResponse.json({ error: "Upload at least one project image before submitting." }, { status: 400 });
    }
    const submitted = await prismaSave(existing.id, { currentStep: 4, selectedTrack: trackToPrisma(values.selectedTrack), name: values.name, email: values.email, phoneNumber: values.phoneNumber, applicantType: values.applicantType || null, organizationName: values.organizationName, city: values.city, teamName: values.teamName || null, numberOfTeamMembers: values.numberOfTeamMembers === "" ? null : values.numberOfTeamMembers }, values, false, true);
    return NextResponse.json({ application: serializeApplication(submitted), submitted: true });
  } catch {
    return NextResponse.json({ error: "We could not submit your application. Please try again." }, { status: 500 });
  }
}
