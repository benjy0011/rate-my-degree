'use client'

import { Textarea } from "@/components/ui/textarea"
import { UserDegree } from "../DegreeReviews"
import { cn } from "@/lib/utils";

const MAX_COMMENT_LENGTH = 400;

interface DegreeComment {
  comment?: UserDegree["reviews"]["comment"]
  onChange?: (val: string) => void
  error?: boolean
}

const DegreeComment = ({
  comment = "",
  onChange,
  error,
} : DegreeComment ) => {
  const charLength = MAX_COMMENT_LENGTH - comment.length;

  return (
    <div>
      <Textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => onChange?.(e.target.value)}
        maxLength={MAX_COMMENT_LENGTH}
        minLength={1}
        className={cn("shadow-div-effect-sm", error && "shadow-div-effect-sm-error")}
      />
      <div className="text-xs mt-1 mr-1 flex justify-between">
        <p className={cn( "text-red-500 text-left transition-opacity" , error ? "opacity-100" : "opacity-0")}>At least 10 characters</p>
        <p className="text-gray-400 text-right">{charLength} characters left</p>
      </div>
    </div>
  )
}
export default DegreeComment