import { Suspense } from "react"
import ReviewCards, { REVIEWS_COUNT } from "./ReviewCards"
import { Skeleton } from "./ui/skeleton"
import RedirectButton from "./RedirectButton"

const RecentReviews = () => {
  return (
    <section id="recent-reviews" className="recent-reviews">
      <div className="recent-reviews-wrapper">
        <h4 className="h4 text-center">Recent Reviews</h4>

        <Suspense fallback={
          <div className="home-cards-wrapper">
            {Array.from({ length: REVIEWS_COUNT }).map((_, index) => (
              <Skeleton key={index} className="home-card-loading" />
            ))}
          </div>
        }>
          <ReviewCards />
        </Suspense>

        <RedirectButton path="/reviews" text="Read More Reviews" />
      </div>
    </section>
  )
}
export default RecentReviews