
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { memo } from "react"

interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const supabase = createClient();
  
  // 1️⃣ Get the profile by username
  const { data: profile } = await (await supabase)
    .from("profiles")
    .select(`id, full_name, username`)
    .eq("username", username)
    .single();
  
  if (!profile) {
    return { title: "Profile Not Found | Rate My Degree" };
  }

  // 2️⃣ Get the current logged-in user
  const { data: { user } } = await (await supabase).auth.getUser();

  // 3️⃣ Check if this is "my profile"
  const isMyProfile = user?.id === profile.id;

  // 4️⃣ Return dynamic title
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
  
  return (
    <div className="container">
      <ProfileHeader username={username} />
    </div>
  )
}
export default memo( Page )