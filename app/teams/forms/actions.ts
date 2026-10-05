"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { CONSENT_VERSION, MAX_PHOTO_BYTES, PHOTO_BUCKET } from "@/lib/id-card/config";
import { slugCandidates, slugify } from "@/lib/id-card/utils/slug";
import { isPhotoMime, sniffImageType, buildPhotoObjectName } from "@/lib/id-card/validation/photo";
import { parseVolunteerForm } from "@/lib/id-card/validation/volunteer";
import { formString, type ActionState, errorState, successState } from "@/lib/id-card/validation/common";

export async function submitVolunteerFormAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("Supabase config error:", err);
    return errorState("The submission system is currently not connected. Please contact an organizer.");
  }

  // Ensure consent is marked granted
  const consentAgreed = formData.get("consent_agreed") === "on" || formData.get("consent_agreed") === "true";
  if (!consentAgreed) {
    return errorState("You must agree to the community consent terms to be listed in the volunteer directory.", {
      consent_agreed: "Please agree to the consent terms to proceed.",
    });
  }

  // Set consent_status explicitly to granted
  formData.set("consent_status", "granted");
  formData.set("is_published", "false"); // Submissions await admin review

  const parsed = parseVolunteerForm(formData);
  if (!parsed.ok) {
    return errorState("Please check the highlighted fields.", parsed.fieldErrors);
  }

  const baseSlug = slugify(parsed.data.full_name, 60);
  const candidates = slugCandidates(baseSlug, "volunteer");

  let createdId: string | null = null;
  const now = new Date().toISOString();

  for (const slug of candidates) {
    const insertPayload: Record<string, unknown> = {
      full_name: parsed.data.full_name,
      slug,
      team_id: parsed.data.team_id,
      public_role: parsed.data.public_role,
      bio: parsed.data.bio,
      skills: parsed.data.skills,
      social_links: parsed.data.social_links,
      is_published: false, // Default to unpublished until admin approves
      consent_status: "granted",
      consent_recorded_at: now,
      consent_version: CONSENT_VERSION,
    };

    const { data, error } = await supabase.from("volunteers").insert(insertPayload).select("id").maybeSingle();

    if (!error && data) {
      createdId = data.id as string;
      break;
    }

    if (error && error.code === "23505" && error.message.includes("slug")) {
      continue;
    }

    console.error("submitVolunteerFormAction insert error:", error);
    return errorState(error?.message || "Could not submit your details. Please try again.");
  }

  if (!createdId) {
    return errorState("Failed to create profile. Please try again with a slightly different name.");
  }

  // Handle Photo upload
  const photoFile = formData.get("photo") as File | null;
  if (photoFile && photoFile.size > 0) {
    if (photoFile.size > MAX_PHOTO_BYTES) {
      return errorState("Photo is too large (maximum 5MB). Profile was saved without photo.");
    }

    try {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const mime = sniffImageType(new Uint8Array(buffer.slice(0, 16)));
      if (!mime || !isPhotoMime(mime)) {
        return errorState("Photo format must be JPEG, PNG, or WebP. Profile was saved without photo.");
      }

      const objectName = buildPhotoObjectName(createdId, mime);
      const { error: uploadError } = await supabase.storage.from(PHOTO_BUCKET).upload(objectName, buffer, {
        contentType: mime,
        upsert: true,
      });

      if (!uploadError) {
        await supabase.from("volunteers").update({ photo_path: objectName }).eq("id", createdId);
      } else {
        console.warn("Photo upload error:", uploadError);
      }
    } catch (photoErr) {
      console.error("Photo processing caught error:", photoErr);
    }
  }

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Thank you! Your information has been received and will appear once approved by an admin.", { id: createdId });
}
