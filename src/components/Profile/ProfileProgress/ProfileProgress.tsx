import { fetchCurrentUserProfileProgress } from "@/app/actions/userProfile"
import ServerShadowWrapper from "../ServerShadowWrapper"
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import AddReviewDialog from "../AddReviewDialog";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";

interface ProfileProgressProps {
  userId: string;
}


const ProfileProgress = async ({
  userId
} : ProfileProgressProps ) => {
  const data = await fetchCurrentUserProfileProgress();

  const progress = (data?.progress ?? 0) * 100;
  const progressPercentage = `${Math.round(progress)}%`;

  const progressTexts = [
    {
      id: "review",
      text: "Add a degree review",
      done: data?.degree_review_done ?? false,
      btnText: "Add Review",
    },
    {
      id: "bio",
      text: "Update your bio",
      done: data?.bio_done ?? false,
      btnText: "Update Bio",
    },
    {
      id: "gender",
      text: "Update your gender",
      done: data?.gender_done ?? false,
      btnText: "Update Gender",
    },
  ];

  const undoneProgress = progressTexts.filter(prog => !prog.done);
  const allDone = undoneProgress.length <= 0;

  const actionButton = allDone ? null : undoneProgress[0];
  
  return (
    <ServerShadowWrapper
      className="bg-yellow-300 p-4 font-ubuntu gap-4 flex flex-col"
      shadowSize="small"
    >
      <h4 className="h6">Complete Your Profile</h4>

      <div className="flex flex-col gap-1">
        <Progress value={ progress } className="h-3.5 border-2 border-black bg-yellow-100" />
        <p className="font-semibold">{progressPercentage} Completed</p>
      </div>

      {allDone && <p className="font-medium text-sm">Your profile is completed!</p>}

      {!allDone &&
        <ul className="list-disc font-medium text-sm">
          {undoneProgress.map((prog, index) => (
            <li key={index} className="ml-4">
              {prog.text}
            </li>
          ))}
        </ul>
      }

      {actionButton && (
        <>
          {actionButton.id === "review" && (
            <AddReviewDialog userId={userId}>
              <Button variant="default" className="bg-black hover:bg-gray-800">
                {actionButton.btnText}
              </Button>
            </AddReviewDialog>
          )}
          {(actionButton.id === "bio" || actionButton.id === "gender") && (
            <EditProfileDialog>
              <Button variant="default" className="bg-black hover:bg-gray-800">
                {actionButton.btnText}
              </Button>
            </EditProfileDialog>
          )}
        </>
      )}
    </ServerShadowWrapper>
  )
}
export default ProfileProgress