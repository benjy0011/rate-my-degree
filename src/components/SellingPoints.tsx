import { INTROS } from "@/constants"
import IntroCard from "./IntroCard"

const SellingPoints = () => {
  return (
    <section id="intro" className="intro">
      <div className="intro-wrapper container font-ubuntu">
        <h4 className="h4 text-center">Why Rate My Degree?</h4>

        <p className="intro-description grayed-text">Real reviews from real students. Make informed decisions about your degree.</p>

        <div className="intro-cards">
          {INTROS.map((intro, index) => (
            <IntroCard key={`${intro.title}-${index}`} {...intro} />
          ))}
        </div>
      </div>
      
    </section>
  )
}
export default SellingPoints