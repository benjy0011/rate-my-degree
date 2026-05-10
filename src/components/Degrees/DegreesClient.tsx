"use client"

import { useRef } from "react"
import { useQueryStates, parseAsString, parseAsJson } from "nuqs"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import TopRatedDegreeCard from "../HomePage/TopRatedDegree/TopRatedDegreeCard"
import DynamicInput from "../DynamicFormSectionInput/DynamicInput"
import ShadowWrapper from "../ShadowWrapper"
import DynamicSelect from "../DynamicFormSectionInput/DynamicSelect"
import { Search } from "lucide-react"

export const PAGE_SIZE = 20

type Degree = {
  id: string
  name: string
  level: string
  duration_years: number
  description: string
  avg_overall_rating: number
  avg_curriculum_rating: number
  avg_career_rating: number
  avg_lecturer_rating: number
  avg_facilities_rating: number
  avg_value_rating: number
  review_count: number
  view_count: number
  universities: { name: string } | { name: string }[]
}

type University = {
  id: string
  name: string
}

type Levels = {
  display: string
  value: string
}

type Duration = {
  display: string
  value: string
}

type SortOption = {
  label: string
  value: string
}

const LEVELS: Levels[] = [
  { display: "All Levels", value: "" },
  { display: "Bachelor", value: "Bachelor" },
  { display: "Master", value: "Master" },
]

const DURATIONS: Duration[] = [
  { display: "All Durations", value: "" },
  ...["1", "2", "3", "4", "5", "6"].map((d) => ({ display: `${d} years`, value: d })),
]

const SORT_OPTIONS: SortOption[] = [
  { label: "Most Reviewed", value: "review_count" },
  { label: "Most Viewed", value: "view_count" },
  { label: "Highest Rated", value: "avg_overall_rating" },
]

// parsers for each filter — nuqs needs to know how to serialize/deserialize
const filterParsers = {
  search: parseAsString.withDefault(""),

  level: parseAsJson<Levels>((v) => v as Levels)
    .withDefault(LEVELS[0]),

  duration: parseAsJson<Duration>((v) => v as Duration)
    .withDefault(DURATIONS[0]),

  universityId: parseAsJson<University>((v) => v as University)
    .withDefault({ id: "", name: "All Universities" }),

  sort: parseAsJson<SortOption>((v) => v as SortOption)
    .withDefault(SORT_OPTIONS[0]),
}

const DegreesClient = ({
  initialDegrees,
  universities,
}: {
  initialDegrees: Degree[]
  universities: University[]
}) => {
  const ALL_UNIVERSITIES: University[] = [{ id: "", name: "All Universities" }, ...universities]

  const [degrees, setDegrees] = useState<Degree[]>(initialDegrees)
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: false, // triggers server re-render if you ever need it
  })

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchDegrees = async (newFilters: typeof filters) => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase.from("degrees").select(`
      id, name, level, duration_years, description,
      avg_overall_rating, avg_curriculum_rating, avg_career_rating,
      avg_lecturer_rating, avg_facilities_rating, avg_value_rating,
      review_count, view_count,
      universities ( name )
    `)

    if (newFilters.search)
      query = query.ilike("name", `%${newFilters.search}%`)
    if (newFilters.level.value)
      query = query.eq("level", newFilters.level.value)
    if (newFilters.duration.value)
      query = query.eq("duration_years", Number(newFilters.duration.value))
    if (newFilters.universityId.id)
      query = query.eq("university_id", newFilters.universityId.id)

    query = query.order(newFilters.sort.value, { ascending: false })

    const { data } = await query
    setDegrees((data as Degree[]) ?? [])
    setLoading(false)
  }

  // re-fetch whenever URL params change (back/forward nav, direct URL visit)
  useEffect(() => {
    fetchDegrees(filters)
  }, [filters])

  const handleSearchChange = (value: string) => {
    setFilters({ search: value })
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => {
      fetchDegrees({ ...filters, search: value })
    }, 400)
  }

  const getUniversityName = (universities: Degree["universities"]) => {
    if (Array.isArray(universities)) return universities[0]?.name
    return universities?.name
  }

  return (
    <div className="flex flex-col items-center w-7xl py-8 px-2 gap-10">
      <ShadowWrapper className="bg-secondary text-black w-full flex flex-col p-4 gap-8" wrapperClassName="w-full">
        <div className="flex w-full gap-2 items-center">
          <Search />
          <DynamicInput
            type="text"
            placeholder="Search degrees..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-4">
          <DynamicSelect
            selections={LEVELS}
            value={filters.level}
            onChange={(val) => setFilters({ level: val })}
            selectionRenderer={(l) => <p>{l.display}</p>}
          />

          <DynamicSelect
            selections={DURATIONS}
            value={filters.duration}
            onChange={(val) => setFilters({ duration: val })}
            selectionRenderer={(d) => <p>{d.display}</p>}
          />

          <DynamicSelect
            selections={ALL_UNIVERSITIES}
            value={filters.universityId}
            onChange={(val) => setFilters({ universityId: val })}
            selectionRenderer={(u) => <p>{u.name}</p>}
          />

          <DynamicSelect
            selections={SORT_OPTIONS}
            value={filters.sort}
            onChange={(val) => setFilters({ sort: val })}
            selectionRenderer={(s) => <p>{s.label}</p>}
          />
        </div>
      </ShadowWrapper>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full flex flex-wrap gap-15 justify-center p-5">
          {degrees.map((degree) => (
            <TopRatedDegreeCard
              key={degree.id}
              name={degree.name}
              university={getUniversityName(degree.universities) ?? ""}
              degree_level={degree.level}
              description={degree.description}
              overall_rating={degree.avg_overall_rating}
              curriculum_rating={degree.avg_curriculum_rating}
              career_rating={degree.avg_career_rating}
              lecturer_rating={degree.avg_lecturer_rating}
              facilities_rating={degree.avg_facilities_rating}
              value_rating={degree.avg_value_rating}
              review_count={degree.review_count}
              view_count={degree.view_count}
              duration={degree.duration_years}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DegreesClient