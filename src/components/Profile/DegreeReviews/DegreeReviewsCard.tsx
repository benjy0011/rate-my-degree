'use client'

import OverflowTooltip from "@/components/OverflowTooltip"
import ServerShadowWrapper from "../ServerShadowWrapper"
import { Button } from "@/components/ui/button"
import { Pencil, Star, ThumbsUp, Trash2 } from "lucide-react"
import { RecommendedTag } from "@/components/HomePage/RecentReviews/ReviewCard"
import { cn, dateFormatFull } from "@/lib/utils"
import Rating from "@/components/Rating"

import { DOT_SMALL_DIVIDER } from "@/constants"
import EditReviewsDialog from "./EditReviewsDialog"
import { UserDegree } from "./DegreeReviews"
import ConfirmationDialog from "@/components/ConfirmationDialog"
import { useState } from "react"
import { deleteReview } from "@/app/actions/review"
import { toast } from "sonner"
import ReviewLikeButton from "../../ReviewLikeButton/ReviewLikeButton"

const ReviewRating = ({
  name,
  rating
} : { name: string, rating: number }) => (
  <div className="inline-flex flex-col gap-1 flex-wrap">
    <p className="text-xs text-gray-500 font-medium">{name.toUpperCase()}</p>
    <Rating
      value={rating}
      size={12}
      emptyIcon={<Star stroke="#ddd" fill="#ddd" />} 
      icon={<Star stroke="#FFBF00" fill="#FFBF00" />}
      readOnly
    />
  </div>
)

function parseRatings (data: UserDegree["reviews"]) {
  return [
    { name: "CURRICULUM", rating: data.curriculum_rating },
    { name: "CAREER", rating: data.career_rating },
    { name: "FACILITIES", rating: data.facilities_rating },
    { name: "LECTURER", rating: data.lecturer_rating },
    { name: "VALUE", rating: data.value_rating },
  ]
}

const DegreeReviewsCard = ({
  user_degree: userDegree,
  isCurrentUser,
  username,
} : {
  user_degree: UserDegree,
  isCurrentUser: boolean,
  username: string,
}) => {
  const [ deleteDialogOpen, setDeleteDialogOpen ] = useState<boolean>(false);

  const deleteReviewAction = async () => {
    const { error } = await deleteReview(userDegree.id, username);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Successfully deleted review.");
    }
  }

  return (
    <ServerShadowWrapper className="py-6 px-5 font-fredoka">

      {/* Header */}
      <div className="flex justify-between gap-4">

        {/* Header Name + Rating */}
        <div className="flex gap-2 items-center">
          <OverflowTooltip className="font-medium text-2xl line-clamp-1">
            {userDegree.degrees.name}
          </OverflowTooltip>
          <span className="bg-yellow-300 px-2 border-2 border-black text-sm inline-flex items-center justify-center rounded-xs font-semibold h-6.5">
            {(userDegree.reviews.overall_rating as number).toFixed(1)}/5.0
          </span>
        </div>

        {/* Buttons */}
        <div className={cn("flex", !isCurrentUser && "invisible")}>
          <EditReviewsDialog
            userDegree={userDegree}
            username={username}
          >
            <Button className="hover:cursor-pointer hover:bg-gray-200 rounded-full" variant="ghost" size="icon-sm">
              <Pencil />
            </Button>
          </EditReviewsDialog>

          <Button className="hover:cursor-pointer hover:bg-gray-200 rounded-full" variant="ghost" size="icon-sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 stroke="red" />
          </Button>
        </div>
      </div>

      {/* Sub Header */}
      <div className="text-gray-600">
        {userDegree.degrees.universities.name} {DOT_SMALL_DIVIDER} Graduated in {userDegree.graduation_year}
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-x-12 gap-y-4 my-4">
        {parseRatings(userDegree.reviews).map(({ name, rating }, idx) => (
          <ReviewRating key={idx} name={name} rating={rating ?? 0} />
        ))}
      </div>
      
      {/* Recommend */}
      <div className="mt-2 inline-flex py-0.5 px-2">
        <RecommendedTag className="" recommend={userDegree.reviews?.would_recommend ?? null} />
      </div>
    
      {/* Commend */}
      <div className="mt-3 mb-8">
        {`"${userDegree.reviews.comment}"`}
      </div>

      {/* Bottom */}
      <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center text-gray-500">
        <div className="text-sm">
          Posted on {dateFormatFull(userDegree.reviews.created_at ?? "")}
        </div>

        {/* <div className="inline-flex gap-1 items-center text-sm">
          <ThumbsUp size={16} />
          <span>{userDegree.reviews.helpful_count}</span>
          <span>Helpful</span>
        </div> */}

        <ReviewLikeButton review_id={userDegree.reviews.id} />
      </div>
      

      <ConfirmationDialog
        open={deleteDialogOpen}
        type="DELETE"
        text="Are you sure to delete this review?"
        onClose={() => setDeleteDialogOpen(false)}
        onAction={async () => {
          await deleteReviewAction();
        }}
      />
    </ServerShadowWrapper>
  )
}
export default DegreeReviewsCard