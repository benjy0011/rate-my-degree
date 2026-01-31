import Categories from "@/components/Categories"
import ExploreCategories from "@/components/ExploreCategories"
import Hero from "@/components/Hero"
import RecentReviews from "@/components/RecentReviews"
import SellingPoints from "@/components/SellingPoints"
import TopRatedDegree from "@/components/TopRatedDegree"

export default function Home() {
  return (
    <>
      <Hero />

      <SellingPoints />

      <ExploreCategories />

      <TopRatedDegree />

      <RecentReviews />
    </>
  )
}