'use client'

import { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ShadowWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  wrapperClassName?: string
}

const ShadowWrapper = ({
  children,
  className,
  wrapperClassName,
  onClick,
  ...rest
}: ShadowWrapperProps) => {
  return (
    <div {...rest} onClick={onClick} className={cn("w-fit h-fit bg-black translate-y-1 translate-x-1", wrapperClassName)}>
      <div
        className={
          cn(
            "-translate-y-1 -translate-x-1 px-3 py-1 border-3 border-black font-fredoka font-semibold bg-primary text-white",
            onClick && "cursor-pointer active:translate-0 transition-transform duration-200",
            className
          )
        }
      >
        {children}
      </div>
    </div>
  )
}

export default ShadowWrapper
