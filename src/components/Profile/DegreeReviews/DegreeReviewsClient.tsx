import { DegreeReviewsQueryResult } from "./DegreeReviews"
import DegreeReviewsCard from "./DegreeReviewsCard"

interface DegreeReviewsClientProps {
  user_degrees: DegreeReviewsQueryResult["user_degrees"];
  isCurrentUser: boolean;
  username: string;
}

const DegreeReviewsClient = ({
  isCurrentUser,
  user_degrees,
  username,
} : DegreeReviewsClientProps ) => {
  return (
    <div className="flex flex-col gap-6 bg-white">
      {user_degrees.map((user_degree) => (
        <DegreeReviewsCard
          key={user_degree.id}
          user_degree={user_degree}
          isCurrentUser={isCurrentUser}
          username={username}
        />
      ))}
    </div>
  )
}
export default DegreeReviewsClient