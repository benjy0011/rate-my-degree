import { ForwardRefExoticComponent, RefAttributes } from "react"
import ShadowWrapper from "./ShadowWrapper"
import { LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

export interface IntroCardProps {
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  iconClassName?: string,
  title: string,
  description: string,
  className?: string,
}

const IntroCard = ({
  Icon,
  iconClassName,
  className,
  title,
  description,
} : IntroCardProps) => {
  return (
    <ShadowWrapper 
      className={
        cn("flex flex-col gap-2 p-6 max-lg:w-80 w-100 bg-white font-fredoka hover:-translate-y-2", className)
      }
      wrapperClassName="transition-all hover:-translate-y-1 group"
    >
      <ShadowWrapper
        shadowDepth={0.5}
        className={
          cn("size-14 flex items-center justify-center group-hover:-translate-y-1 transition-all duration-500", iconClassName)
        }
        wrapperClassName="group-hover:-translate-y-1 transition-all duration-500"
      >
        <Icon />
      </ShadowWrapper>

      <h6 className="intro-card-title">
        {title}
      </h6>

      <p className="intro-card-description">
        {description}
      </p>
    </ShadowWrapper>
  )
}
export default IntroCard