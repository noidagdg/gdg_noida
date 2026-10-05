'use server';

import { getSupabaseAdmin } from '../../lib/supabaseAdmin';

export async function updateVolunteer(volunteerId: string, data: Partial<{
  full_name: string;
  public_role: string | null;
  team_name: string | null;
  bio: string | null;
}>) {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('public_volunteers')
      .update(data)
      .eq('id', volunteerId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to update volunteer:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}