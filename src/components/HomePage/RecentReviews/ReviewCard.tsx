import { cn } from "@/lib/utils";
import Rating from "../../Rating";
import ShadowWrapper from "../../ShadowWrapper"
import { ThumbsUp } from "lucide-react";

interface ReviewCardProps {
  name: string;
  username: string;
  email: string;
  status: 'Employed' | 'Unemployed' | 'Further Study' | 'Self-Employed' | 'Student' | string;
  overall_rating: number;
  curriculum_rating: number;
  career_rating: number;
  lecturer_rating: number;
  facilities_rating: number;
  value_rating: number;
  comment: string;
  recommend: boolean;
  like_count: number;
}

const parseStatusToClassName = (status: string) => {
  switch (status.toLowerCase().trim()) {
    case "employed":
      return "bg-custom-mint-green text-custom-dark-green";
    case "unemployed":
      return "bg-gray-200 text-gray-700";
    case "further study":
      return "bg-yellow-100 text-yellow-700";
    case "self-employed":
      return "bg-blue-100 text-blue-700";
    case "student":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-teal-100 text-teal-700";
  }
};

const parseRecommendToClassName = (recommend?: boolean | undefined | null) => {
  return recommend === undefined || recommend === null
    ? "text-gray-500"
    : recommend === true
    ? "text-green-600"
    : "text-red-600";
}

const parseRecommendToDescription = (recommend?: boolean | undefined | null) => {
  return recommend === undefined || recommend === null
    ? "Neutral"
    : recommend === true
    ? "Would Recommend"
    : "Not Recommend";
}

const parseRecommendToEmoji = (recommend?: boolean | undefined | null) => {
  return recommend === undefined || recommend === null 
    ? "─" 
    : recommend === true 
    ? "✔" 
    : "✗";
}

const getUserNameFromEmail = (email: string) => {
  return '@' + (email.split("@")[0] ?? email);
}

const ReviewCard = ({
  name,
  username,
  email,
  status,
  overall_rating,
  curriculum_rating,
  career_rating,
  lecturer_rating,
  facilities_rating,
  value_rating,
  comment,
  recommend,
  like_count,
} : ReviewCardProps ) => {

  const reviewsMapping = [
    { name: "Curriculum", rating: curriculum_rating },
    { name: "Career", rating: career_rating },
    { name: "Lecturers", rating: lecturer_rating },
    { name: "Facilities", rating: facilities_rating },
    { name: "Value", rating: value_rating },
  ]

  return (
    <ShadowWrapper
      className="homepage-card p-6"
    >
      {/* Top */}
      <div className="flex justify-between w-full">

        {/* Name and username */}
        <div className="flex flex-col flex-3">
          <h6 className="text-lg text-black font-semibold line-clamp-1">{name}</h6>
          <p className="text-sm line-clamp-1 w-[50%]">{username || getUserNameFromEmail(email)}</p>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-end justify-start flex-1">
          <div className="font-semibold text-black text-xl ">
            {overall_rating.toFixed(1)}/5
          </div>
          <Rating value={overall_rating} precision={0.1} readOnly size={12} />
        </div>
      </div>

      {/* Employment Status */}
      <div className="flex justify-start w-full">
        <div className={cn("text-xs font-semibold rounded-sm px-2 py-1", parseStatusToClassName(status))}>
          {status}
        </div>
      </div>

      {/* Stars */}
      <div className="grid grid-cols-2 place-items-start w-full">
        {reviewsMapping.map(( { name, rating }, index) => (
          <div key={`${name}-${index}`} className="flex flex-col items-start">
            <p className="">{name}</p>
            <Rating value={rating} precision={0.1} readOnly size={16} />
          </div>
        ))}
      </div>
      
      {/* Comment */}
      <div className="py-4 border-t-2 border-black line-clamp-2">
        {comment}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between w-full items-center">

        {/* Recommend Tag */}
        <div className={cn("inline-flex gap-1.5 text-sm font-semibold", parseRecommendToClassName(recommend))}>
          <p>{parseRecommendToEmoji(recommend)}</p>
          <p>{parseRecommendToDescription(recommend)}</p>
        </div>

        {/* Likes count */}
        <div className="flex items-center gap-1">
          <ThumbsUp className="size-4" />
          <span>{like_count}</span>
        </div>
      </div>
    </ShadowWrapper>
  )
}
export default ReviewCard