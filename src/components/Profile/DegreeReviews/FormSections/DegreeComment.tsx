'use client'

import { Textarea } from "@/components/ui/textarea"
import { UserDegree } from "../DegreeReviews"

const MAX_COMMENT_LENGTH = 400;

interface DegreeComment {
  comment?: UserDegree["reviews"]["comment"]
  onChange?: (val: string) => void
}

const DegreeComment = ({
  comment = "",
  onChange,
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
        className="shadow-div-effect-sm"
      />
      <p className="text-gray-400 text-xs text-right mt-1 mr-1">{charLength} characters left</p>
    </div>
  )
}
export default DegreeComment