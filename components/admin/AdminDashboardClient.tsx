"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  adminSignOutAction,
  updateVolunteerAction,
  createVolunteerAction,
  deleteVolunteerAction,
  togglePublishAction,
  approveSubmissionAction,
  rejectSubmissionAction,
  saveTeamAction,
  deleteTeamAction,
  generateInviteLinkAction,
  removeVolunteerPhotoAction,
} from "@/app/teams/admin/actions";
import { qrSvgString, qrDataUrl } from "@/lib/id-card/qr";
import { SOCIAL_PLATFORMS } from "@/lib/id-card/social";
import { type ActionState, IDLE } from "@/lib/id-card/validation/common";
import {
  Users,
  ShieldAlert,
  CheckCircle,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  QrCode,
  Link as LinkIcon,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  Printer,
  Sparkles,
  AlertCircle,
  Check,
  X,
  Upload,
  Layers,
  ArrowRight,
} from "lucide-react";

export type AdminVolunteer = {
  id: string;
  full_name: string;
  slug: string;
  team_id: string | null;
  public_role: string | null;
  bio: string | null;
  photo_path: string | null;
  skills: string[] | string | null;
  social_links: Record<string, any> | null;
  is_published: boolean;
  consent_status: "pending" | "granted" | "withdrawn";
  updated_at: string;
  created_at: string;
};

export type AdminTeam = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  volunteer_count?: number;
};

type Props = {
  initialVolunteers: AdminVolunteer[];
  initialTeams: AdminTeam[];
  adminEmail: string;
  siteUrl: string;
};

