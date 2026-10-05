import { requireAdmin } from "@/lib/id-card/auth/admin";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import AdminDashboardClient, { type AdminVolunteer, type AdminTeam } from "@/components/admin/AdminDashboardClient";

export const metadata = {
  title: "Volunteer & Teams Management | GDG Noida Admin",
  robots: { index: false, follow: false },
};

export default async function TeamAdminPage() {
  const { user } = await requireAdmin();

  let volunteers: AdminVolunteer[] = [];
  let teams: AdminTeam[] = [];

  const supabase = getSupabaseAdmin();
  const [volunteersRes, teamsRes] = await Promise.all([
    supabase
      .from("volunteers")
      .select("id, full_name, slug, team_id, public_role, bio, photo_path, skills, social_links, is_published, consent_status, created_at, updated_at")
      .order("created_at", { ascending: false }),
    supabase.from("teams").select("id, name, slug, description, is_active").order("name"),
  ]);

  if (volunteersRes.error) console.error("Volunteers fetch error:", volunteersRes.error);
  if (teamsRes.error) console.error("Teams fetch error:", teamsRes.error);

  volunteers = (volunteersRes.data as AdminVolunteer[]) ?? [];
  teams = (teamsRes.data as AdminTeam[]) ?? [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  return (
    <AdminDashboardClient
      initialVolunteers={volunteers}
      initialTeams={teams}
      adminEmail={user.email ?? "Admin"}
      siteUrl={siteUrl}
    />
  );
}