import { Suspense } from "react"
import TopRatedDegreeCards from "./TopRatedDegreeCards"
import Link from "next/link"
import ShadowWrapper from "./ShadowWrapper"
import ExploreAllDegreesButton from "./ExploreAllDegreesButton"

const TopRatedDegree = () => {
  return (
    <section id="top-rated-degree" className="top-rated-degree">
      <div className="top-rated-degree-wrapper">
        <h4 className="h4 font-ubuntu text-center my-12">Top Rated Degree</h4>
        
        <Suspense fallback={<div>Loading</div>}>
          <TopRatedDegreeCards />
        </Suspense>


        <div className="flex justify-center my-8">
          <ExploreAllDegreesButton />
        </div>
      </div>
    </section>
  )
}
export default TopRatedDegree