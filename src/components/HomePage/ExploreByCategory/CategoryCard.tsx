import Image from "next/image";
import ShadowWrapper from "../../ShadowWrapper"

interface CategoryCardProps {
  src: string;
  title: string;
  description: string;
}

const CategoryCard = ({
  src,
  title,
  description,
} : CategoryCardProps) => {
  return (
    <ShadowWrapper className="category-card category-card-size" wrapperClassName="category-card-wrapper">
      <Image
        src={src}
        alt={title}
        width={161}
        height={117}
        className="h-35 max-lg:size-32 w-auto p-1"
      />

      <h6 className="font-bold text-black text-xl mt-4">
        {title}
      </h6>

      <p className="text-gray-500 font-medium text-sm text-center">
        {description}
      </p>
    </ShadowWrapper>
  )
}
export default CategoryCard