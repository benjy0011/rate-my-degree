import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react"

interface EducationDivProps {
  degreeName?: string;
  university?: string;
  graduationYear?: string | number;
  empty?: boolean;
}

const EducationDiv = ({
  degreeName,
  university,
  graduationYear,
  empty = false,
} : EducationDivProps) => {
  return (
    <div className="inline-flex gap-2">
      <GraduationCap
        className={cn(
          "translate-y-1.5 fill-gray-400 text-gray-300",
          empty && "-translate-y-0.5"
        )}
        strokeWidth={1}
        fillOpacity={0.5}
      />

      {!empty
        ? (
          <div className="flex flex-col">
            <h6 className="font-bold">{degreeName}</h6>
            <p className="text-sm text-gray-500">{university} • {graduationYear}</p>
          </div>
        )
        : (
          <p className="text-sm text-gray-500">No review yet</p>
        )
      }
    </div>
  )
}
export default EducationDiv