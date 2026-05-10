'use client'

import { User } from "@supabase/supabase-js"
import AddReviewDialog from "./AddReviewDialog"
import { cn } from "@/lib/utils"

const AddReviewButton = ({
  userId,
  user,
} : { userId: string, user: User | null } ) => {
  return (
    <AddReviewDialog
      userId={userId}
    >
      <p 
        className={cn(
          "text-primary font-ubuntu px-2 font-medium hover:cursor-pointer hover:underline",
          user?.id !== userId && "hidden"
        )}
      >
        Add Review
      </p>
    </AddReviewDialog>
  )
}
export 
default AddReviewButton

