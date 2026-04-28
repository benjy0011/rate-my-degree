import { cn } from "@/lib/utils";
import Link from "next/link";

export interface HeaderLinkTextProps {
  text: string,
  href?: string,
  classname?: string,
}

const HeaderLinkText = (props : HeaderLinkTextProps) => {
  const {
    text,
    href,
    classname = "",
  } = props;

  const Component = href ? Link : "div";

  return (
    <Component
      href={`/${href}`}
      className={cn(href && "header-link-text", classname)}
    >
      {text}
    </Component>
  )
}
export default HeaderLinkText