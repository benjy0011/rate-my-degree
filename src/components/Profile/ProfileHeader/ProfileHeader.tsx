import { createClient } from "@/lib/supabase/server"
import ServerShadowWrapper from "../ServerShadowWrapper";
import Image from "next/image";
import EditProfileButton from "./EditProfileButton";
import { cn, dateFormat } from "@/lib/utils";
import EducationDiv from "./EducationDiv";
import { CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";

const ProfileHeader = async ({
  username,
  isCurrentUser,
} : { username: string, isCurrentUser: boolean }) => {
  const supabase = createClient();

  const { data: userData, error } = await (await supabase)
    .from("profiles")
    .select(`
      id,
      full_name,
      username,
      avatar_url,
      created_at,
      user_degrees(
        graduation_year,
        graduation_month,
        degrees(
          name,
          level,
          universities(
            name
          )
        )
      )
    `)
    .eq("username", username)
    .order("created_at", {
      referencedTable: "user_degrees",
      ascending: false,
    })
    .single();

  // TODO: Handle empty data
  if (!userData) return notFound();

  const fullName = userData.full_name;
  const userName = userData.username;
  const userDegrees = userData.user_degrees;
  const profilePicUrl = userData.avatar_url;
  const joinedDate = dateFormat(userData.created_at);

  return (
    <ServerShadowWrapper
      className="profile-header"
    >
      {/* Image */}
      <ServerShadowWrapper
        className="w-fit h-fit"
        shadowSize="small"
      >
        <Image
          src={profilePicUrl}
          alt={`${fullName}'s Profile Picture`}
          width={100}
          height={100}
          loading="lazy"
          className="rounded-md"
        />
      </ServerShadowWrapper>

      {/* User Info */}
      <div
        className="flex-1 w-full flex flex-col gap-4"
      >
        {/* Upper Section */}
        <div className="profile-header-upper">
          {/* Name */}
          <div className="inline-flex gap-4 items-center">
            <h3 className="text-3xl font-bold">
              {fullName}
            </h3>

            <span className="text-md text-gray-500">@{userName}</span>
          </div>
          
          {/* Degrees */}
          <div className="flex gap-2">
            {userDegrees.map(( { degrees, graduation_year }, index) => (
              <EducationDiv
                key={index}
                //@ts-expect-error shape different
                degreeName={degrees.name}
                //@ts-expect-error shape different
                university={degrees.universities.name}
                graduationYear={graduation_year}
              />
            ))}
          </div> 
        </div>
        
        {/* Lower Section */}
        <div className="profile-header-lower">

          {/* Joined Date */}
          <div className="inline-flex gap-2">
            <CalendarDays className="text-gray-500 size-5" />
            <p className="text-sm text-gray-500 font-medium">Joined {joinedDate}</p>
          </div>

        </div>
      </div>

      <div
        className={cn(!isCurrentUser && "invisible")}
      >
        <EditProfileButton />
      </div>
    </ServerShadowWrapper>
  )
}
export default ProfileHeader