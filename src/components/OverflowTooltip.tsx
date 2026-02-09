'use client'

import { cn } from "@/lib/utils"
import { useLayoutEffect, useRef, useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

const OverflowTooltip = ({
  className,
  children,
} : { className: string, children: string }) => {
  const ref = useRef<null | HTMLButtonElement>(null);
  const [showTooltip, setShowTooltip] = useState(false)

  useLayoutEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const observer = new ResizeObserver(() => {
      setShowTooltip(el.clientHeight < el.scrollHeight);
    })

    observer.observe(el);

    return (() => observer.disconnect())
  }, [children])

  return (
    <Tooltip>
      <TooltipTrigger
        ref={ref}
        className={cn("line-clamp-1 text-left", className)}
      >
        {children}
      </TooltipTrigger>

      {showTooltip && (
        <TooltipContent className="">
          {children}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
export default OverflowTooltip