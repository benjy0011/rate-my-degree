'use client'

import { HTMLAttributes, ReactNode } from "react"

interface ShadowWrapper extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode,  
}

const ShadowWrapper = (props : ShadowWrapper) => {
  const {
    children,
    className = "",
    ...rest
  } = props;
  
  return (
    <div {...rest} className={`shadow-wrapper `}>
      <div className={`shadow-wrapper-content ${rest?.onClick && "shadow-wrapper-func"} ${className}`}>
        {children}
      </div>
    </div>
  )
}
export default ShadowWrapper