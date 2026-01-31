import { createClient } from "@/lib/supabase/client"
import ReviewCard from "./ReviewCard";

export const REVIEWS_COUNT = 2;

const ReviewCards = async () => {
  const supabase = createClient();

  const reviews = await supabase
    .from("reviews")
    .select(`
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
      created_at,
      user_degrees(
        profiles(
          full_name,
          username,
          email
        )
      )
    `)
    .order("helpful_count", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(REVIEWS_COUNT);

  return (
    <div className="home-cards-wrapper">
      {reviews.data?.map(( review ) => (
        <ReviewCard
          key={review.id}
          //@ts-expect-error shape different
          name={review?.user_degrees?.profiles?.full_name ?? ""}
          //@ts-expect-error shape different
          username={review?.user_degrees?.profiles?.username ?? ""}
          //@ts-expect-error shape different
          email={review?.user_degrees?.profiles?.email ?? ""}
          overall_rating={review.overall_rating}
          curriculum_rating={review.curriculum_rating}
          career_rating={review.career_rating}
          lecturer_rating={review.lecturer_rating}
          facilities_rating={review.facilities_rating}
          value_rating={review.value_rating}
          recommend={review?.would_recommend ?? null}
          comment={review.comment}
          like_count={review.helpful_count}
          status={review.employment_status}
        />
      ))}
    </div>
  )
}
export default ReviewCards