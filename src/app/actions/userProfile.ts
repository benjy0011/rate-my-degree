'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/database";
import { revalidatePath } from "next/cache";

type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

interface UpdateReviewSchema {
  bio: string;
  is_male: boolean;
  username: string;
}

export async function fetchCurrentUserProfileData() {
  const supabase = createClient();
  const { data: userData, error: userError } = (await (await supabase).auth.getUser());

  if (userError) throw userError;

  if (!userData.user) return null;

  const { data, error } = await (await supabase)
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (error) throw error;
  return data;
}


export async function updateCurrentUserProfileData( { bio, is_male, username } : UpdateReviewSchema ) {
  const supabase = createClient();
  const { data: userData, error: userError } = (await (await supabase).auth.getUser());

  if (userError) return { error: "Unauthorized", status: 401 };

  if (!userData.user) return { error: "User not found", status: 401 };

  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("username")
    .eq("id", userData.user.id)
    .single();

  const isUsernameChanged = profile?.username !== username;

  const { error } = await (await supabase).rpc('update_profile_data_v1', {
    p_bio: bio,
    p_is_male: is_male,
    p_username: username,
  });

  if (error) {
    console.error(error)
    throw new Error(error.message);
    return { error: "Update profile failed", message: error?.message };
  }

  if (!isUsernameChanged) {
    revalidatePath(`/profile/${username}`);
  }

  return {
    success: true,
    redirectTo: isUsernameChanged ? `/profile/${username}` : null
  };
}