import { cn } from "@/lib/utils"
import { memo, ReactNode } from "react"

const ServerShadowWrapper = ({
  children,
  className = "",
  shadowSize = "medium",
} : {
  children: ReactNode,
  className?: string,
  shadowSize?: "small" | "medium"
}) => {
  const shadowStyle = shadowSize === "small"
    ? "shadow-[2px_2px_0_0_black]"
    : "shadow-[4px_4px_0_0_black]"


  return (
    <div
      className={cn(
        "border-2 border-black rounded-md",
        shadowStyle,
        className
      )}
    >
      {children}
    </div>
  )
}
export default memo( ServerShadowWrapper )