'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserDegree } from "../DegreeReviews"
import { RecommendedTag } from "@/components/HomePage/RecentReviews/ReviewCard"

interface DegreeRecommendProps {
  recommend?: UserDegree["reviews"]["would_recommend"]
  onChange?: (val: UserDegree["reviews"]["would_recommend"]) => void
}

const DegreeRecommend = ({
  recommend,
  onChange,
} : DegreeRecommendProps) => {
  return (
    <Select value={recommend} onValueChange={(val: boolean | null) => onChange?.(val)}>
      <SelectTrigger className="w-full hover:cursor-pointer shadow-div-effect-sm">
        <SelectValue placeholder="Would You Recommend?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value={null}><RecommendedTag recommend={null} /></SelectItem>
          <SelectItem value={true}><RecommendedTag recommend={true} /></SelectItem>
          <SelectItem value={false}><RecommendedTag recommend={false} /></SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default DegreeRecommend