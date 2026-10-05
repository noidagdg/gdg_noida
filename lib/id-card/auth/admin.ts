import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, type User } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const COOKIE_TOKEN_NAME = "gdg_admin_token";
const COOKIE_EMAIL_NAME = "gdg_admin_email";

function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    throw new Error("Supabase is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export type AdminSession =
  | { status: "unconfigured" }
  | { status: "anonymous" }
  | { status: "not_admin"; user: User }
  | { status: "admin"; user: User };

export async function loginAdmin(
  email: string,
  pass: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  const cleanEmail = email.trim();
  const cleanPass = pass.trim();

  if (!cleanEmail || !cleanPass) {
    return { ok: false, error: "Please enter both email and password." };
  }

  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPass,
    });

    if (error || !data.user || !data.session) {
      if (error?.status === 429) {
        return { ok: false, error: "Too many login attempts. Please wait a few minutes and try again." };
      }
      return { ok: false, error: error?.message || "The email or password is incorrect." };
    }

    // Optional admin_users verification: if admin_users table exists and has rows, ensure user is present
    try {
      const adminClient = getSupabaseAdmin();
      const { data: adminRow, error: adminErr } = await adminClient
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      // If admin_users table exists and has data, enforce it. If error occurs (e.g. table not created), trust Supabase Auth user.
      if (!adminErr && adminRow === null) {
        // Table exists, but this user is not in admin_users
        const { count } = await adminClient.from("admin_users").select("user_id", { count: "exact", head: true });
        if (count && count > 0) {
          return { ok: false, error: "This Supabase account is not authorized as an administrator." };
        }
      }
    } catch {
      // If getSupabaseAdmin fails or table doesn't exist, allow authenticated Supabase user
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_TOKEN_NAME, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (data.user.email) {
      cookieStore.set(COOKIE_EMAIL_NAME, data.user.email, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { ok: true, user: data.user };
  } catch (err) {
    console.error("loginAdmin error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Failed to sign in. Please try again." };
  }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_TOKEN_NAME);
  cookieStore.delete(COOKIE_EMAIL_NAME);
}

export async function getAdminSession(): Promise<AdminSession> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) return { status: "unconfigured" };

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_TOKEN_NAME)?.value;

  if (!token) return { status: "anonymous" };

  try {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return { status: "anonymous" };
    }

    return { status: "admin", user: data.user };
  } catch (err) {
    console.error("getAdminSession error:", err);
    return { status: "anonymous" };
  }
}

export async function requireAdmin(): Promise<{ user: User }> {
  const session = await getAdminSession();
  if (session.status !== "admin") {
    redirect("/teams/admin/login");
  }
  return { user: session.user };
}
