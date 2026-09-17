import { cookies } from "next/headers";
import { type Prisma, type Track } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { emptyProjectFormValues, type ProjectFormValues } from "./types";

const FORM_COOKIE = "gdg_noida_project_form";
type ApplicationWithDetails = Prisma.ApplicationGetPayload<{ include: { teamMembers: true; businessFair: true; startupProject: true; hardwareProject: true; roboDetails: true; projectImages: { select: { id: true; filename: true; mimeType: true; size: true } } } }>;

function text(value: string | null | undefined): string { return value ?? ""; }
function detail<T extends object>(source: T | null, key: keyof T): string { const value = source?.[key]; return typeof value === "string" ? value : ""; }

export function serializeApplication(application: ApplicationWithDetails) {
  const values: ProjectFormValues = {
    ...emptyProjectFormValues,
    name: text(application.name), email: text(application.email), phoneNumber: text(application.phoneNumber), applicantType: application.applicantType ?? "",
    organizationName: text(application.organizationName), city: text(application.city), teamName: text(application.teamName), numberOfTeamMembers: application.numberOfTeamMembers ?? "",
    teamMembers: application.teamMembers.map(({ name, emailOrContact }) => ({ name, emailOrContact })), selectedTrack: application.selectedTrack ?? "",
    business: { businessName: detail(application.businessFair, "businessName"), founderName: detail(application.businessFair, "founderName"), businessCategory: detail(application.businessFair, "businessCategory"), businessDescription: detail(application.businessFair, "businessDescription"), showcaseDescription: detail(application.businessFair, "showcaseDescription"), socialMediaUrl: detail(application.businessFair, "socialMediaUrl"), stallRequirements: application.businessFair?.stallRequirements ?? [], specialRequirements: detail(application.businessFair, "specialRequirements"), additionalInformation: detail(application.businessFair, "additionalInformation") },
    startup: { showcaseType: detail(application.startupProject, "showcaseType"), projectName: detail(application.startupProject, "projectName"), oneLineDescription: detail(application.startupProject, "oneLineDescription"), problemStatement: detail(application.startupProject, "problemStatement"), solutionDescription: detail(application.startupProject, "solutionDescription"), techStack: detail(application.startupProject, "techStack"), currentStage: detail(application.startupProject, "currentStage"), githubUrl: detail(application.startupProject, "githubUrl"), liveDemoUrl: detail(application.startupProject, "liveDemoUrl"), showcaseRequirements: application.startupProject?.showcaseRequirements ?? [], additionalInformation: detail(application.startupProject, "additionalInformation") },
    hardware: { projectName: detail(application.hardwareProject, "projectName"), oneLineDescription: detail(application.hardwareProject, "oneLineDescription"), problemStatement: detail(application.hardwareProject, "problemStatement"), projectDescription: detail(application.hardwareProject, "projectDescription"), hardwareComponents: detail(application.hardwareProject, "hardwareComponents"), techStack: detail(application.hardwareProject, "techStack"), currentStage: detail(application.hardwareProject, "currentStage"), demoUrl: detail(application.hardwareProject, "demoUrl"), setupRequirements: application.hardwareProject?.setupRequirements ?? [], specialRequirements: detail(application.hardwareProject, "specialRequirements"), additionalInformation: detail(application.hardwareProject, "additionalInformation") },
    robo: { teamName: detail(application.roboDetails, "teamName"), organizationName: detail(application.roboDetails, "organizationName"), competitionCategory: detail(application.roboDetails, "competitionCategory"), robotName: detail(application.roboDetails, "robotName"), robotSpecifications: detail(application.roboDetails, "robotSpecifications"), powerSourceDetails: detail(application.roboDetails, "powerSourceDetails"), controllerDetails: detail(application.roboDetails, "controllerDetails"), robotDescription: detail(application.roboDetails, "robotDescription"), demoUrl: detail(application.roboDetails, "demoUrl"), equipmentRequirements: application.roboDetails?.equipmentRequirements ?? [], specialRequirements: detail(application.roboDetails, "specialRequirements") },
  };
  return { id: application.id, status: application.status, currentStep: application.currentStep, values, images: application.projectImages };
}

export async function currentApplication() {
  const token = (await cookies()).get(FORM_COOKIE)?.value;
  if (!token) return null;
  return prisma.application.findUnique({ where: { accessToken: token }, include: { teamMembers: true, businessFair: true, startupProject: true, hardwareProject: true, roboDetails: true, projectImages: { select: { id: true, filename: true, mimeType: true, size: true } } } });
}

export async function setApplicationCookie(accessToken: string) {
  (await cookies()).set(FORM_COOKIE, accessToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
}

export function trackToPrisma(track: ProjectFormValues["selectedTrack"]): Track | null {
  return track || null;
}
