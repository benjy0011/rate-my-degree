
import About from "@/components/Profile/About/About";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
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
    </div>
  )
}
export default memo( Page )