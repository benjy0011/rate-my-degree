'use client'

import { useEffect, useRef } from "react"

const BounceWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Physics state
  const position = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  // Configuration
  const BOUNCE_DAMPING = 0.6; // How much energy is lost per bounce (0 to 1)
  const GRAVITY = 0.8;        // Downward force
  const JUMP_FORCE = -10;     // Initial upward velocity (negative is up)
  const MAX_HEIGHT = -70;

  const animate = () => {
    // 1. Apply Gravity to Velocity
    velocity.current += GRAVITY;

    // 2. Apply Velocity to Position
    position.current += velocity.current;

    if (position.current < MAX_HEIGHT) {
      position.current = MAX_HEIGHT;
    }

    // 3. Floor Collision Detection (Assuming 0 is the starting position)
    // If we go below 0 (the floor), we snap to 0 and reverse velocity
    if (position.current > 0) {
      position.current = 0;
      
      // Reverse velocity (bounce) and apply damping
      velocity.current *= -BOUNCE_DAMPING;

      // Stop condition: If velocity is very low, stop the loop to save CPU
      if (Math.abs(velocity.current) < GRAVITY) {
        velocity.current = 0;
        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = null;
        return; // Exit loop
      }
    }

    // 4. Apply the transform
    if (ref.current) {
      ref.current.style.transform = `translateY(${position.current}px)`;
    }

    // 5. Continue loop
    rafId.current = requestAnimationFrame(animate);
  }

  const startBounce = () => {
    // Only jump if we aren't already jumping (optional, depends on preference)
    // Or simply reset velocity to jump again mid-air:
    velocity.current = JUMP_FORCE;
    
    // If loop isn't running, start it
    if (!rafId.current) {
      animate();
    }
  }

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])
  
  return (
    <div
      ref={ref}
      onMouseEnter={startBounce}
      style={{
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

export default BounceWrapper