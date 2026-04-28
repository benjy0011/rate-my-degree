import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ReactElement } from "react"

const FormSectionWrapper = ({
  title,
  children,
  className = "",
  titleClassName = "",
  loading = false,
} : {
  title?: string
  children: ReactElement
  className?: string
  titleClassName?: string
  loading?: boolean
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    { title &&
      <p className={cn("text-[12px] font-medium text-gray-900 tracking-wide", titleClassName)}>{title}</p>
    }
    {loading ?
      <Skeleton className="h-5 w-full bg-gray-300" />
      : children
    }
  </div>
)

export default FormSectionWrapper