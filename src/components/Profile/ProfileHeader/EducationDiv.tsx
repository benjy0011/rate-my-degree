import { GraduationCap } from "lucide-react"

interface EducationDivProps {
  degreeName: string,
  university: string,
  graduationYear: string | number,
}

const EducationDiv = ({
  degreeName,
  university,
  graduationYear,
} : EducationDivProps) => {
  return (
    <div className="inline-flex gap-2">
      <GraduationCap
        className="translate-y-1.5 fill-gray-400 text-gray-300"
        strokeWidth={1}
        fillOpacity={0.5}
      />

      <div className="flex flex-col">
        <h6 className="font-bold">{degreeName}</h6>
        <p className="text-sm text-gray-500">{university} • {graduationYear}</p>
      </div>
    </div>
  )
}
export default EducationDiv