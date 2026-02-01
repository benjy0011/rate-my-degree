'use client'

import { useRouter } from "next/navigation"
import ShadowWrapper from "./ShadowWrapper"
import { cn } from "@/lib/utils";

const RedirectButton = ({
  path,
  text,
  className = "",
} : { path: string, text: string, className?: string }) => {
  const route = useRouter();

  return (
    <ShadowWrapper
      onClick={() => { route.push(path) }}
      className={cn("py-2 px-4", className)}
    >
      {text}
    </ShadowWrapper>
  )
}
export default RedirectButton