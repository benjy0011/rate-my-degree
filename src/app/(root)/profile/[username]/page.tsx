
import About from "@/components/Profile/About/About";
import AddReviewDialog from "@/components/Profile/AddReviewDialog";
import DegreeReviews from "@/components/Profile/DegreeReviews/DegreeReviews";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import ServerShadowWrapper from "@/components/Profile/ServerShadowWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { memo, Suspense } from "react"

interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const supabase = createClient();
  
  // Get the profile by username
  const { data: profile } = await (await supabase)
    .from("profiles")
    .select(`id, full_name, username`)
    .eq("username", username)
    .single();
  
  if (!profile) {
    return { title: "Profile Not Found | Rate My Degree" };
  }

  // Get the current logged-in user
  const { data: { user } } = await (await supabase).auth.getUser();

  // Check if this is "my profile"
  const isMyProfile = user?.id === profile.id;

  // Return dynamic title
  return {
    title: isMyProfile
      ? "My Profile | Rate My Degree"
      : `${profile.full_name} | Rate My Degree`,
  };
}

const Page = async ({
  params
}: Props) => {
  const { username } = await params;

  const supabase = createClient();

  const { data: profile } = await (await supabase)
    .from("profiles")
    .select(`id, full_name, username`)
    .eq("username", username)
    .single();

  // Get the current logged-in user
  const { data: { user } } = await (await supabase).auth.getUser();


  // TODO: Handle no profile case
  if (!profile) {
    notFound();
  }

  // Check if this is "my profile"
  const isMyProfile = user?.id === profile.id;

  
  return (
    <div className="container profile-page">

      {/* Top Section */}
      <Suspense
        fallback={(
          <Skeleton className="bg-gray-200 w-full h-50" />
        )}
      >
        <ProfileHeader username={username} isCurrentUser={isMyProfile} />
      </Suspense>

      <Suspense
        fallback={(
          <Skeleton className="bg-gray-200 w-full h-40" />
        )}
      >
        <About username={username} />
      </Suspense>



      {/* Main Section */}
      <div className="flex gap-8">
        {/* Left */}
        <div className="flex-2 flex flex-col gap-6">

          {/* Title */}
          <div className="flex justify-between">
            <h5 className="profile-degree-review-header">
              {isMyProfile ? "My" : profile.full_name} Degree Review
            </h5>

            <AddReviewDialog
              userId={profile.id}
            >
              <p 
                className="text-primary font-ubuntu px-2 font-medium hover:cursor-pointer hover:underline"
              >
                Add Review
              </p>
            </AddReviewDialog>
          </div>
          

          <Suspense>
            <DegreeReviews username={username} isCurrentUser={isMyProfile} />
          </Suspense>
        </div>

        <div className="flex-1">
          <ServerShadowWrapper>
            Right
          </ServerShadowWrapper>
        </div>
      </div>


    </div>
  )
}
export default memo( Page )