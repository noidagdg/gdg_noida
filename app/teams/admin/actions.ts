"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, loginAdmin, logoutAdmin } from "@/lib/id-card/auth/admin";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { CONSENT_VERSION, MAX_PHOTO_BYTES, PHOTO_BUCKET } from "@/lib/id-card/config";
import { slugCandidates, slugify } from "@/lib/id-card/utils/slug";
import { generateInviteToken, inviteExpiryFromNow, inviteUrl, type InviteType } from "@/lib/id-card/team-invites";
import { isPhotoMime, sniffImageType, buildPhotoObjectName } from "@/lib/id-card/validation/photo";
import { parseVolunteerForm } from "@/lib/id-card/validation/volunteer";
import { parseTeamForm } from "@/lib/id-card/validation/team";
import { formString, isUuid, type ActionState, errorState, successState } from "@/lib/id-card/validation/common";

export async function adminSignInAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formString(formData, "email");
  const password = formString(formData, "password");

  if (!email || !password) {
    return errorState("Please enter both email and password.");
  }

  const result = await loginAdmin(email, password);
  if (!result.ok) {
    return errorState(result.error);
  }

  redirect("/teams/admin");
}

export async function adminSignOutAction(): Promise<void> {
  await logoutAdmin();
  redirect("/teams/admin/login");
}

export async function createVolunteerAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const parsed = parseVolunteerForm(formData);
  if (!parsed.ok) {
    return errorState("Please check the form fields.", parsed.fieldErrors);
  }

  const baseSlug = slugify(parsed.data.full_name, 60);
  const candidates = slugCandidates(baseSlug, "volunteer");

  let createdVolunteerId: string | null = null;
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
      is_published: parsed.data.is_published,
      consent_status: parsed.data.consent_status,
      consent_recorded_at: parsed.data.consent_status === "granted" ? now : null,
      consent_version: parsed.data.consent_status === "granted" ? CONSENT_VERSION : null,
      published_at: parsed.data.is_published ? now : null,
    };

    const { data, error } = await supabase.from("volunteers").insert(insertPayload).select("id").maybeSingle();

    if (!error && data) {
      createdVolunteerId = data.id as string;
      break;
    }

    if (error && error.code === "23505" && error.message.includes("slug")) {
      continue;
    }

    console.error("createVolunteerAction error:", error);
    return errorState(error?.message || "Could not create the volunteer profile.");
  }

  if (!createdVolunteerId) {
    return errorState("Failed to generate a unique profile identifier.");
  }

  // Handle photo if provided
  const photoFile = formData.get("photo") as File | null;
  if (photoFile && photoFile.size > 0 && photoFile.size <= MAX_PHOTO_BYTES) {
    try {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const mime = sniffImageType(new Uint8Array(buffer.slice(0, 16)));
      if (mime && isPhotoMime(mime)) {
        const objectName = buildPhotoObjectName(createdVolunteerId, mime);
        const { error: uploadError } = await supabase.storage.from(PHOTO_BUCKET).upload(objectName, buffer, {
          contentType: mime,
          upsert: true,
        });

        if (!uploadError) {
          await supabase.from("volunteers").update({ photo_path: objectName }).eq("id", createdVolunteerId);
        }
      }
    } catch (photoErr) {
      console.error("Photo upload error on create:", photoErr);
    }
  }

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Volunteer profile created successfully!", { id: createdVolunteerId });
}

export async function updateVolunteerAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const id = formString(formData, "id");
  if (!isUuid(id)) {
    return errorState("Invalid volunteer ID.");
  }

  const parsed = parseVolunteerForm(formData);
  if (!parsed.ok) {
    return errorState("Please check the form fields.", parsed.fieldErrors);
  }

  const { data: existing, error: fetchErr } = await supabase
    .from("volunteers")
    .select("consent_status, consent_recorded_at, consent_version, photo_path")
    .eq("id", id)
    .maybeSingle();

  if (fetchErr || !existing) {
    return errorState("Volunteer not found.");
  }

  const now = new Date().toISOString();
  let consentRecordedAt = existing.consent_recorded_at;
  let consentVersion = existing.consent_version;

  if (parsed.data.consent_status === "granted" && existing.consent_status !== "granted") {
    consentRecordedAt = now;
    consentVersion = CONSENT_VERSION;
  } else if (parsed.data.consent_status === "pending") {
    consentRecordedAt = null;
    consentVersion = null;
  }

  const updatePayload: Record<string, unknown> = {
    full_name: parsed.data.full_name,
    team_id: parsed.data.team_id,
    public_role: parsed.data.public_role,
    bio: parsed.data.bio,
    skills: parsed.data.skills,
    social_links: parsed.data.social_links,
    is_published: parsed.data.is_published,
    consent_status: parsed.data.consent_status,
    consent_recorded_at: consentRecordedAt,
    consent_version: consentVersion,
    updated_at: now,
  };

  // Handle photo if uploaded
  const photoFile = formData.get("photo") as File | null;
  if (photoFile && photoFile.size > 0 && photoFile.size <= MAX_PHOTO_BYTES) {
    try {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const mime = sniffImageType(new Uint8Array(buffer.slice(0, 16)));
      if (mime && isPhotoMime(mime)) {
        const objectName = buildPhotoObjectName(id, mime);
        const { error: uploadError } = await supabase.storage.from(PHOTO_BUCKET).upload(objectName, buffer, {
          contentType: mime,
          upsert: true,
        });

        if (!uploadError) {
          updatePayload.photo_path = objectName;
          if (existing.photo_path && existing.photo_path !== objectName) {
            void supabase.storage.from(PHOTO_BUCKET).remove([existing.photo_path]);
          }
        }
      }
    } catch (photoErr) {
      console.error("Photo upload error on update:", photoErr);
    }
  }

  const { error: updateError } = await supabase.from("volunteers").update(updatePayload).eq("id", id);
  if (updateError) {
    console.error("updateVolunteer error:", updateError);
    return errorState(updateError.message || "Failed to update volunteer.");
  }

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Volunteer updated successfully!");
}

