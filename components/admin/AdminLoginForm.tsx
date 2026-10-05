"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminSignInAction } from "@/app/teams/admin/actions";
import { type ActionState, IDLE } from "@/lib/id-card/validation/common";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(IDLE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await adminSignInAction(state, formData);
      if (result) {
        setState(result);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {state.status === "error" && (
        <div role="alert" className="flex items-center gap-2.5 rounded-xl border border-[#EA4335]/40 bg-[#fce8e6] p-3.5 text-xs font-semibold text-[#d93025]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#1d1a17]">
          Admin Email
        </label>
        <div className="relative mt-1.5">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f5b57]" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@gdgnoida.com"
            className="h-12 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white pl-10 pr-4 text-sm text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#1d1a17]">
          Password
        </label>
        <div className="relative mt-1.5">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f5b57]" />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="h-12 w-full rounded-xl border-[2px] border-[#1d1a17] bg-white pl-10 pr-4 text-sm text-[#1d1a17] outline-none transition focus:ring-2 focus:ring-[#4285F4]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border-[2px] border-[#1d1a17] bg-[#4285F4] text-sm font-bold text-white shadow-[3px_3px_0_rgba(29,26,23,0.9)] transition hover:-translate-y-0.5 hover:bg-[#3367D6] disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Sparkles className="h-4 w-4 animate-spin" /> Verifying Credentials...
          </>
        ) : (
          <>
            Sign In to Admin Panel <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="pt-2 text-center text-xs text-[#8d8a86]">
        Enter your administrative account credentials. Access is restricted to authorized GDG Noida organizers.
      </p>
    </form>
  );
}
