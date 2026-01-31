import { createClient } from "@/lib/supabase/client"
import TopRatedDegreeCard from "./TopRatedDegreeCard";

export const TOP_RATED_DEGREE_COUNT = 2;

const TopRatedDegreeCards = async () => {
  const supabase = createClient();

  const degrees = await supabase
    .from("degrees")
    .select(`
      id,
      name,
      level,
      duration_years,
      description,
      avg_overall_rating,
      avg_curriculum_rating,
      avg_career_rating,
      avg_lecturer_rating,
      avg_facilities_rating,
      avg_value_rating,
      review_count,
      view_count,
      universities (
        name
      )
    `)
    .order("review_count", { ascending: false })
    .order("view_count", { ascending: false })
    .limit(TOP_RATED_DEGREE_COUNT);
  
  return (
    <div className="top-rated-degree-cards-wrapper">
      {degrees.data?.map((degree) => (
        <TopRatedDegreeCard
          key={degree.id}
          overall_rating={degree.avg_overall_rating}
          career_rating={degree.avg_career_rating}
          curriculum_rating={degree.avg_curriculum_rating}
          facilities_rating={degree.avg_facilities_rating}
          lecturer_rating={degree.avg_lecturer_rating}
          value_rating={degree.avg_value_rating}
          degree_level={degree.level}
          description={degree.description}
          duration={degree.duration_years}
          name={degree.name}
          review_count={degree.review_count}
          view_count={degree.view_count}
          //@ts-expect-error shape different
          university={degree.universities.name}
        />
      ))}
    </div>
  )
}
export default TopRatedDegreeCards