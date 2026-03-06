import { cn } from "@/lib/utils";
import DynamicSelect from "./DynamicSelect"
import { Input } from "@/components/ui/input";

interface DegreeGraduationProps {
  month?: number
  year?: number
  onMonthChange?: (month: number | undefined) => void
  onYearChange?: (year: number | undefined) => void
  yearError?: boolean
}

const MONTHS_SELECTION = [
  1,2,3,4,5,6,7,8,9,10,11,12
];

const MONTHS_MAPPING = [
  { name: "Jan", value: 1 },
  { name: "Feb", value: 2 },
  { name: "Mar", value: 3 },
  { name: "Apr", value: 4 },
  { name: "May", value: 5 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 7 },
  { name: "Aug", value: 8 },
  { name: "Sep", value: 9 },
  { name: "Oct", value: 10 },
  { name: "Nov", value: 11 },
  { name: "Dec", value: 12 },
];

function parseNumToMonth(num: number | undefined): string | undefined {
  return MONTHS_MAPPING.find(month => month.value === num)?.name ?? "";
}


const DegreeGraduation = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  yearError = false,
} : DegreeGraduationProps ) => {
  return (
    <div
      className="flex gap-5"
    >
      <DynamicSelect
        value={month}
        selections={MONTHS_SELECTION}
        selectionRenderer={(v) => <p>{parseNumToMonth(v)}</p>}
        onChange={(e) => onMonthChange?.(e)}
        placeHolder="Month"
      />

      <Input
        className={cn(yearError ? "shadow-div-effect-sm-error" : "shadow-div-effect-sm")}
        type="number"
        maxLength={4}
        max={9999}
        placeholder="Year (e.g. 2024)"
        onWheel={(e) => e.currentTarget.blur()}
        onKeyDown={(e) => {
          if (e.key === "e" || e.key === "E") {
            e.preventDefault()
          }
        }}
        value={year ?? ""}
        onChange={(e) => onYearChange?.(parseInt(e.target.value))}
      />
    </div>
  )
}
export default DegreeGraduation