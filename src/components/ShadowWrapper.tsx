'use client'

import { HTMLAttributes, ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./ui/spinner";

const calculatePx = (num: number): string => `${num * 4}px`;

interface ShadowWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  wrapperClassName?: string
  shadowDepth?: number
  disabled?: boolean
  loading?: boolean
}

const ShadowWrapper = ({
  children,
  className,
  wrapperClassName,
  onClick,
  shadowDepth = 1,
  disabled=false,
  loading=false,
  ...rest
}: ShadowWrapperProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isLoadingOrDisabled = (loading || disabled);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 0);

      return () => clearTimeout(timer)
    }
  }, [loading]);

  const handleSetActive = (event: React.MouseEvent<HTMLDivElement>) => {
    if(!onClick) return;
    event.stopPropagation();
    setIsActive(true)
  };

  const handleSetInactive = (event: React.MouseEvent<HTMLDivElement>) => {
    if(!onClick) return;
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
        "w-fit bg-black",
        isLoadingOrDisabled && "bg-gray-500",
        wrapperClassName
      )}
      style={{
        transform: `translate(${calculatePx(shadowDepth)}, ${calculatePx(shadowDepth)} )`
      }}
    >
      <div
        className={
          cn(
            "px-3 py-1 border-3 border-black font-fredoka font-semibold bg-primary text-white transition-all duration-200 flex gap-2 items-center relative",
            isLoadingOrDisabled && "bg-gray-200 text-gray-400 border-gray-500",
            loading && "pl-7",
            className
          )
        }
        style={{
          cursor: onClick ? "pointer" : "default",
          pointerEvents: isLoadingOrDisabled ? "none" : "auto",
          transform: isActive
            ? "translate(0, 0)"
            : `translate(-${calculatePx(shadowDepth)}, -${calculatePx(shadowDepth)} )`
        }}
      >
        {children}

        <Spinner className={cn("absolute left-1.5 transition-all duration-300 opacity-0", showLoader && "opacity-100")} />

      </div>
    </div>
  )
}

export default ShadowWrapper
