'use client'

import ShadowWrapper from "@/components/ShadowWrapper"
import { useRouter } from "next/navigation"

const EditProfileButton = () => {
  const router = useRouter();

  return (
    <ShadowWrapper
      className="font-ubuntu rounded-md bg-white text-black py-1.5 px-5"
      wrapperClassName="rounded-md"
      shadowDepth={0.5}
      onClick={() => router.push("/settings/profile")}
    >
      Edit Profile
    </ShadowWrapper>
  )
}
export default EditProfileButton