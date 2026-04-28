'use client'

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";

const MAX_VALUE_LENGTH = 400;

interface DynamicTextareaProps {
  value?: string;
  onChange?: (val: string) => void;
  error?: boolean;
  maxLength?: number;
  minLength?: number;
  placeHolder?: string;
}

const DynamicTextarea = ({
  value = "",
  onChange,
  error,
  maxLength = MAX_VALUE_LENGTH,
  minLength = 0,
  placeHolder = "",
} : DynamicTextareaProps ) => {
  const charLength = maxLength - value.length;

  return (
    <div>
      <Textarea
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        maxLength={maxLength}
        minLength={1}
        className={cn("shadow-div-effect-sm", error && "shadow-div-effect-sm-error")}
      />
      <div className="text-xs mt-1 mr-1 flex justify-between">
        {minLength > 0 && <p className={cn( "text-red-500 text-left transition-opacity" , error ? "opacity-100" : "opacity-0")}>At least {minLength} characters</p>}
        <p className="text-gray-400 text-right">{charLength} characters left</p>
      </div>
    </div>
  )
}
export default DynamicTextarea