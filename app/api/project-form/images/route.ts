import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentApplication } from "@/lib/project-form/server";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const application = await currentApplication();
    if (!application) return NextResponse.json({ error: "Save the application before uploading images." }, { status: 400 });
    if (application.status === "SUBMITTED") return NextResponse.json({ error: "Submitted applications cannot be changed." }, { status: 409 });
    if (application.selectedTrack !== "HARDWARE_PROJECTS") return NextResponse.json({ error: "Project images are available for Hardware Projects only." }, { status: 400 });
    const formData = await request.formData();
    const files = formData.getAll("images").filter((value): value is File => value instanceof File);
    if (!files.length) return NextResponse.json({ error: "Choose at least one image." }, { status: 400 });
    if (files.some((file) => !ALLOWED_TYPES.has(file.type) || file.size > MAX_IMAGE_SIZE || file.size === 0)) return NextResponse.json({ error: "Upload JPEG, PNG, or WebP images up to 5 MB each." }, { status: 400 });
    const images = await Promise.all(files.map(async (file) => ({ applicationId: application.id, filename: file.name.slice(0, 255), mimeType: file.type, size: file.size, data: Buffer.from(await file.arrayBuffer()) })));
    const result = await prisma.projectImage.createManyAndReturn({ data: images, select: { id: true, filename: true, mimeType: true, size: true } });
    return NextResponse.json({ images: result }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The images could not be uploaded. Please try again." }, { status: 500 });
  }
}
