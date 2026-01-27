import Rating from "./Rating"
import ShadowWrapper from "./ShadowWrapper"

interface TopRatedDegreeCardProps {
  name: string
  university: string
  degree_level: 'Bachelor' | 'Master' | string
  description: string
  overall_rating: 0 | 1 | 2 | 3 | 4 | 5
  curriculum_rating: 0 | 1 | 2 | 3 | 4 | 5
  career_rating: 0 | 1 | 2 | 3 | 4 | 5
  lecturer_rating: 0 | 1 | 2 | 3 | 4 | 5
  facilities_rating: 0 | 1 | 2 | 3 | 4 | 5
  value_rating: 0 | 1 | 2 | 3 | 4 | 5
  review_count: number
  view_count: number
  duration: number
}

export const enum RatingType {
  OVERALL = "Overall",
  CURRICULUM = "Curriculum",
  CAREER = "Career",
  LECTURERS = "Lecturers",
  FACILITIES = "Facilities",
  VALUE = "Value",
}


const RatingStars = ({
  label,
  rating,
} : { label: string, rating: number } ) => (
  <div className="flex justify-between">
    <p>{label}</p>

    <Rating readOnly value={rating} precision={0.1} size={18} />
  </div>
)

const TopRatedDegreeCard = ({
  name,
  university,
  degree_level,
  description,
  overall_rating,
  curriculum_rating,
  career_rating,
  lecturer_rating,
  facilities_rating,
  value_rating,
  review_count,
  view_count,
  duration,
} : TopRatedDegreeCardProps) => {

  const ratings = [
    { name: "Overall", rating: overall_rating },
    { name: "Curriculum", rating: curriculum_rating },
    { name: "Career", rating: career_rating },
    { name: "Lecturers", rating: lecturer_rating },
    { name: "Facilities", rating: facilities_rating },
    { name: "Value", rating: value_rating },
  ]


  return (
    <ShadowWrapper
      className="top-rated-degree-card"
      wrapperClassName="top-rated-degree-card-wrapper"
    >
      <div className="top-rated-degree-card-content">

        <div className="top-rated-degree-card-header">
          <h6 className="font-bold text-lg text-black">{name}</h6>

          <p>{university} • {degree_level}</p>

          <p className="my-3 line-clamp-3">{description}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          {ratings.map(({ name, rating }, index) => (
            <RatingStars
              key={index}
              label={name}
              rating={rating}
            />
          ))}
        </div>
        
        <div className="top-rated-degree-card-footer">
          <p>{review_count} reviews</p>

          <p>{view_count} view</p>

          <p>{duration} years</p>
        </div>
      </div>

      <div>
      </div>
    </ShadowWrapper>
  )
}
export default TopRatedDegreeCard