import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/sections/navbar";

const TEAM_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

type VolunteerRow = {
  id: string;
  slug: string;
  full_name: string;
  public_role: string | null;
  bio: string | null;
  photo_path: string | null;
  skills: string[] | null;
  social_links: Record<string, unknown> | null;
  updated_at: string;
  team_name: string | null;
  team_slug: string | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    throw new Error("Supabase is not configured.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function teamColor(slug: string | null): string {
  if (!slug) return TEAM_COLORS[0];
  let hash = 0;
  for (const character of slug) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return TEAM_COLORS[hash % TEAM_COLORS.length];
}

function parseSocialLinks(raw: Record<string, unknown> | null): Array<{ key: string; label: string; url: string }> {
  const entries = Object.entries(raw ?? {});
  return entries
    .flatMap(([key, value]) => {
      if (!value || typeof value !== "object") {
        if (typeof value === "string" && /^https?:\/\//i.test(value)) return [{ key, label: key, url: value }];
        return [];
      }

      const candidate = (value as { url?: unknown }).url;
      if (typeof candidate !== "string") return [];
      if (!/^https?:\/\//i.test(candidate)) return [];
      return [{ key, label: key, url: candidate }];
    })
    .filter((item) => item.url.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
}

async function getVolunteer(slug: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("public_volunteers")
    .select("id, slug, full_name, public_role, bio, photo_path, skills, social_links, updated_at, team_name, team_slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Could not load volunteer profile", error);
    return null;
  }

  return (data as VolunteerRow | null) ?? null;
}

export default async function VolunteerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const volunteer = await getVolunteer(slug);

  if (!volunteer) {
    notFound();
  }

  const photoUrl = volunteer.photo_path ? `/photos/${volunteer.slug}?v=${encodeURIComponent(volunteer.updated_at)}` : null;
  const teamColorValue = teamColor(volunteer.team_slug);
  const socialLinks = parseSocialLinks(volunteer.social_links);

  return (
    <main className="min-h-screen bg-[#f1efe8] text-[#1d1a17]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-8 lg:px-10 lg:pt-32">
        <section className="rounded-[1.6rem] border border-[#d0cabd] bg-[#f4efe9] p-4 sm:p-6 lg:p-8">
          <Link href="/teams" className="mb-6 inline-flex items-center rounded-full border-[2px] border-[#1d1a17] bg-white px-4 py-2 text-sm font-semibold text-[#1d1a17] transition hover:bg-[#1d1a17] hover:text-[#f5f2ec]">
            ← Back to teams
          </Link>

          <article className="grid gap-6 md:grid-cols-[320px_1fr] md:gap-8">
            <div className="w-full">
              <div className="overflow-hidden rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white shadow-[6px_6px_0_rgba(29,26,23,0.9)]" style={{ backgroundColor: `${teamColorValue}18` }}>
                {photoUrl ? (
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={photoUrl}
                      alt={volunteer.full_name}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#f7f2ea]">
                    <span className="text-5xl font-black tracking-tight" style={{ color: teamColorValue }}>{initials(volunteer.full_name)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f5b57]">GDG Noida community</p>
                <h1 className="text-4xl leading-[0.95] tracking-[-0.06em] text-[#1d1a17] sm:text-5xl" style={{ fontFamily: '"Bricolage Grotesque", "Product Sans", sans-serif' }}>
                  {volunteer.full_name}
                </h1>
                {volunteer.public_role ? (
                  <p className="text-lg text-[#5f5b57] sm:text-xl">{volunteer.public_role}</p>
                ) : (
                  <p className="text-lg text-[#8d8a86] sm:text-xl">Community member</p>
                )}
                {volunteer.team_name ? (
                  <span className="inline-flex rounded-full border-[2px] border-[#1d1a17] px-3 py-1.5 text-sm font-semibold" style={{ backgroundColor: `${teamColorValue}18`, color: teamColorValue }}>
                    {volunteer.team_name}
                  </span>
                ) : null}
              </header>

              {volunteer.bio ? (
                <section className="rounded-[1.2rem] border-[2px] border-[#1d1a17] bg-white p-4 sm:p-5">
                  <h2 className="mb-3 text-lg font-semibold text-[#1d1a17]">About</h2>
                  <p className="whitespace-pre-line text-base leading-7 text-[#3a3734]">{volunteer.bio}</p>
                </section>
              ) : null}

              {volunteer.skills && volunteer.skills.length > 0 ? (
                <section className="rounded-[1.2rem] border-[2px] border-[#1d1a17] bg-white p-4 sm:p-5">
                  <h2 className="mb-3 text-lg font-semibold text-[#1d1a17]">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill) => (
                      <span key={skill} className="rounded-full border-[2px] border-[#1d1a17] bg-[#f7f2ea] px-3 py-1.5 text-sm text-[#1d1a17]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {socialLinks.length > 0 ? (
                <section className="rounded-[1.2rem] border-[2px] border-[#1d1a17] bg-white p-4 sm:p-5">
                  <h2 className="mb-3 text-lg font-semibold text-[#1d1a17]">Connect</h2>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={`${link.key}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border-[2px] border-[#1d1a17] bg-[#d5f0c6] px-4 py-2 text-sm font-semibold text-[#1d1a17] transition hover:bg-[#1d1a17] hover:text-[#f5f2ec]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}