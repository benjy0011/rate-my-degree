import { createClient } from "@/lib/supabase/server"
import ServerShadowWrapper from "../ServerShadowWrapper"
import { notFound } from "next/navigation";

const About = async ({
  username
} : { username: string }) => {
  const supabase = createClient();

  const { data: userData } = await (await supabase)
    .from("profiles")
    .select(`
      bio
    `)
    .eq("username", username)
    .maybeSingle();
  
  if(!userData) return notFound();

  const renderUserBio = () => {
    if (!userData.bio) {
      return (
        <p className="text-sm text-gray-500">
          {"This user hasn't writtern anything."}
        </p>
      )
    }

    return (
      <p className="text-sm text-gray-800 leading-loose">
        {userData.bio}
      </p>
    )
  }

  return (
    <ServerShadowWrapper
      className="p-6"
    >
      <h6 className="font-bold mb-3">About</h6>

      {renderUserBio()}

    </ServerShadowWrapper>
  )
}
export default About