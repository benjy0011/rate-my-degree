'use client'

import { HTMLAttributes, ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

const calculatePx = (num: number): string => `${num * 4}px`;

interface ShadowWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  wrapperClassName?: string
  shadowDepth?: number
}

const ShadowWrapper = ({
  children,
  className,
  wrapperClassName,
  onClick,
  shadowDepth = 1,
  ...rest
}: ShadowWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleSetActive = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsActive(true)
  };

  const handleSetInactive = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsActive(false)
  };

  return (
    <div
      {...rest}
      onClick={onClick}
      onMouseDown={handleSetActive}
      onMouseUp={handleSetInactive}
      onMouseLeave={handleSetInactive}
      className={cn(
        "w-fit h-fit bg-black",
        wrapperClassName
      )}
      style={{
        transform: `translate(${calculatePx(shadowDepth)}, ${calculatePx(shadowDepth)} )`
      }}
    >
      <div
        className={
          cn(
            "px-3 py-1 border-3 border-black font-fredoka font-semibold bg-primary text-white transition-transform duration-200",
            className
          )
        }
        style={{
          cursor: onClick ? "pointer" : "default",
          transform: isActive
            ? "translate(0, 0)"
            : `translate(-${calculatePx(shadowDepth)}, -${calculatePx(shadowDepth)} )`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ShadowWrapper
