import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/sections/navbar";
import VolunteerRegistrationForm from "@/components/team/VolunteerRegistrationForm";
import { ArrowLeft, Users, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Volunteer Registration | GDG Noida",
  description: "Submit your volunteer profile for the GDG Noida Community Directory.",
};

async function getTeams() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data } = await supabase.from("teams").select("id, name, slug").eq("is_active", true).order("name");
    return data ?? [];
  } catch (error) {
    console.error("Failed to load teams:", error);
    return [];
  }
}

export default async function VolunteerFormsPage() {
  const teams = await getTeams();

  return (
    <div className="min-h-screen bg-[#f1efe8] text-[#1d1a17]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 lg:pt-36">
        <div className="mb-6">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 rounded-full border-[2px] border-[#1d1a17] bg-white px-4 py-2 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Teams Directory
          </Link>
        </div>

        <section className="mb-8 rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-[#f4efe9] p-6 shadow-[5px_5px_0_rgba(29,26,23,0.9)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f5b57]">GDG Noida Community</p>
          <h1
            className="mt-2 text-4xl font-black leading-tight tracking-tight text-[#1d1a17] sm:text-5xl"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          >
            Join the Directory
          </h1>
          <p className="mt-3 text-base text-[#5f5b57]">
            Fill out your details to have your volunteer profile and ID badge generated for GDG Noida community activities. Submissions are reviewed by the team prior to publishing.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-[#d0cabd] bg-white/70 p-3 text-xs font-semibold text-[#1d1a17]">
              <Users className="h-4 w-4 text-[#4285F4]" /> Community Visibility
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-[#d0cabd] bg-white/70 p-3 text-xs font-semibold text-[#1d1a17]">
              <ShieldCheck className="h-4 w-4 text-[#34A853]" /> Reviewed by Admins
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-[#d0cabd] bg-white/70 p-3 text-xs font-semibold text-[#1d1a17]">
              <HeartHandshake className="h-4 w-4 text-[#EA4335]" /> Connect with Attendees
            </div>
          </div>
        </section>

        <VolunteerRegistrationForm teams={teams} />
      </main>
    </div>
  );
}
