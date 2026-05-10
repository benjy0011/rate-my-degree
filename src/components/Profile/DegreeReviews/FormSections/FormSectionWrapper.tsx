import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ReactElement } from "react"

const FormSectionWrapper = ({
  title,
  children,
  className = "",
  titleClassName = "",
  loading = false,
  contactUs = false,
} : {
  title?: string
  children: ReactElement
  className?: string
  titleClassName?: string
  loading?: boolean
  contactUs?: boolean
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    { title &&
      <div className="flex items-center justify-between">
        <p className={cn("text-[12px] font-medium text-gray-900 tracking-wide", titleClassName)}>{title}</p>
        {contactUs &&
          <a
            className="text-xs text-primary hover:cursor-pointer hover:underline"
            href="mailto:benjy0011@gmail.com?subject=Request%20For%20Adding%20A%20Degree&body=Hi,"
          >
            {"Couldn't find your degree?"}
          </a>
        }
      </div>
    }
    {loading ?
      <Skeleton className="h-5 w-full bg-gray-300" />
      : children
    }
  </div>
)

export default FormSectionWrapper