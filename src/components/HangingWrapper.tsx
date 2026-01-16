'use client'

import { CSSProperties, useEffect, useRef } from "react"

const HangingWrapper = ({ children, style = {} }: { children: React.ReactNode, style?: CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null)

  const angle = useRef(0)
  const velocity = useRef(0)
  const rafId = useRef<number | null>(null)

  const DAMPING = 0.96      // friction (lower = faster stop)
  const RETURN_FORCE = 0.04 // pull back to center

  const animate = () => {
    // spring force back to 0
    const force = -angle.current * RETURN_FORCE
    velocity.current += force
    velocity.current *= DAMPING
    angle.current += velocity.current

    if (ref.current) {
      ref.current.style.transform = `rotate(${angle.current}deg)`
    }

    if (angle.current === 0) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      return;
    } else {
      rafId.current = requestAnimationFrame(animate)
    }
  }

  const startSwing = () => {
    velocity.current += 1.2
    if (!rafId.current) animate()
  }

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={startSwing}
      style={{
        transformOrigin: "top center",
        willChange: "transform",
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default HangingWrapper
