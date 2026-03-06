import Rating from "@/components/Rating";
import FormSectionWrapper from "./FormSectionWrapper";
import { Star } from "lucide-react";

export interface DegreeRatingProps {
  label: string;
  value?: number;
  onChange?: (val: number) => void;
}

const DegreeRatings = ({
  ratings
} : {
  ratings: DegreeRatingProps[]
}) => {

  return (
    <div className="shadow-div-effect-sm p-5 grid grid-cols-2 gap-6">
      {ratings.map(( { label, value, onChange }, index ) => (
        <FormSectionWrapper
          key={`${index}-${value}`}
          title={label}
          className="gap-2"
          titleClassName="text-gray-700 text-[13px]"
        >
          <Rating
            className="gap-1"
            size={17}
            emptyIcon={<Star stroke="#ddd" fill="#ddd" />}
            value={value ?? 0}
            onChange={onChange}
          />
        </FormSectionWrapper>
      ))}
    </div>
  )
}
export default DegreeRatings