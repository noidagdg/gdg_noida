import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import TeamDirectoryFilters from "@/components/sections/team-directory-filters";
import { ArrowLeft, Calendar, MapPin, Linkedin, X } from "lucide-react";

const PAGE_SIZE = 24;
const TEAM_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
const VOLUNTEER_COLUMNS =
  "id, slug, full_name, public_role, updated_at, team_id, team_name, team_slug, photo_path, social_links";

type QueryValue = string | string[] | undefined;
type Team = { id: string; name: string; slug: string };
type Volunteer = {
  id: string;
  slug: string;
  full_name: string;
  public_role: string | null;
  updated_at: string;
  team_id: string | null;
  team_name: string | null;
  team_slug: string | null;
  photo_path: string | null;
  social_links: string | null; // JSON string from Supabase
};

function first(value: QueryValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeQuery(value: QueryValue): string {
  return (first(value) ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function directoryParams(raw: { q?: QueryValue; team?: QueryValue; page?: QueryValue }) {
  const teamValue = first(raw.team)?.trim() ?? "";
  const team = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(teamValue) && teamValue.length <= 60 ? teamValue : null;
  const requestedPage = Number.parseInt(first(raw.page) ?? "1", 10);
  return {
    q: normalizeQuery(raw.q),
    team,
    page: Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), 1000) : 1,
  };
}

function directoryHref(params: { q?: string; team?: string | null; page?: number }): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.team) search.set("team", params.team);
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const query = search.toString();
  return query ? `/teams?${query}` : "/teams";
}

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (character) => `\\${character}`);
}

function teamColor(slug: string | null): string {
  if (!slug) return TEAM_COLORS[0];
  let hash = 0;
  for (const character of slug) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return TEAM_COLORS[hash % TEAM_COLORS.length];
}

function volunteerInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

type PageProps = {
  searchParams: Promise<{ q?: QueryValue; team?: QueryValue; page?: QueryValue }>;
};

