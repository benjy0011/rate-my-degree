import { Mars, Venus } from "lucide-react"

interface GenderSelectProps {
  isMale?: boolean;
  onGenderChange?: (isMale: boolean) => void;
  error?: boolean;
}


const genderSelectionsIcon = [
  {
    Icon: Mars,
    isThisMale: true,
    selectedColor: "#00FFFF",
  },
  {
    Icon: Venus,
    isThisMale: false,
    selectedColor: "#FFC0CB",
  },
];

const GenderSelect = ({
  isMale,
  onGenderChange,
  error = false,
} : GenderSelectProps ) => {
  return (
    <div className="flex gap-2">
      {genderSelectionsIcon.map(( { Icon, isThisMale, selectedColor }, index ) => (
        <Icon 
          key={index}
          color={ isMale === isThisMale ? selectedColor : "gray"}
          className="hover:cursor-pointer transition-colors duration-300"
          onClick={() => {
            onGenderChange?.(isThisMale);
          }}
        />
      ))}
      {error && <span className="text-red-600">*</span>}
    </div>
  )
}
export default GenderSelect