import { Suspense } from "react"
import TopRatedDegreeCards, { TOP_RATED_DEGREE_COUNT } from "./TopRatedDegreeCards"
import ExploreAllDegreesButton from "./RedirectButton"
import { Skeleton } from "./ui/skeleton"

const TopRatedDegree = () => {
  return (
    <section id="top-rated-degree" className="top-rated-degree">
      <div className="top-rated-degree-wrapper">
        <h4 className="h4 font-ubuntu text-center my-12">Top Rated Degree</h4>
        
        <Suspense fallback={
          <div className="home-cards-wrapper">
            {Array.from({ length: TOP_RATED_DEGREE_COUNT }).map((_, index) => (
              <Skeleton key={index} className="home-card-loading" />
            ))}
          </div>
        }>
          <TopRatedDegreeCards />
        </Suspense>


        <div className="flex justify-center my-8">
          <ExploreAllDegreesButton path="/degrees" text="Explore All Degree" />
        </div>
      </div>
    </section>
  )
}
export default TopRatedDegree