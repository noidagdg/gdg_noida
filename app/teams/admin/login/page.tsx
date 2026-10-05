import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/id-card/auth/admin";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Navbar from "@/components/sections/navbar";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Admin Sign In | GDG Noida",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.status === "admin") {
    redirect("/teams/admin");
  }

  return (
    <div className="min-h-screen bg-[#f1efe8] text-[#1d1a17]">
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md flex-col justify-center px-4 py-24 sm:px-6">
        <div className="mb-6">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 rounded-full border-[2px] border-[#1d1a17] bg-white px-3.5 py-1.5 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Teams Directory
          </Link>
        </div>

        <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-7 shadow-[6px_6px_0_rgba(29,26,23,0.9)] sm:p-9">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-[#1d1a17] bg-[#4285F4] text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5f5b57]">GDG Noida</p>
              <h1 className="text-2xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                Admin Portal
              </h1>
            </div>
          </div>

          <AdminLoginForm />
        </div>
      </main>
    </div>
  );
}