export default async function TeamsPage({ searchParams }: PageProps) {
  const params = directoryParams(await searchParams);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  let teams: Team[] = [];
  let volunteers: Volunteer[] = [];
  let total = 0;
  let loadError: "configuration" | "request" | null = null;

  if (!supabaseUrl || !supabaseKey) {
    loadError = "configuration";
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });

      let volunteerRequest = supabase
        .from("public_volunteers")
        .select(VOLUNTEER_COLUMNS, { count: "exact" })
        .order("full_name", { ascending: true })
        .order("id", { ascending: true })
        .range((params.page - 1) * PAGE_SIZE, params.page * PAGE_SIZE - 1);

      for (const token of params.q.split(" ").filter(Boolean).slice(0, 5)) {
        volunteerRequest = volunteerRequest.ilike("full_name", `%${escapeLikePattern(token)}%`);
      }
      if (params.team) volunteerRequest = volunteerRequest.eq("team_slug", params.team);

      const [teamResult, volunteerResult] = await Promise.all([
        supabase.from("teams").select("id, name, slug").order("name", { ascending: true }),
        volunteerRequest,
      ]);

      if (teamResult.error || volunteerResult.error) throw new Error("Directory request failed");
      teams = (teamResult.data ?? []) as Team[];
      volunteers = (volunteerResult.data ?? []) as Volunteer[];
      total = volunteerResult.count ?? volunteers.length;
    } catch (error) {
      console.error("Could not load the volunteer directory", error);
      loadError = "request";
    }
  }

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (!loadError && total > 0 && params.page > pageCount) {
    redirect(directoryHref({ q: params.q, team: params.team, page: pageCount }));
  }

  return (
    <div className="min-h-screen bg-[#f1efe8] text-[#1d1a17]">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-4 pb-16 pt-24 sm:px-8 lg:px-10 lg:pt-32">
        <section className="rounded-[1.6rem] border border-[#d0cabd] bg-[#f4efe9] p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f5b57]">GDG Noida community</p>
              <h2 className="mt-2 text-4xl leading-[0.95] tracking-[-0.06em] text-[#1d1a17] sm:text-5xl" style={{ fontFamily: '"Bricolage Grotesque", "Product Sans", sans-serif' }}>
                Meet the teams
              </h2>
            </div>

            <div className="sticky top-20 z-20 bg-[#f4efe9] pb-2">
              <form action="/teams" method="get" role="search" className="flex w-full flex-col gap-3 md:flex-row">
                {params.team && <input type="hidden" name="team" value={params.team} />}
                <label htmlFor="team-search" className="sr-only">Search volunteers by name</label>
                <input
                  id="team-search"
                  name="q"
                  type="search"
                  defaultValue={params.q}
                  placeholder="Search volunteers by name"
                  maxLength={80}
                  className="h-12 min-w-0 rounded-[1rem] border-[2px] border-[#1d1a17] bg-white px-4 text-base text-[#1d1a17] outline-none transition focus:border-[#1d1a17] focus:ring-2 focus-ring-offset-2 focus-ring-[#1d1a17]/20 md:flex-1"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-[1rem] border-[2px] border-[#1d1a17] bg-[#d5f0c6] px-6 text-base font-semibold text-[#1d1a17] shadow-[4px_4px_0_rgba(29,26,23,0.9)] transition hover:bg-[#1d1a17] hover:text-[#f5f2ec]"
                >
                  Search
                </button>
              </form>

              {teams.length > 0 && (
                <TeamDirectoryFilters
                  teams={[{ id: "all", name: "All teams", slug: "" }, ...teams].map((team) => ({
                    id: team.id || "all",
                    name: team.name,
                    slug: team.slug,
                    href: directoryHref({ q: params.q, team: team.slug || null }),
                    active: !team.slug ? params.team === null : params.team === team.slug,
                    color: team.slug ? teamColor(team.slug) : undefined,
                  }))}
                />
              )}
            </div>
          </div>

          <section aria-live="polite" className="mt-8">
            {loadError ? (
              <div role="alert" className="max-w-2xl rounded-[1.25rem] border-[2px] border-[#1d1a17] bg-white p-6">
                <h3 className="text-xl font-semibold text-[#1d1a17]">
                  {loadError === "configuration" ? "Directory setup needed" : "The directory could not be loaded"}
                </h3>
                <p className="mt-2 text-[#5f5b57]">
                  {loadError === "configuration"
                    ? "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in the root app environment to connect the volunteer directory."
                    : "Something went wrong while loading volunteers. Please try again in a moment."}
                </p>
              </div>
            ) : total === 0 ? (
              <div className="max-w-2xl rounded-[1.25rem] border-[2px] border-[#1d1a17] bg-white p-6">
                <h3 className="text-xl font-semibold text-[#1d1a17]">
                  {params.q || params.team ? "No volunteers match those filters" : "No volunteers are listed yet"}
                </h3>
                <p className="mt-2 text-[#5f5b57]">
                  {params.q || params.team
                    ? "Try a different name or select All teams. Only volunteers who agreed to be listed appear here."
                    : "Volunteer profiles appear here once they have agreed to be listed."}
                </p>
              </div>
            ) : (
              <>
                <p className="mb-5 text-sm text-[#5f5b57]">
                  {total} {total === 1 ? "volunteer" : "volunteers"}
                  {params.q ? ` matching “${params.q}”` : ""}
                </p>
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                  {volunteers.map((volunteer) => {
                    const color = teamColor(volunteer.team_slug);
                    const photoUrl = volunteer.photo_path
                      ? `/photos/${volunteer.slug}?v=${encodeURIComponent(volunteer.updated_at)}`
                      : null;

                    let socialLinksObj: Record<string, any> = {};
                    if (typeof volunteer.social_links === "string") {
                      try {
                        socialLinksObj = JSON.parse(volunteer.social_links);
                      } catch {}
                    } else if (volunteer.social_links && typeof volunteer.social_links === "object") {
                      socialLinksObj = volunteer.social_links as Record<string, any>;
                    }

                    const approvedLinks = Object.keys(socialLinksObj).reduce((acc, platform) => {
                      const linkData = socialLinksObj[platform];
                      if (linkData && linkData.approved === true && linkData.url) {
                        acc[platform] = linkData.url;
                      } else if (typeof linkData === "string" && /^https?:\/\//i.test(linkData)) {
                        acc[platform] = linkData;
                      }
                      return acc;
                    }, {} as Record<string, string>);
                    const linkedinUrl = approvedLinks.linkedin || null;
                    const twitterUrl = approvedLinks.twitter || approvedLinks.x || null;

                    return (
                      <li key={volunteer.id} className="h-full">
                        <div className="group flex h-full flex-col rounded-[1.5rem] border-[2px] border-[#1d1a17] bg-[#f7f2ea] p-2.5 shadow-[5px_5px_0_rgba(29,26,23,0.9)] transition-shadow duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_rgba(29,26,23,0.9)] hover:scale-[1.02] sm:p-3">
                          <Link href={`/volunteer/${volunteer.slug}`} className="block flex-1">
                            <div className="relative overflow-hidden rounded-[1.1rem] border-[2px] border-[#1d1a17] bg-[#f8f0eb] p-2" style={{ backgroundColor: `${color}18` }}>
                              <span className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border-[2px] border-[#1d1a17] bg-[#f4f0ea] text-[9px] font-black text-[#1d1a17]">
                                AI
                              </span>
                              <div className="relative aspect-[4/5] overflow-hidden rounded-[0.9rem] bg-zinc-100">
                                {photoUrl ? (
                                  <Image
                                    src={photoUrl}
                                    alt={volunteer.full_name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    unoptimized
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold" style={{ color }}>
                                    {volunteerInitials(volunteer.full_name)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="px-1 pt-4">
                              <h3 className="text-[1.25rem] font-semibold leading-[1.1] tracking-[-0.05em] text-[#1d1a17] sm:text-[1.4rem]">{volunteer.full_name}</h3>
                              {volunteer.public_role ? (
                                <p className="mt-1 text-sm text-[#5f5b57]">{volunteer.public_role}</p>
                              ) : (
                                <p className="mt-1 text-sm text-[#8d8a86]">Community member</p>
                              )}
                            </div>
                          </Link>

                          <div className="mt-3 flex flex-wrap gap-2 px-1 pb-1">
                            {volunteer.team_name ? (
                              <span className="inline-flex rounded-full border-[2px] border-[#1d1a17] px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: `${color}22`, color }}>
                                {volunteer.team_name}
                              </span>
                            ) : null}
                            {linkedinUrl ? (
                              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border-[2px] border-[#1d1a17] px-2.5 py-1 text-xs font-semibold">
                                <Linkedin className="me-1 h-3 w-3" />
                                LinkedIn
                              </a>
                            ) : null}
                            {twitterUrl ? (
                              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border-[2px] border-[#1d1a17] px-2.5 py-1 text-xs font-semibold">
                                <X className="me-1 h-3 w-3" />
                                Twitter
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {pageCount > 1 && (
                  <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4">
                    {params.page > 1 ? (
                      <Link className="rounded-full border-[2px] border-[#1d1a17] bg-white px-6 py-3 text-sm font-medium text-[#1d1a17] hover:-translate-y-0.5" href={directoryHref({ q: params.q, team: params.team, page: params.page - 1 })} rel="prev">
                        Previous
                      </Link>
                    ) : (
                      <span />
                    )}
                    <p className="text-sm text-[#5f5b57]">Page {params.page} of {pageCount}</p>
                    {params.page < pageCount ? (
                      <Link className="rounded-full border-[2px] border-[#1d1a17] bg-white px-6 py-3 text-sm font-medium text-[#1d1a17] hover:-translate-y-0.5" href={directoryHref({ q: params.q, team: params.team, page: params.page + 1 })} rel="next">
                        Next
                      </Link>
                    ) : (
                      <span />
                    )}
                  </nav>
                )}
              </>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}