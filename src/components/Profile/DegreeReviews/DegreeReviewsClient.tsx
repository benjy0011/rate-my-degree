import ServerShadowWrapper from "../ServerShadowWrapper";
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
      {user_degrees.length > 0
        ? user_degrees.map((user_degree) => (
            <DegreeReviewsCard
              key={user_degree.id}
              user_degree={user_degree}
              isCurrentUser={isCurrentUser}
              username={username}
            />
          ))
        : <ServerShadowWrapper className="py-6 px-5 font-fredoka text-gray-500">
          This user has not review any degree yet.
        </ServerShadowWrapper>
      }
    </div>
  )
}
export default DegreeReviewsClient