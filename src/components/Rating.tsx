'use client'

import { cn } from "@/lib/utils"
import { Star } from "lucide-react";
import { cloneElement, MouseEvent, ReactElement, SVGProps, useState } from "react"

interface RatingProps {
  readOnly?: boolean;
  className?: string;
  max?: number;
  value: number;
  precision?: number;
  size?: number;
  emptyIcon?: ReactElement;
  icon?: ReactElement;
  onChange?: (value: number) => void;
}

const Rating = ({
  readOnly = false,
  className = "",
  max = 5,
  value,
  precision = 1,
  size = 24,
  emptyIcon = <Star stroke="#bbb" />,
  icon = <Star stroke="#ffde00" fill="#ffde00" />,
  onChange,
} : RatingProps ) => {
  const [ hoverValue, setHoverValue ] = useState<number | null>(null);

  const activeValue = hoverValue ?? value;

  const handleClick = () => {
    if (!readOnly && onChange && hoverValue !== null) {
      onChange(hoverValue);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (readOnly) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position inside stars container
    const width = rect.width;

    const percent = x / width;

    // Snap to precision (basically is a round up to nearest precision math)
    // e.g.
    // hover percent(value) is 0.3, precision is 0.5, for this case we want to snap to rating 1
    // 0.3/0.5 = 0.6 -> ceil to 1, 1* 0.5 = 1
    let valueInStars = Math.ceil(percent / precision) * precision;

    if (valueInStars < precision) valueInStars = precision;

    const newValue = index + valueInStars;

    setHoverValue(Math.min(newValue, max));
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5",
        readOnly ? 'cursor-default' : 'cursor-pointer',
        className
      )}
      onMouseLeave={() => setHoverValue(null)}
    >
      {Array.from({ length: max }).map((_, index ) => {
        // e.g. 
        // Star 2 -> index == 1
        // activeValue == 3.5
        // 3.5 - 1 = 2.5 -> 1 -> 100% width

        // e.g.
        // Star 4 -> index == 3
        // activeValue == 3.5
        // 3.5 - 3 = 0.5 -> 50% width
        
        const fillPercentage = Math.min(1, Math.max(0, activeValue - index)) * 100;

        return (
          <div
            key={index}
            onClick={handleClick}
            style={{
              position: 'relative',
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
          >
            {/* Background Empty Icon */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
              }}
            >
              {cloneElement(
                emptyIcon,
                { width: size, height: size } as SVGProps<SVGSVGElement>
              )}
            </div>
            
            {/* Foreground Filled Icon */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${fillPercentage}%`,
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              <div style={{ width: size, height: size }}>
                {cloneElement(
                  icon,
                  { width: size, height: size } as SVGProps<SVGSVGElement>
                )}
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
export default Rating