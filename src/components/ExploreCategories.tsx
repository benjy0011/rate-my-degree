import { Suspense } from "react"
import Categories from "./Categories"
import { Skeleton } from "./ui/skeleton"
import { CATEGORIES_DISPLAY_COUNT } from "@/constants"
import ViewCategoryButton from "./ViewCategoryButton"

const ExploreCategories = () => {


  return (
    <section id="categories" className="categories">

      <div className="flex max-lg:flex-col w-full justify-between gap-6 max-lg:items-center">
        <h4 className="h4 font-ubuntu max-lg:text-center">Explore by Category</h4>

        <ViewCategoryButton />
      </div>

      <Suspense
        fallback={
          <div className="cards-wrapper">
            {Array.from({ length: CATEGORIES_DISPLAY_COUNT }).map((c, i) => (<Skeleton key={`${c}-${i}`} className="category-card-size bg-gray-200" />))}
          </div>
        }
      >
        <Categories />
      </Suspense>
    </section>
  )
}
export default ExploreCategories