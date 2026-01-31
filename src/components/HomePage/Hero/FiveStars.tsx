import { Star } from "lucide-react"
import ShadowWrapper from "../../ShadowWrapper"

const FiveStars = ({ className = "" } : { className?: string }) => {
  return (
    <div className={className}>
      <ShadowWrapper className="flex flex-row gap-1 bg-white pt-4 pb-11 px-4">
        {Array.from({ length: 5 }, (v, i) => <Star className="text-yellow-300 fill-yellow-300" key={`${v}-${i}-star`} />)}
      </ShadowWrapper>
    </div>
    
  )
}
export default FiveStars