export async function deleteVolunteerAction(id: string): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  if (!isUuid(id)) return errorState("Invalid volunteer ID.");

  const { data: existing } = await supabase.from("volunteers").select("photo_path").eq("id", id).maybeSingle();

  const { error } = await supabase.from("volunteers").delete().eq("id", id);
  if (error) {
    return errorState(error.message || "Failed to delete volunteer.");
  }

  if (existing?.photo_path) {
    void supabase.storage.from(PHOTO_BUCKET).remove([existing.photo_path]);
  }

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Volunteer deleted.");
}

export async function togglePublishAction(id: string, isPublished: boolean): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  if (!isUuid(id)) return errorState("Invalid volunteer ID.");

  const { data: volunteer } = await supabase.from("volunteers").select("consent_status").eq("id", id).maybeSingle();
  if (!volunteer) return errorState("Volunteer not found.");

  if (isPublished && volunteer.consent_status !== "granted") {
    return errorState("Cannot publish: volunteer consent is not recorded as granted.");
  }

  const now = new Date().toISOString();
  const { error } = await supabase
    .from("volunteers")
    .update({
      is_published: isPublished,
      published_at: isPublished ? now : null,
      updated_at: now,
    })
    .eq("id", id);

  if (error) return errorState(error.message);

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState(isPublished ? "Volunteer published to public directory." : "Volunteer unpublished.");
}

export async function approveSubmissionAction(id: string): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  if (!isUuid(id)) return errorState("Invalid volunteer ID.");

  const now = new Date().toISOString();
  const { error } = await supabase
    .from("volunteers")
    .update({
      is_published: true,
      consent_status: "granted",
      consent_recorded_at: now,
      consent_version: CONSENT_VERSION,
      published_at: now,
      updated_at: now,
    })
    .eq("id", id);

  if (error) return errorState(error.message);

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Submission approved and profile published!");
}

export async function rejectSubmissionAction(id: string): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  if (!isUuid(id)) return errorState("Invalid volunteer ID.");

  const { error } = await supabase
    .from("volunteers")
    .update({
      is_published: false,
      consent_status: "withdrawn",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return errorState(error.message);

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Submission rejected.");
}




export async function saveTeamAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const parsed = parseTeamForm(formData);
  if (!parsed.ok) {
    return errorState("Please check team fields.", parsed.fieldErrors);
  }

  const id = formString(formData, "id");

  if (id && isUuid(id)) {
    const { error } = await supabase.from("teams").update(parsed.data).eq("id", id);
    if (error) return errorState(error.message || "Failed to update team.");
    revalidatePath("/teams");
    revalidatePath("/teams/admin");
    return successState("Team updated successfully!");
  }

  const candidates = slugCandidates(slugify(parsed.data.name, 50), "team");
  for (const slug of candidates) {
    const { error } = await supabase.from("teams").insert({ ...parsed.data, slug });
    if (!error) {
      revalidatePath("/teams");
      revalidatePath("/teams/admin");
      return successState(`Team "${parsed.data.name}" created!`);
    }
    if (error.code === "23505" && error.message.includes("slug")) continue;
    return errorState(error.message || "Failed to create team.");
  }

  return errorState("Could not generate a unique slug for this team.");
}

export async function deleteTeamAction(id: string): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  if (!isUuid(id)) return errorState("Invalid team ID.");

  const { data: vols } = await supabase.from("volunteers").select("id").eq("team_id", id).limit(1);
  if (vols && vols.length > 0) {
    return errorState("Cannot delete team: volunteers are currently assigned to it. Reassign them first.");
  }

  const { error } = await supabase.from("teams").delete().eq("id", id);
  if (error) return errorState(error.message || "Failed to delete team.");

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Team deleted.");
}

export async function generateInviteLinkAction(type: InviteType, volunteerId?: string | null): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  const { rawToken, tokenHash } = await generateInviteToken();

  try {
    const { error } = await supabase.from("team_invites").insert({
      token_hash: tokenHash,
      type,
      volunteer_id: volunteerId || null,
      expires_at: inviteExpiryFromNow(),
    });

    if (error) {
      console.warn("Could not record invite in team_invites table (it might not exist):", error.message);
    }
  } catch (err) {
    console.warn("team_invites insert caught:", err);
  }

  const fullUrl = inviteUrl(type, rawToken, siteUrl);
  return successState("Invite link created (valid for 24 hours):", { url: fullUrl });
}

export async function removeVolunteerPhotoAction(id: string): Promise<ActionState> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  if (!isUuid(id)) return errorState("Invalid volunteer ID.");

  const { data: existing } = await supabase.from("volunteers").select("photo_path").eq("id", id).maybeSingle();
  if (existing?.photo_path) {
    void supabase.storage.from(PHOTO_BUCKET).remove([existing.photo_path]);
  }

  const { error } = await supabase.from("volunteers").update({ photo_path: null }).eq("id", id);
  if (error) return errorState(error.message);

  revalidatePath("/teams");
  revalidatePath("/teams/admin");
  return successState("Photo removed.");
}