export default function AdminDashboardClient({
  initialVolunteers,
  initialTeams,
  adminEmail,
  siteUrl,
}: Props) {
  const [volunteers, setVolunteers] = useState<AdminVolunteer[]>(initialVolunteers);
  const [teams, setTeams] = useState<AdminTeam[]>(initialTeams);
  const [activeTab, setActiveTab] = useState<"overview" | "volunteers" | "teams" | "qr" | "invites">("overview");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");

  // Modals & Drawers
  const [editingVolunteer, setEditingVolunteer] = useState<AdminVolunteer | null>(null);
  const [isAddingVolunteer, setIsAddingVolunteer] = useState(false);
  const [editingTeam, setEditingTeam] = useState<AdminTeam | null>(null);
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  // Invite link state
  const [inviteResult, setInviteResult] = useState<string | null>(null);
  const [inviteCopied, setInviteCopied] = useState(false);

  // Transitions
  const [isPending, startTransition] = useTransition();
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Stats
  const total = volunteers.length;
  const published = volunteers.filter((v) => v.is_published).length;
  const drafts = total - published;
  const pendingSubmissions = volunteers.filter(
    (v) => !v.is_published && v.consent_status !== "granted"
  );
  const activeTeamsCount = teams.filter((t) => t.is_active).length;

  const showNotification = (msg: string, isErr = false) => {
    if (isErr) {
      setActionError(msg);
      setTimeout(() => setActionError(null), 5000);
    } else {
      setActionNotice(msg);
      setTimeout(() => setActionNotice(null), 5000);
    }
  };

  // Filtered volunteers list
  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      !searchQuery.trim() ||
      v.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.public_role && v.public_role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTeam =
      selectedTeamFilter === "all" ||
      (selectedTeamFilter === "none" && !v.team_id) ||
      v.team_id === selectedTeamFilter;

    const matchesStatus =
      selectedStatusFilter === "all" ||
      (selectedStatusFilter === "published" && v.is_published) ||
      (selectedStatusFilter === "draft" && !v.is_published) ||
      (selectedStatusFilter === "consent-missing" && v.consent_status !== "granted");

    return matchesSearch && matchesTeam && matchesStatus;
  });

  const handleTogglePublish = (id: string, currentVal: boolean) => {
    startTransition(async () => {
      const res = await togglePublishAction(id, !currentVal);
      if (res.status === "success") {
        setVolunteers((prev) =>
          prev.map((v) => (v.id === id ? { ...v, is_published: !currentVal } : v))
        );
        showNotification(res.message);
      } else if (res.status === "error") {
        showNotification(res.message, true);
      }
    });
  };

  const handleDeleteVolunteer = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    startTransition(async () => {
      const res = await deleteVolunteerAction(id);
      if (res.status === "success") {
        setVolunteers((prev) => prev.filter((v) => v.id !== id));
        showNotification(res.message);
      } else if (res.status === "error") {
        showNotification(res.message, true);
      }
    });
  };

  const handleApproveSubmission = (id: string) => {
    startTransition(async () => {
      const res = await approveSubmissionAction(id);
      if (res.status === "success") {
        setVolunteers((prev) =>
          prev.map((v) =>
            v.id === id
              ? {
                  ...v,
                  is_published: true,
                  consent_status: "granted",
                }
              : v
          )
        );
        showNotification(res.message);
      } else if (res.status === "error") {
        showNotification(res.message, true);
      }
    });
  };

  const handleRejectSubmission = (id: string) => {
    if (!confirm("Are you sure you want to reject this submission?")) return;

    startTransition(async () => {
      const res = await rejectSubmissionAction(id);
      if (res.status === "success") {
        setVolunteers((prev) =>
          prev.map((v) =>
            v.id === id
              ? {
                  ...v,
                  is_published: false,
                  consent_status: "withdrawn",
                }
              : v
          )
        );
        showNotification(res.message);
      } else if (res.status === "error") {
        showNotification(res.message, true);
      }
    });
  };

  const handleGenerateInvite = (type: "upload" | "update", volunteerId?: string) => {
    startTransition(async () => {
      const res = await generateInviteLinkAction(type, volunteerId);
      if (res.status === "success" && (res as any).data?.url) {
        setInviteResult((res as any).data.url);
        setInviteCopied(false);
      } else if (res.status === "error") {
        showNotification(res.message, true);
      }
    });
  };

  // Master QR Code SVG preview
  const masterQrSvg = qrSvgString(`${siteUrl.replace(/\/$/, "")}/teams`, 4);
  const masterQrDataUrl = `data:image/svg+xml;base64,${Buffer.from(masterQrSvg).toString("base64")}`;

  return (
    <div className="min-h-screen bg-[#f1efe8] text-[#1d1a17]">
      {/* Top Banner & Header */}
      <header className="sticky top-0 z-30 border-b border-[#d0cabd] bg-[#f4efe9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/teams" className="flex items-center gap-2 font-black tracking-tight text-lg text-[#1d1a17]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1d1a17] bg-[#4285F4] text-xs text-white">
                GDG
              </span>
              <span>Teams Admin</span>
            </Link>
            <span className="hidden rounded-full border border-[#d0cabd] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#5f5b57] sm:inline">
              {adminEmail}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/teams/forms"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-[#d5f0c6] px-3.5 py-1.5 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] transition hover:bg-[#1d1a17] hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Volunteer</span> Form
            </Link>
            <Link
              href="/teams"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-white px-3.5 py-1.5 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] transition hover:bg-[#f4efe9]"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Directory
            </Link>
            <button
              onClick={() => startTransition(() => adminSignOutAction())}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d93025] bg-white px-3 py-1.5 text-xs font-bold text-[#d93025] transition hover:bg-[#fce8e6]"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 pt-1 sm:px-6">
          <nav className="flex space-x-2 border-b-2 border-transparent">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-bold transition ${
                activeTab === "overview"
                  ? "border-[#1d1a17] text-[#1d1a17]"
                  : "border-transparent text-[#5f5b57] hover:text-[#1d1a17]"
              }`}
            >
              <Users className="h-4 w-4" /> Overview & Review
              {pendingSubmissions.length > 0 && (
                <span className="rounded-full bg-[#EA4335] px-1.5 py-0.2 text-[10px] text-white">
                  {pendingSubmissions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("volunteers")}
              className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-bold transition ${
                activeTab === "volunteers"
                  ? "border-[#1d1a17] text-[#1d1a17]"
                  : "border-transparent text-[#5f5b57] hover:text-[#1d1a17]"
              }`}
            >
              <Users className="h-4 w-4" /> Volunteers ({total})
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-bold transition ${
                activeTab === "teams"
                  ? "border-[#1d1a17] text-[#1d1a17]"
                  : "border-transparent text-[#5f5b57] hover:text-[#1d1a17]"
              }`}
            >
              <Layers className="h-4 w-4" /> Teams ({teams.length})
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-bold transition ${
                activeTab === "qr"
                  ? "border-[#1d1a17] text-[#1d1a17]"
                  : "border-transparent text-[#5f5b57] hover:text-[#1d1a17]"
              }`}
            >
              <QrCode className="h-4 w-4" /> Badges & QR Code
            </button>
            <button
              onClick={() => setActiveTab("invites")}
              className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-bold transition ${
                activeTab === "invites"
                  ? "border-[#1d1a17] text-[#1d1a17]"
                  : "border-transparent text-[#5f5b57] hover:text-[#1d1a17]"
              }`}
            >
              <LinkIcon className="h-4 w-4" /> Invite Links
            </button>
          </nav>
        </div>
      </header>

      {/* Notifications */}
      {actionNotice && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl border-[2px] border-[#1d1a17] bg-[#d5f0c6] px-5 py-3 text-sm font-bold text-[#1d1a17] shadow-[5px_5px_0_rgba(29,26,23,0.9)] animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="h-5 w-5 text-[#2e7d32]" />
          <span>{actionNotice}</span>
        </div>
      )}
      {actionError && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl border-[2px] border-[#1d1a17] bg-[#fce8e6] px-5 py-3 text-sm font-bold text-[#d93025] shadow-[5px_5px_0_rgba(29,26,23,0.9)] animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle className="h-5 w-5 text-[#d93025]" />
          <span>{actionError}</span>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & PENDING REVIEW */}
        {/* ============================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-white p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <p className="text-xs font-bold text-[#5f5b57] uppercase tracking-wider">Total Volunteers</p>
                <p className="mt-2 text-3xl font-black text-[#1d1a17]">{total}</p>
              </div>
              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-white p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <p className="text-xs font-bold text-[#34A853] uppercase tracking-wider">Published on Site</p>
                <p className="mt-2 text-3xl font-black text-[#1d1a17]">{published}</p>
              </div>
              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-white p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <p className="text-xs font-bold text-[#FBBC04] uppercase tracking-wider">Drafts / Hidden</p>
                <p className="mt-2 text-3xl font-black text-[#1d1a17]">{drafts}</p>
              </div>
              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-white p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <p className="text-xs font-bold text-[#4285F4] uppercase tracking-wider">Active Teams</p>
                <p className="mt-2 text-3xl font-black text-[#1d1a17]">{activeTeamsCount}</p>
              </div>
            </div>

            {/* Pending submissions panel */}
            <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[5px_5px_0_rgba(29,26,23,0.9)] sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#d0cabd] pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                    Submissions Awaiting Review
                  </h2>
                  <p className="text-xs text-[#5f5b57]">
                    Volunteers submitted through the public form or invite links. Review and approve to publish.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#EA4335]/15 px-3 py-1 text-xs font-bold text-[#EA4335]">
                  {pendingSubmissions.length} pending
                </span>
              </div>

              {pendingSubmissions.length === 0 ? (
                <div className="py-12 text-center">
                  <CheckCircle className="mx-auto h-10 w-10 text-[#34A853]" />
                  <h3 className="mt-3 text-base font-bold text-[#1d1a17]">No pending submissions</h3>
                  <p className="mt-1 text-xs text-[#5f5b57]">All submitted volunteer profiles are approved and up to date.</p>
                </div>
              ) : (
                <div className="mt-6 divide-y divide-[#eee]">
                  {pendingSubmissions.map((v) => {
                    const teamName = teams.find((t) => t.id === v.team_id)?.name || "General volunteer";
                    const photoUrl = v.photo_path
                      ? `/photos/${v.slug}?v=${encodeURIComponent(v.updated_at)}`
                      : null;

                    return (
                      <div key={v.id} className="py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#1d1a17] bg-[#f4efe9]">
                            {photoUrl ? (
                              <Image src={photoUrl} alt={v.full_name} fill unoptimized className="object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-bold text-[#5f5b57]">
                                {v.full_name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-[#1d1a17] text-base">{v.full_name}</h4>
                              <span className="rounded-full bg-[#FBBC04]/20 border border-[#FBBC04] px-2 py-0.5 text-[10px] font-bold text-[#1d1a17]">
                                {v.consent_status === "granted" ? "Consent granted" : "Awaiting consent"}
                              </span>
                            </div>
                            <p className="text-xs text-[#5f5b57]">
                              {v.public_role || "Volunteer"} • <span className="font-medium text-[#1d1a17]">{teamName}</span>
                            </p>
                            {v.bio && <p className="mt-1 line-clamp-1 text-xs text-[#8d8a86]">{v.bio}</p>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 self-end sm:self-center">
                          <button
                            onClick={() => setEditingVolunteer(v)}
                            className="rounded-lg border border-[#1d1a17] bg-white px-3 py-1.5 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#f4efe9]"
                          >
                            <Edit className="inline h-3.5 w-3.5 mr-1" /> Inspect & Edit
                          </button>
                          <button
                            onClick={() => handleRejectSubmission(v.id)}
                            disabled={isPending}
                            className="rounded-lg border border-[#EA4335] bg-white px-3 py-1.5 text-xs font-bold text-[#EA4335] hover:bg-[#fce8e6]"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproveSubmission(v.id)}
                            disabled={isPending}
                            className="rounded-lg border border-[#1d1a17] bg-[#d5f0c6] px-3.5 py-1.5 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#1d1a17] hover:text-white"
                          >
                            Approve & Publish
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <h3 className="font-bold text-[#1d1a17]">Add New Volunteer</h3>
                <p className="mt-1 text-xs text-[#5f5b57]">Create a profile manually with full details and photo.</p>
                <button
                  onClick={() => setIsAddingVolunteer(true)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-[#4285F4] px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#3367D6]"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Volunteer
                </button>
              </div>

              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <h3 className="font-bold text-[#1d1a17]">Create Team Category</h3>
                <p className="mt-1 text-xs text-[#5f5b57]">Add a new track or sub-team to organize volunteers.</p>
                <button
                  onClick={() => setIsAddingTeam(true)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-[#34A853] px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#2d9247]"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Team
                </button>
              </div>

              <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]">
                <h3 className="font-bold text-[#1d1a17]">Print Badges & QR</h3>
                <p className="mt-1 text-xs text-[#5f5b57]">View the Master Directory QR and prepare event ID cards.</p>
                <button
                  onClick={() => setActiveTab("qr")}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-white px-4 py-2 text-xs font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#1d1a17] hover:text-white"
                >
                  <QrCode className="h-3.5 w-3.5" /> Open Badges
                </button>
              </div>
            </div>

            {/* All Registered Volunteers */}
            <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[5px_5px_0_rgba(29,26,23,0.9)] sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#d0cabd] pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                    All Registered Volunteers
                  </h2>
                  <p className="text-xs text-[#5f5b57]">Every volunteer in the database — published, draft, or pending.</p>
                </div>
                <button
                  onClick={() => setActiveTab("volunteers")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-[#f4efe9] px-4 py-1.5 text-xs font-bold text-[#1d1a17] hover:bg-[#1d1a17] hover:text-white transition"
                >
                  Manage All <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {volunteers.length === 0 ? (
                <div className="py-10 text-center">
                  <Users className="mx-auto h-10 w-10 text-[#d0cabd]" />
                  <p className="mt-3 text-sm font-semibold text-[#5f5b57]">No volunteers yet</p>
                  <p className="mt-1 text-xs text-[#8d8a86]">Add volunteers manually or share the registration form link.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#eee] text-left">
                        <th className="pb-3 pr-4 text-xs font-bold text-[#5f5b57] uppercase tracking-wider">Name</th>
                        <th className="pb-3 pr-4 text-xs font-bold text-[#5f5b57] uppercase tracking-wider hidden sm:table-cell">Role</th>
                        <th className="pb-3 pr-4 text-xs font-bold text-[#5f5b57] uppercase tracking-wider hidden md:table-cell">Team</th>
                        <th className="pb-3 pr-4 text-xs font-bold text-[#5f5b57] uppercase tracking-wider">Status</th>
                        <th className="pb-3 text-xs font-bold text-[#5f5b57] uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ede8]">
                      {volunteers.map((v) => {
                        const teamName = teams.find((t) => t.id === v.team_id)?.name;
                        return (
                          <tr key={v.id} className="group hover:bg-[#faf8f5]">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#d0cabd] bg-[#f4efe9]">
                                  {v.photo_path ? (
                                    <Image
                                      src={`/photos/${v.slug}?v=${encodeURIComponent(v.updated_at)}`}
                                      alt={v.full_name}
                                      fill
                                      unoptimized
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#5f5b57]">
                                      {v.full_name.slice(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-[#1d1a17] leading-tight">{v.full_name}</p>
                                  <p className="text-[11px] text-[#8d8a86]">/{v.slug}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-xs text-[#5f5b57] hidden sm:table-cell">{v.public_role || "—"}</td>
                            <td className="py-3 pr-4 text-xs text-[#5f5b57] hidden md:table-cell">{teamName ?? <span className="text-[#8d8a86]">No team</span>}</td>
                            <td className="py-3 pr-4">
                              <div className="flex flex-wrap gap-1">
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${v.is_published ? "bg-[#34A853]/15 text-[#2d9247]" : "bg-[#FBBC04]/15 text-[#b06000]"}`}>
                                  {v.is_published ? "Published" : "Draft"}
                                </span>
                                {v.consent_status !== "granted" && (
                                  <span className="rounded-full bg-[#EA4335]/10 px-2 py-0.5 text-[10px] font-bold text-[#d93025]">
                                    No consent
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleTogglePublish(v.id, v.is_published)}
                                  disabled={isPending}
                                  title={v.is_published ? "Unpublish" : "Publish"}
                                  className="rounded-lg border border-[#d0cabd] bg-white p-1.5 text-[#5f5b57] hover:border-[#1d1a17] hover:text-[#1d1a17] transition"
                                >
                                  {v.is_published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                                <button
                                  onClick={() => setEditingVolunteer(v)}
                                  title="Edit"
                                  className="rounded-lg border border-[#d0cabd] bg-white p-1.5 text-[#5f5b57] hover:border-[#1d1a17] hover:text-[#1d1a17] transition"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVolunteer(v.id, v.full_name)}
                                  disabled={isPending}
                                  title="Delete"
                                  className="rounded-lg border border-[#d0cabd] bg-white p-1.5 text-[#EA4335] hover:border-[#EA4335] transition"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: VOLUNTEERS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "volunteers" && (
          <div className="space-y-6">
            {/* Search and Filters toolbar */}
            <div className="flex flex-col gap-3 rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-white p-4 shadow-[4px_4px_0_rgba(29,26,23,0.9)] md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f5b57]" />
                <input
                  type="text"
                  placeholder="Search by name, role, slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#1d1a17] pl-10 pr-4 text-xs font-medium text-[#1d1a17] outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedTeamFilter}
                  onChange={(e) => setSelectedTeamFilter(e.target.value)}
                  className="h-11 rounded-xl border border-[#1d1a17] bg-white px-3 text-xs font-semibold text-[#1d1a17] outline-none"
                >
                  <option value="all">All Teams</option>
                  <option value="none">No Team Assigned</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="h-11 rounded-xl border border-[#1d1a17] bg-white px-3 text-xs font-semibold text-[#1d1a17] outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Drafts Only</option>
                  <option value="pending">Pending Review</option>
                  <option value="consent-missing">Consent Missing</option>
                </select>

                <button
                  onClick={() => setIsAddingVolunteer(true)}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-[#1d1a17] bg-[#4285F4] px-4 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#3367D6]"
                >
                  <Plus className="h-4 w-4" /> Add Volunteer
                </button>
              </div>
            </div>

            {/* Volunteers Table */}
            <div className="overflow-hidden rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white shadow-[5px_5px_0_rgba(29,26,23,0.9)]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-[#1d1a17] bg-[#f4efe9] font-bold text-[#1d1a17]">
                    <tr>
                      <th className="px-5 py-3.5">Volunteer</th>
                      <th className="px-5 py-3.5">Role</th>
                      <th className="px-5 py-3.5">Team</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Consent</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee]">
                    {filteredVolunteers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-sm text-[#5f5b57]">
                          No volunteers found matching current criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredVolunteers.map((vol) => {
                        const team = teams.find((t) => t.id === vol.team_id);
                        const photoUrl = vol.photo_path
                          ? `/photos/${vol.slug}?v=${encodeURIComponent(vol.updated_at)}`
                          : null;

                        return (
                          <tr key={vol.id} className="transition hover:bg-[#faf9f7]">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#1d1a17] bg-[#f4efe9]">
                                  {photoUrl ? (
                                    <Image src={photoUrl} alt={vol.full_name} fill unoptimized className="object-cover" />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center font-bold text-[#5f5b57]">
                                      {vol.full_name.slice(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-[#1d1a17]">{vol.full_name}</p>
                                  <Link
                                    href={`/volunteer/${vol.slug}`}
                                    target="_blank"
                                    className="text-[11px] text-[#4285F4] hover:underline"
                                  >
                                    /{vol.slug}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-[#5f5b57]">
                              {vol.public_role || <span className="text-[#8d8a86]">—</span>}
                            </td>
                            <td className="px-5 py-3.5 font-medium text-[#1d1a17]">
                              {team ? (
                                <span className="rounded-full border border-[#1d1a17] bg-[#f4efe9] px-2 py-0.5 text-[10px] font-bold">
                                  {team.name}
                                </span>
                              ) : (
                                <span className="text-[#8d8a86]">—</span>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              {vol.is_published ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#d5f0c6] px-2.5 py-0.5 text-[10px] font-bold text-[#2e7d32]">
                                  <Check className="h-3 w-3" /> Published
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#f4efe9] px-2.5 py-0.5 text-[10px] font-bold text-[#5f5b57]">
                                  Draft
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              {vol.consent_status === "granted" ? (
                                <span className="text-[11px] font-semibold text-[#34A853]">Granted</span>
                              ) : (
                                <span className="text-[11px] font-semibold text-[#EA4335]">
                                  {vol.consent_status}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleTogglePublish(vol.id, vol.is_published)}
                                  title={vol.is_published ? "Unpublish profile" : "Publish profile"}
                                  disabled={isPending}
                                  className="rounded-lg border border-[#1d1a17] bg-white p-1.5 text-[#1d1a17] hover:bg-[#f4efe9]"
                                >
                                  {vol.is_published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                                <button
                                  onClick={() => setEditingVolunteer(vol)}
                                  title="Edit volunteer"
                                  className="rounded-lg border border-[#1d1a17] bg-white p-1.5 text-[#1d1a17] hover:bg-[#f4efe9]"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVolunteer(vol.id, vol.full_name)}
                                  title="Delete volunteer"
                                  disabled={isPending}
                                  className="rounded-lg border border-[#EA4335] bg-white p-1.5 text-[#EA4335] hover:bg-[#fce8e6]"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TEAMS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                  Community Teams
                </h2>
                <p className="text-xs text-[#5f5b57]">
                  Categorize volunteers into community teams (Design, Content, Outreach, Tech, Operations, etc.).
                </p>
              </div>
              <button
                onClick={() => setIsAddingTeam(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1d1a17] bg-[#34A853] px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#2d9247]"
              >
                <Plus className="h-3.5 w-3.5" /> Create Team
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((t) => {
                const memberCount = volunteers.filter((v) => v.team_id === t.id).length;

                return (
                  <div
                    key={t.id}
                    className="flex flex-col justify-between rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-white p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base text-[#1d1a17]">{t.name}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            t.is_active ? "bg-[#d5f0c6] text-[#2e7d32]" : "bg-zinc-200 text-zinc-600"
                          }`}
                        >
                          {t.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#8d8a86] font-mono">/{t.slug}</p>
                      {t.description && <p className="mt-2 text-xs text-[#5f5b57] line-clamp-2">{t.description}</p>}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#eee] pt-3 text-xs">
                      <span className="font-bold text-[#5f5b57]">{memberCount} volunteers</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTeam(t)}
                          className="rounded border border-[#1d1a17] px-2.5 py-1 text-xs font-bold hover:bg-[#f4efe9]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (memberCount > 0) {
                              alert("Cannot delete team with assigned volunteers. Reassign volunteers first.");
                              return;
                            }
                            if (confirm(`Delete team "${t.name}"?`)) {
                              startTransition(async () => {
                                const res = await deleteTeamAction(t.id);
                                if (res.status === "success") {
                                  setTeams((prev) => prev.filter((x) => x.id !== t.id));
                                  showNotification(res.message);
                                } else if (res.status === "error") {
                                  showNotification(res.message, true);
                                }
                              });
                            }
                          }}
                          className="rounded border border-[#EA4335] px-2.5 py-1 text-xs font-bold text-[#EA4335] hover:bg-[#fce8e6]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BADGES & MASTER QR CODE */}
        {/* ============================================================== */}
        {activeTab === "qr" && (
          <div className="space-y-8">
            <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[5px_5px_0_rgba(29,26,23,0.9)] sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                    Master ID-Card QR Code
                  </h2>
                  <p className="mt-2 text-sm text-[#5f5b57]">
                    This master QR code is printed on every GDG Noida volunteer badge. When scanned with any phone camera, it directs users immediately to the public directory where they can search or browse volunteer profiles.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#5f5b57]">Encoded Destination URL</p>
                      <p className="mt-1 break-all rounded-xl border border-[#1d1a17] bg-[#f4efe9] px-4 py-2.5 font-mono text-xs text-[#1d1a17]">
                        {siteUrl.replace(/\/$/, "")}/teams
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={`data:image/svg+xml;utf8,${encodeURIComponent(masterQrSvg)}`}
                        download="gdg-noida-master-qr.svg"
                        className="inline-flex items-center gap-1.5 rounded-full border-[2px] border-[#1d1a17] bg-[#4285F4] px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0_rgba(29,26,23,0.9)] hover:bg-[#3367D6]"
                      >
                        Download Vector SVG (Print Ready)
                      </a>
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 rounded-full border-[2px] border-[#1d1a17] bg-white px-5 py-2.5 text-xs font-bold text-[#1d1a17] shadow-[3px_3px_0_rgba(29,26,23,0.9)] hover:bg-[#f4efe9]"
                      >
                        <Printer className="h-4 w-4" /> Print Badge Sheet
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-6 shadow-[3px_3px_0_rgba(29,26,23,0.9)]">
                  <div className="h-48 w-48 rounded-xl bg-white p-2 shadow-inner">
                    <img src={masterQrDataUrl} alt="Master QR Code" className="h-full w-full object-contain" />
                  </div>
                  <p className="mt-3 text-[11px] font-bold text-[#5f5b57]">Scan to test with camera</p>
                </div>
              </div>
            </div>

            {/* Volunteer Badge Preview Sheet */}
            <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[5px_5px_0_rgba(29,26,23,0.9)] sm:p-8">
              <h3 className="text-xl font-bold text-[#1d1a17]">Volunteer ID Card Previews ({published} published)</h3>
              <p className="mt-1 text-xs text-[#5f5b57]">Pre-formatted cards ready for event badges or printing.</p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {volunteers
                  .filter((v) => v.is_published)
                  .slice(0, 6)
                  .map((vol) => {
                    const qrUrl = qrDataUrl(`${siteUrl.replace(/\/$/, "")}/volunteer/${vol.slug}`, 2);
                    const photoUrl = vol.photo_path
                      ? `/photos/${vol.slug}?v=${encodeURIComponent(vol.updated_at)}`
                      : null;

                    return (
                      <div
                        key={vol.id}
                        className="rounded-2xl border-[2px] border-[#1d1a17] bg-[#f7f2ea] p-5 shadow-[4px_4px_0_rgba(29,26,23,0.9)]"
                      >
                        <div className="flex items-center justify-between border-b border-[#1d1a17]/20 pb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#4285F4]">GDG NOIDA</span>
                          <span className="text-[10px] font-bold text-[#5f5b57]">COMMUNITY</span>
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#1d1a17] bg-white">
                            {photoUrl ? (
                              <Image src={photoUrl} alt={vol.full_name} fill unoptimized className="object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-bold text-lg text-[#5f5b57]">
                                {vol.full_name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-black text-sm text-[#1d1a17]">{vol.full_name}</h4>
                            <p className="text-xs text-[#5f5b57]">{vol.public_role || "Volunteer"}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#1d1a17]/20 pt-3">
                          <span className="text-[10px] font-semibold text-[#8d8a86]">Scan for Bio & Socials</span>
                          <img src={qrUrl} alt="QR Code" className="h-10 w-10 rounded border border-[#1d1a17]" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: INVITE LINKS */}
        {/* ============================================================== */}
        {activeTab === "invites" && (
          <div className="space-y-6">
            <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[5px_5px_0_rgba(29,26,23,0.9)] sm:p-8">
              <h2 className="text-xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                Secure Invite Links
              </h2>
              <p className="mt-1 text-xs text-[#5f5b57]">
                Generate one-time links for volunteers to submit or update their profile information. Links expire automatically in 24 hours.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => handleGenerateInvite("upload")}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full border-[2px] border-[#1d1a17] bg-[#4285F4] px-5 py-2.5 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#3367D6]"
                >
                  <Plus className="h-4 w-4" /> Generate New Volunteer Registration Link
                </button>
              </div>

              {inviteResult && (
                <div className="mt-6 rounded-2xl border border-[#4285F4] bg-[#4285F4]/10 p-5">
                  <p className="text-xs font-bold text-[#4285F4] uppercase tracking-wider">Generated Invite Link (24hr validity)</p>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      value={inviteResult}
                      className="h-11 flex-1 rounded-xl border border-[#1d1a17] bg-white px-3 font-mono text-xs text-[#1d1a17]"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(inviteResult);
                        setInviteCopied(true);
                        setTimeout(() => setInviteCopied(false), 2000);
                      }}
                      className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-[#1d1a17] bg-[#1d1a17] px-4 text-xs font-bold text-white hover:bg-black"
                    >
                      {inviteCopied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                      {inviteCopied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL: EDIT VOLUNTEER */}
      {/* ============================================================== */}
      {editingVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[6px_6px_0_rgba(29,26,23,0.9)] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#eee] pb-4">
              <h3 className="text-xl font-black text-[#1d1a17]">Edit Volunteer Profile</h3>
              <button onClick={() => setEditingVolunteer(null)} className="rounded-full p-1.5 hover:bg-[#f4efe9]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await updateVolunteerAction(IDLE, formData);
                  if (res.status === "success") {
                    showNotification(res.message);
                    setEditingVolunteer(null);
                    // update local state
                    const name = formData.get("full_name") as string;
                    const role = formData.get("public_role") as string;
                    const teamId = formData.get("team_id") as string;
                    const bio = formData.get("bio") as string;
                    const isPub = formData.get("is_published") === "on";
                    setVolunteers((prev) =>
                      prev.map((v) =>
                        v.id === editingVolunteer.id
                          ? { ...v, full_name: name, public_role: role, team_id: teamId || null, bio, is_published: isPub }
                          : v
                      )
                    );
                  } else if (res.status === "error") {
                    showNotification(res.message, true);
                  }
                });
              }}
              className="mt-6 space-y-4"
            >
              <input type="hidden" name="id" value={editingVolunteer.id} />

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  defaultValue={editingVolunteer.full_name}
                  required
                  className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1d1a17]">Public Role</label>
                  <input
                    type="text"
                    name="public_role"
                    defaultValue={editingVolunteer.public_role || ""}
                    className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1d1a17]">Team</label>
                  <select
                    name="team_id"
                    defaultValue={editingVolunteer.team_id || ""}
                    className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] bg-white px-3 text-sm outline-none"
                  >
                    <option value="">No Team</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Bio</label>
                <textarea
                  name="bio"
                  rows={2}
                  defaultValue={editingVolunteer.bio || ""}
                  className="mt-1 w-full rounded-xl border border-[#1d1a17] p-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  defaultValue={Array.isArray(editingVolunteer.skills) ? editingVolunteer.skills.join(", ") : editingVolunteer.skills || ""}
                  className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Replace Profile Photo</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/png,image/webp"
                  className="mt-1 block w-full text-xs text-[#5f5b57]"
                />
              </div>

              {/* Social Links */}
              <div className="border-t border-[#eee] pt-3">
                <p className="text-xs font-bold text-[#1d1a17] mb-2">Social Links</p>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_PLATFORMS.map((p) => {
                    const currentEntry = editingVolunteer.social_links?.[p.key];
                    const urlVal = typeof currentEntry === "object" ? currentEntry?.url : currentEntry;
                    return (
                      <div key={p.key}>
                        <label className="text-[11px] font-semibold text-[#5f5b57]">{p.label}</label>
                        <input
                          type="url"
                          name={`social_${p.key}_url`}
                          defaultValue={urlVal || ""}
                          placeholder="https://..."
                          className="mt-1 h-9 w-full rounded-lg border border-[#1d1a17] px-2 text-xs"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status toggles */}
              <div className="flex items-center gap-6 border-t border-[#eee] pt-4">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_published"
                    defaultChecked={editingVolunteer.is_published}
                    className="h-4 w-4 rounded"
                  />
                  Published on Directory
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold">Consent Status:</label>
                  <select
                    name="consent_status"
                    defaultValue={editingVolunteer.consent_status || "granted"}
                    className="rounded border border-[#1d1a17] p-1 text-xs"
                  >
                    <option value="granted">Granted</option>
                    <option value="pending">Pending</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eee]">
                <button
                  type="button"
                  onClick={() => setEditingVolunteer(null)}
                  className="rounded-full border border-[#1d1a17] px-4 py-2 text-xs font-bold hover:bg-[#f4efe9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border-[2px] border-[#1d1a17] bg-[#4285F4] px-6 py-2 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#3367D6]"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD VOLUNTEER */}
      {/* ============================================================== */}
      {isAddingVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[6px_6px_0_rgba(29,26,23,0.9)] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#eee] pb-4">
              <h3 className="text-xl font-black text-[#1d1a17]">Add New Volunteer Profile</h3>
              <button onClick={() => setIsAddingVolunteer(false)} className="rounded-full p-1.5 hover:bg-[#f4efe9]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await createVolunteerAction(IDLE, formData);
                  if (res.status === "success") {
                    showNotification(res.message);
                    setIsAddingVolunteer(false);
                    window.location.reload();
                  } else if (res.status === "error") {
                    showNotification(res.message, true);
                  }
                });
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">
                  Full Name <span className="text-[#EA4335]">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  placeholder="e.g. Rahul Verma"
                  className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1d1a17]">Public Role</label>
                  <input
                    type="text"
                    name="public_role"
                    placeholder="e.g. Design Volunteer"
                    className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1d1a17]">Team</label>
                  <select name="team_id" className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] bg-white px-3 text-sm outline-none">
                    <option value="">No Team</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Bio</label>
                <textarea
                  name="bio"
                  rows={2}
                  placeholder="Short description..."
                  className="mt-1 w-full rounded-xl border border-[#1d1a17] p-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="React, Design, Cloud"
                  className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Profile Photo</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/png,image/webp"
                  className="mt-1 block w-full text-xs text-[#5f5b57]"
                />
              </div>

              <div className="flex items-center gap-6 border-t border-[#eee] pt-4">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input type="checkbox" name="is_published" defaultChecked className="h-4 w-4 rounded" />
                  Publish Immediately
                </label>
                <input type="hidden" name="consent_status" value="granted" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eee]">
                <button
                  type="button"
                  onClick={() => setIsAddingVolunteer(false)}
                  className="rounded-full border border-[#1d1a17] px-4 py-2 text-xs font-bold hover:bg-[#f4efe9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border-[2px] border-[#1d1a17] bg-[#4285F4] px-6 py-2 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#3367D6]"
                >
                  {isPending ? "Creating..." : "Create Volunteer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT TEAM */}
      {/* ============================================================== */}
      {(isAddingTeam || editingTeam) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-6 shadow-[6px_6px_0_rgba(29,26,23,0.9)] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#eee] pb-4">
              <h3 className="text-xl font-black text-[#1d1a17]">{editingTeam ? "Edit Team" : "Create New Team"}</h3>
              <button
                onClick={() => {
                  setIsAddingTeam(false);
                  setEditingTeam(null);
                }}
                className="rounded-full p-1.5 hover:bg-[#f4efe9]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await saveTeamAction(IDLE, formData);
                  if (res.status === "success") {
                    showNotification(res.message);
                    setIsAddingTeam(false);
                    setEditingTeam(null);
                    window.location.reload();
                  } else if (res.status === "error") {
                    showNotification(res.message, true);
                  }
                });
              }}
              className="mt-6 space-y-4"
            >
              {editingTeam && <input type="hidden" name="id" value={editingTeam.id} />}

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">
                  Team Name <span className="text-[#EA4335]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingTeam?.name || ""}
                  required
                  placeholder="e.g. Technical Operations"
                  className="mt-1 h-10 w-full rounded-xl border border-[#1d1a17] px-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1a17]">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingTeam?.description || ""}
                  placeholder="What this team does..."
                  className="mt-1 w-full rounded-xl border border-[#1d1a17] p-2 text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingTeam ? editingTeam.is_active : true}
                  className="h-4 w-4 rounded"
                />
                <label htmlFor="is_active" className="text-xs font-bold cursor-pointer">
                  Team is Active
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eee]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingTeam(false);
                    setEditingTeam(null);
                  }}
                  className="rounded-full border border-[#1d1a17] px-4 py-2 text-xs font-bold hover:bg-[#f4efe9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border-[2px] border-[#1d1a17] bg-[#34A853] px-6 py-2 text-xs font-bold text-white shadow-[2px_2px_0_rgba(29,26,23,0.9)] hover:bg-[#2d9247]"
                >
                  {isPending ? "Saving..." : editingTeam ? "Save Team" : "Create Team"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
