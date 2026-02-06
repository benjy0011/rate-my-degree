import ExploreCategories from "@/components/HomePage/ExploreByCategory/ExploreCategories"
import Hero from "@/components/HomePage/Hero/Hero"
import RecentReviews from "@/components/HomePage/RecentReviews/RecentReviews"
import SellingPoints from "@/components/HomePage/Intro/SellingPoints"
import TopRatedDegree from "@/components/HomePage/TopRatedDegree/TopRatedDegree"
import JoinTheConversation from "@/components/HomePage/JoinTheConversation/JoinTheConversation"

export default function Home() {
  return (
    <>
      <Hero />

      <SellingPoints />

      <ExploreCategories />

      <TopRatedDegree />

      <RecentReviews />

      <JoinTheConversation />
    </>
  )
}