import { cn } from "@/lib/utils"
import { Input } from "../ui/input"


type DynamicInputProps = React.ComponentProps<'input'> & {
  error?: boolean;
}

const DynamicInput = ({
  error = false,
  ...props
} : DynamicInputProps ) => {
  return (
    <div>
      <Input
        className={cn(
          "shadow-div-effect-sm",
          error && "shadow-div-effect-sm-error"
        )}
        {...props}
      />
    </div>
  )
}
export default DynamicInput