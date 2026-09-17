import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentApplication } from "@/lib/project-form/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ imageId: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const application = await currentApplication();
  const { imageId } = await params;
  if (!application) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const image = await prisma.projectImage.findFirst({ where: { id: imageId, applicationId: application.id } });
  if (!image) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return new NextResponse(new Uint8Array(image.data), { headers: { "Content-Type": image.mimeType, "Content-Length": String(image.size), "Cache-Control": "private, max-age=3600" } });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const application = await currentApplication();
  const { imageId } = await params;
  if (!application || application.status === "SUBMITTED") return NextResponse.json({ error: "Not found." }, { status: 404 });
  const result = await prisma.projectImage.deleteMany({ where: { id: imageId, applicationId: application.id } });
  if (!result.count) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ removed: true });
}
