import { createClient } from "@/lib/supabase/server"
import DegreesClient, { PAGE_SIZE } from "@/components/Degrees/DegreesClient"

const Page = async () => {
  const supabase = await createClient()

  const { data: initialDegrees } = await supabase
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

  const { data: universities } = await supabase
    .from("universities")
    .select("id, name")
    .order("name")

  return (
    <DegreesClient
      initialDegrees={initialDegrees ?? []}
      universities={universities ?? []}
    />
  )
}

export default Page;