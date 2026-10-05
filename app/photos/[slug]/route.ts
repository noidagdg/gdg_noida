import { createClient } from "@supabase/supabase-js";

const PHOTO_BUCKET = "volunteer-photos";

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

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;

  const notFound = () =>
    new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "public, max-age=60", "X-Content-Type-Options": "nosniff" },
    });

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) {
    return notFound();
  }

  let photoPath: string | null = null;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("public_volunteers")
      .select("photo_path")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    photoPath = (data as { photo_path?: string | null } | null)?.photo_path ?? null;
  } catch (error) {
    console.error("Could not resolve the volunteer photo", error);
    return new Response("Unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!photoPath) return notFound();

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.storage.from(PHOTO_BUCKET).download(photoPath);

    if (error || !data) return notFound();

    const type = data.type || "image/jpeg";
    if (!/^image\/(jpeg|png|webp)$/i.test(type)) return notFound();

    return new Response(data, {
      headers: {
        "Content-Type": type,
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("Could not fetch the volunteer photo from storage", error);
    return notFound();
  }
}
