'use client'

import { useRouter } from "next/navigation"
import ShadowWrapper from "./ShadowWrapper"

const RedirectButton = ({
  path,
  text,
} : { path: string, text: string }) => {
  const route = useRouter();

  return (
    <ShadowWrapper
      onClick={() => { route.push(path) }}
      className="py-2 px-4"
    >
      {text}
    </ShadowWrapper>
  )
}
export default RedirectButton