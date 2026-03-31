'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ReviewUpdate =
  Database["public"]["Tables"]["reviews"]["Update"]

type UserDegreeUpdate =
  Database["public"]["Tables"]["user_degrees"]["Update"]

export type UpdateReviewPayload = Pick<
  ReviewUpdate,
  "comment" | "overall_rating" | "career_rating" | "curriculum_rating" | "lecturer_rating" | "value_rating" | "would_recommend" | "facilities_rating" | "employment_status" 
> & Pick<UserDegreeUpdate, "id" | "degree_id" | "graduation_year" | "graduation_month" | "user_id" >

const BaseReviewSchema = z.object({
  comment: z.string().min(10).max(2000),
  overall_rating: z.number().int().min(1).max(5),
  career_rating: z.number().int().min(1).max(5),
  curriculum_rating: z.number().int().min(1).max(5),
  lecturer_rating: z.number().int().min(1).max(5),
  value_rating: z.number().int().min(1).max(5),
  facilities_rating: z.number().int().min(1).max(5),
  would_recommend: z.boolean().nullable(),
  employment_status: z.enum(["Employed", "Unemployed", "Studying", "Other"]),
  degree_id: z.uuid(),
  graduation_year: z.number().int().min(1900).max(2100),
  graduation_month: z.number().int().min(1).max(12),
});

const CreateReviewSchema = BaseReviewSchema;

const UpdateReviewSchema = BaseReviewSchema.extend({
  user_degrees_id: z.uuid(),
});

export async function createReview (
  payload: UpdateReviewPayload,
  username: string,
) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  const validatedFields = CreateReviewSchema.safeParse(payload);
  
  if (!validatedFields.success) {
    //@ts-expect-error object shape
    const errorFields = Object.keys(z.treeifyError(validatedFields.error).properties)?.join(", ");

    return {
      error: "Validation Failed",
      details: z.treeifyError(validatedFields.error), // validatedFields.error.flatten().fieldErrors,
      errorFields: errorFields ?? "",
    };
  }

  const data = validatedFields.data;

  const { error } = await (await supabase).rpc('create_review_and_degree_v1', {
    p_user_id: user?.id,
    p_comment: data.comment,
    p_overall_rating: data.overall_rating,
    p_career_rating: data.career_rating,
    p_curriculum_rating: data.curriculum_rating,
    p_lecturer_rating: data.lecturer_rating,
    p_value_rating: data.value_rating,
    p_would_recommend: data.would_recommend,
    p_facilities_rating: data.facilities_rating,
    p_employment_status: data.employment_status,
    p_degree_id: data.degree_id,
    p_graduation_year: data.graduation_year,
    p_graduation_month: data.graduation_month,
  });

  if (error) {
    console.log(error.message)
    return { error: "Database transaction failed", message: error.message };
  }

  revalidatePath(`/profile/${username}`);
  return { success: true };
}


export async function updateReview (
  id: string,
  payload: UpdateReviewPayload,
  username: string,
) {
  const {
    comment,
    overall_rating,
    career_rating,
    curriculum_rating,
    lecturer_rating,
    value_rating,
    would_recommend,
    facilities_rating,
    employment_status,
    id: user_degrees_id,
    degree_id,
    graduation_year,
    graduation_month,
    user_id,
  } = payload
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user || user.id !== user_id) return { error: "Unauthorized", status: 401 };

  const renamedPayload = {
    ...payload,
    user_degrees_id: user_degrees_id
  };

  const validatedFields = UpdateReviewSchema.safeParse(renamedPayload);

  if (!validatedFields.success) {
    return {
      error: "Validation Failed",
      details: z.treeifyError(validatedFields.error) // validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const { error } = await (await supabase).rpc('update_review_and_degree_v1', {
    p_review_id: id,
    p_user_degree_id: data.user_degrees_id,
    p_comment: data.comment,
    p_overall_rating: data.overall_rating,
    p_career_rating: data.career_rating,
    p_curriculum_rating: data.curriculum_rating,
    p_lecturer_rating: data.lecturer_rating,
    p_value_rating: data.value_rating,
    p_would_recommend: data.would_recommend,
    p_facilities_rating: data.facilities_rating,
    p_employment_status: data.employment_status,
    p_degree_id: data.degree_id,
    p_graduation_year: data.graduation_year,
    p_graduation_month: data.graduation_month,
  });

  if (error) {
    return { error: "Database transaction failed", message: error.message };
  }

  revalidatePath(`/profile/${username}`);
  return { success: true };
}


export async function deleteReview(id: string, username: string) {
  const supabase = createClient();
  const { error } = await (await supabase).rpc('delete_review_v1', {
    p_user_degree_id: id,
  });

  if (error) {
    console.log("Error deleting revirew: ", error);
    return { error: "Failed to delete review.", message: error.message };
  };
  
  revalidatePath(`/profile/${username}`);
  return { success: true };
}

export async function likeReview (reviewId: string) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user) {
    throw new Error ( "Please sign in to like." );
  }

  const { data, error } = await (await supabase).rpc('like_review_v1', {
    p_review_id: reviewId,
  });

  if (error) {
    console.log("Error in liking review: ", error);
    throw new Error ( "Failed to like/unlike review." );
    // return { error: "Failed to like/unlike review.", message: error.message }
  }

  return { likeCount: data.likeCount, selfLikeStatus: data.selfLikeStatus };
}

export async function fetchLikeCountAndStatus (reviewId: string) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  const { count, error } = await (await supabase)
    .from('review_votes')
    .select('id', { count: 'exact', head: true }) // head: true = don't return rows
    .eq('review_id', reviewId)
    .eq('is_helpful', true);

  const { data: id, error: likeStatusError } = 
    !user
      ? { data: [], error: null }
      : await (await supabase)
        .from('review_votes')
        .select('id')
        .eq('review_id', reviewId)
        .eq('user_id', user?.id);

  if (error) {
    console.log("Error in fetching like count: ", error);
    throw new Error("Error in fetching like count");
  }

  if (likeStatusError) {
    console.log("Error in fetching like status: ", error);
    throw new Error("Error in fetching like status");
  }

  return { count: count ?? 0, likeStatus: !!id.length };
}