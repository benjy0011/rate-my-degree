'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/database";

type ReviewUpdate =
  Database["public"]["Tables"]["reviews"]["Update"]

export type UpdateReviewPayload = Pick<
  ReviewUpdate,
  "comment" | "overall_rating" | "career_rating" | "curriculum_rating" | "lecturer_rating" | "value_rating" | "would_recommend" | "facilities_rating" | "employment_status"
>

export async function updateReview(
  id: string,
  payload: UpdateReviewPayload,
) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("reviews")
    .update(payload)
    .eq("id", id)
    .select()
    .single()

    if (error) throw error;
    return data;
}


export async function deleteReview(id: string) {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from("reviews")
    .delete()
    .eq("id", id)

  if (error) throw error
}