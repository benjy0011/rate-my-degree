'use client'

import AddReviewDialog from "@/components/Profile/AddReviewDialog"
import ShadowWrapper from "@/components/ShadowWrapper"

const WriteReviewButton = ({
  userId
} : { userId: string }) => {
  return(
    <AddReviewDialog
      userId={userId}
    >
      <ShadowWrapper
        className="bg-yellow-300 h-full px-6 py-3 text-black"
      >
        Write a Review
      </ShadowWrapper>
    </AddReviewDialog>
  )
}
export default WriteReviewButton