import { cn } from "@/lib/utils"
import { ReactElement } from "react"

const FormSectionWrapper = ({
  title,
  children,
  className = "",
  titleClassName = "",
} : {
  title?: string
  children: ReactElement
  className?: string
  titleClassName?: string
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    { title &&
      <p className={cn("text-[12px] font-medium text-gray-900 tracking-wide", titleClassName)}>{title}</p>
    }
    {children}
  </div>
)

export default FormSectionWrapper