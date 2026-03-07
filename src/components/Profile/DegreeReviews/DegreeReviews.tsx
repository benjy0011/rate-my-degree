import { createClient } from "@/lib/supabase/server"
import { ProfileComponentProps } from "@/types/global";
import { notFound } from "next/navigation";
import DegreeReviewsClient from "./DegreeReviewsClient";
import { Database } from "@/types/database";

type ProfileRow =
  Database["public"]["Tables"]["profiles"]["Row"]

type UserDegreeRow =
  Database["public"]["Tables"]["user_degrees"]["Row"]

type ReviewRow =
  Database["public"]["Tables"]["reviews"]["Row"]

type DegreeRow =
  Database["public"]["Tables"]["degrees"]["Row"]

type UniversityRow =
  Database["public"]["Tables"]["universities"]["Row"]


export type UserDegree = (UserDegreeRow & {
  reviews: ReviewRow
  degrees: DegreeRow & {
    universities: UniversityRow
  }
})
export type DegreeReviewsQueryResult = ProfileRow & {
  user_degrees: UserDegree[]
}

const DegreeReviews = async ({
  username,
  isCurrentUser
} : ProfileComponentProps) => {
  const supabase = createClient();

  const { data: user } = await (await supabase)
    .from("profiles")
    .select(`
      full_name,
      user_degrees (
        id,
        user_id,
        graduation_year,
        graduation_month,
        reviews (
          id,
          overall_rating,
          curriculum_rating,
          career_rating,
          lecturer_rating,
          facilities_rating,
          value_rating,
          would_recommend,
          comment,
          employment_status,
          helpful_count,
          created_at
        ),
        degrees (
          id,
          name,
          level,
          universities (
            name
          )
        )
      )
    `)
    .eq("username", username)
    .maybeSingle()
    .overrideTypes<DegreeReviewsQueryResult>();

  if (!user) return notFound();

  return (
    <DegreeReviewsClient
      isCurrentUser={isCurrentUser}
      user_degrees={user.user_degrees as unknown as DegreeReviewsQueryResult["user_degrees"]}
      username={username}
    />
  )
}
export default DegreeReviews