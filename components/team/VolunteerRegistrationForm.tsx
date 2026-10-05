"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { submitVolunteerFormAction } from "@/app/teams/forms/actions";
import { SOCIAL_PLATFORMS } from "@/lib/id-card/social";
import { type ActionState, IDLE } from "@/lib/id-card/validation/common";
import { CheckCircle2, Upload, AlertCircle, Sparkles, ArrowRight, UserCheck, Linkedin, Github, Globe, Instagram, X } from "lucide-react";

type TeamOption = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  teams: TeamOption[];
};

export default function VolunteerRegistrationForm({ teams }: Props) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(IDLE);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bioLength, setBioLength] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Maximum size is 5MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitVolunteerFormAction(state, formData);
      setState(result);
    });
  };

  if (state.status === "success") {
    return (
      <div className="rounded-[1.6rem] border-[2px] border-[#1d1a17] bg-white p-8 text-center shadow-[6px_6px_0_rgba(29,26,23,0.9)] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[2px] border-[#1d1a17] bg-[#d5f0c6]">
          <CheckCircle2 className="h-8 w-8 text-[#2e7d32]" />
        </div>
        <h2 className="mt-6 text-3xl font-black text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
          Submission Received!
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base text-[#5f5b57]">
          Thank you for contributing to GDG Noida! Your profile details have been securely recorded. An administrator will review your information shortly before it is published to the public directory.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/teams"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[2px] border-[#1d1a17] bg-[#4285F4] px-6 py-3 font-bold text-white shadow-[4px_4px_0_rgba(29,26,23,0.9)] transition hover:-translate-y-0.5 hover:bg-[#3367D6]"
          >
            Back to Teams Directory <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setState(IDLE);
              setPreviewUrl(null);
            }}
            className="rounded-full border-[2px] border-[#1d1a17] bg-[#f7f2ea] px-6 py-3 font-semibold text-[#1d1a17] transition hover:bg-[#eee8dd]"
          >
            Submit Another Profile
          </button>
        </div>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors || {} : {};

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {state.status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border-[2px] border-[#d93025] bg-[#fce8e6] p-4 text-[#d93025]">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-bold">{state.message}</p>
            {Object.keys(errors).length > 0 && (
              <ul className="mt-1 list-disc pl-5 text-sm">
                {Object.entries(errors).map(([key, msg]) => (
                  <li key={key}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-6 shadow-[4px_4px_0_rgba(29,26,23,0.9)] sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#1d1a17] bg-[#4285F4] text-xs font-black text-white">
            1
          </span>
          <h3 className="text-xl font-bold text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            Basic Information
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="full_name" className="block text-sm font-bold text-[#1d1a17]">
              Full Name <span className="text-[#EA4335]">*</span>
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              maxLength={100}
              placeholder="e.g. Aditi Sharma"
              className="mt-1.5 h-12 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white px-4 text-base text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
            />
            {errors.full_name && <p className="mt-1 text-xs text-[#EA4335]">{errors.full_name}</p>}
          </div>

          <div>
            <label htmlFor="public_role" className="block text-sm font-bold text-[#1d1a17]">
              Community Role / Title <span className="text-[#EA4335]">*</span>
            </label>
            <input
              id="public_role"
              name="public_role"
              type="text"
              required
              maxLength={100}
              placeholder="e.g. Core Team Member, Tech Volunteer"
              className="mt-1.5 h-12 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white px-4 text-base text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
            />
            {errors.public_role && <p className="mt-1 text-xs text-[#EA4335]">{errors.public_role}</p>}
          </div>

          <div>
            <label htmlFor="team_id" className="block text-sm font-bold text-[#1d1a17]">
              Assigned Team
            </label>
            <select
              id="team_id"
              name="team_id"
              defaultValue=""
              className="mt-1.5 h-12 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white px-4 text-base text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
            >
              <option value="">No specific team / General volunteer</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.team_id && <p className="mt-1 text-xs text-[#EA4335]">{errors.team_id}</p>}
          </div>
        </div>
      </div>

      {/* 2. Photo Upload */}
      <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-6 shadow-[4px_4px_0_rgba(29,26,23,0.9)] sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#1d1a17] bg-[#FBBC04] text-xs font-black text-[#1d1a17]">
            2
          </span>
          <div>
            <h3 className="text-xl font-bold text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              Profile Photo
            </h3>
            <p className="text-xs text-[#5f5b57]">JPEG, PNG, or WebP. Max 5MB. Portrait orientation works best.</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-[2px] border-[#1d1a17] bg-[#f4efe9]">
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" fill unoptimized className="object-cover" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-center p-2 text-xs text-[#8d8a86]">
                <UserCheck className="h-8 w-8 mb-1 text-[#5f5b57]" />
                No photo chosen
              </div>
            )}
          </div>

          <div
            className={`flex-1 rounded-2xl border-2 border-dashed p-6 text-center transition ${
              isDragging ? "border-[#4285F4] bg-[#4285F4]/10" : "border-[#1d1a17]/40 bg-white hover:border-[#1d1a17]"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) {
                handlePhotoSelect(file);
                if (fileInputRef.current) {
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(file);
                  fileInputRef.current.files = dataTransfer.files;
                }
              }
            }}
          >
            <input
              ref={fileInputRef}
              id="photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => handlePhotoSelect(e.target.files?.[0])}
            />
            <label
              htmlFor="photo"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border-[2px] border-[#1d1a17] bg-[#f4efe9] px-5 py-2.5 text-sm font-bold text-[#1d1a17] shadow-[2px_2px_0_rgba(29,26,23,0.9)] transition hover:bg-[#1d1a17] hover:text-white"
            >
              <Upload className="h-4 w-4" />
              {previewUrl ? "Change Photo" : "Choose Profile Photo"}
            </label>
            <p className="mt-2 text-xs text-[#5f5b57]">or drag and drop your photo here</p>
          </div>
        </div>
      </div>

      {/* 3. About & Skills */}
      <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-6 shadow-[4px_4px_0_rgba(29,26,23,0.9)] sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#1d1a17] bg-[#34A853] text-xs font-black text-white">
            3
          </span>
          <h3 className="text-xl font-bold text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            About & Skills
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="bio" className="block text-sm font-bold text-[#1d1a17]">
                Short Bio
              </label>
              <span className="text-xs text-[#5f5b57]">{bioLength}/600</span>
            </div>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              maxLength={600}
              placeholder="Tell the community a little bit about yourself, your interests, and what you do..."
              onChange={(e) => setBioLength(e.target.value.length)}
              className="mt-1.5 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white p-4 text-base text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
            />
            {errors.bio && <p className="mt-1 text-xs text-[#EA4335]">{errors.bio}</p>}
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-bold text-[#1d1a17]">
              Skills & Technologies
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g. Next.js, Flutter, Cloud, UI/UX, Python, Community Management"
              className="mt-1.5 h-12 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white px-4 text-base text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
            />
            <p className="mt-1 text-xs text-[#5f5b57]">Separate individual skills with commas.</p>
            {errors.skills && <p className="mt-1 text-xs text-[#EA4335]">{errors.skills}</p>}
          </div>
        </div>
      </div>

      {/* 4. Social Links */}
      <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-6 shadow-[4px_4px_0_rgba(29,26,23,0.9)] sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#1d1a17] bg-[#EA4335] text-xs font-black text-white">
            4
          </span>
          <div>
            <h3 className="text-xl font-bold text-[#1d1a17]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              Social & Portfolio Links
            </h3>
            <p className="text-xs text-[#5f5b57]">Connect your profiles so attendees can network with you.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SOCIAL_PLATFORMS.map((platform) => {
            const fieldId = `social_${platform.key}_url`;
            const Icon =
              platform.key === "linkedin"
                ? Linkedin
                : platform.key === "github"
                ? Github
                : platform.key === "x"
                ? X
                : platform.key === "instagram"
                ? Instagram
                : Globe;

            return (
              <div key={platform.key} className={platform.key === "website" ? "sm:col-span-2" : ""}>
                <label htmlFor={fieldId} className="flex items-center gap-1.5 text-xs font-bold text-[#1d1a17]">
                  <Icon className="h-3.5 w-3.5 text-[#5f5b57]" />
                  {platform.label}
                </label>
                <input
                  id={fieldId}
                  name={fieldId}
                  type="url"
                  placeholder={platform.placeholder}
                  className="mt-1 h-11 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white px-3.5 text-sm text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
                />
                {errors[fieldId] && <p className="mt-1 text-xs text-[#EA4335]">{errors[fieldId]}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Consent & Submit */}
      <div className="rounded-[1.4rem] border-[2px] border-[#1d1a17] bg-[#fcfbfa] p-6 shadow-[4px_4px_0_rgba(29,26,23,0.9)] sm:p-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent_agreed"
            required
            className="mt-1 h-5 w-5 rounded border-[2px] border-[#1d1a17] text-[#4285F4] focus:ring-0"
          />
          <span className="text-sm font-medium leading-relaxed text-[#1d1a17]">
            I consent to GDG Noida storing and displaying my name, community role, photo, and approved social links on the public volunteer directory and event ID cards.
          </span>
        </label>
        {errors.consent_agreed && <p className="mt-2 text-xs text-[#EA4335]">{errors.consent_agreed}</p>}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#d0cabd] pt-6 sm:flex-row">
          <Link href="/teams" className="text-sm font-semibold text-[#5f5b57] hover:text-[#1d1a17] hover:underline">
            Cancel and return to Directory
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-[2px] border-[#1d1a17] bg-[#d5f0c6] px-8 text-base font-bold text-[#1d1a17] shadow-[4px_4px_0_rgba(29,26,23,0.9)] transition hover:-translate-y-0.5 hover:bg-[#1d1a17] hover:text-[#f5f2ec] disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                Submit for Review <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
