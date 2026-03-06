import { DegreeReviewsQueryResult } from "./DegreeReviews"
import DegreeReviewsCard from "./DegreeReviewsCard"

interface DegreeReviewsClientProps {
  user_degrees: DegreeReviewsQueryResult["user_degrees"];
  isCurrentUser: boolean;
}

const DegreeReviewsClient = ({
  isCurrentUser,
  user_degrees
} : DegreeReviewsClientProps ) => {
  return (
    <div className="flex flex-col gap-6 bg-white">
      {user_degrees.map((user_degree) => (
        <DegreeReviewsCard
          key={user_degree.id}
          user_degree={user_degree}
          isCurrentUser={isCurrentUser}
        />
      ))}
    </div>
  )
}
export default DegreeReviewsClient