'use client'

import { useRouter } from "next/navigation"
import ShadowWrapper from "./ShadowWrapper"

const ExploreAllDegreesButton = () => {
  const route = useRouter();

  return (
    <ShadowWrapper
      onClick={() => { route.push('/degrees') }}
      className="py-2 px-4"
    >
      Explore All Degrees
    </ShadowWrapper>
  )
}
export default ExploreAllDegreesButton