import ShadowWrapper from "./ShadowWrapper"
import Image from "next/image"
import FiveStars from "./FiveStars"
import HangingWrapper from "./HangingWrapper"
import BounceWrapper from "./BounceWrapper"
import HeroSearchBar from "./HeroSearchBar"

const Hero = () => {
  return (
    <section id="hero" className="hero container">
      <div className="hero-left ">
        <ShadowWrapper wrapperClassName="-rotate-3" className="bg-yellow-400 text-black text-xs">
          #1 Degree Review Platform
        </ShadowWrapper>

        <div className="hero-title">
          <h6>RATE YOUR</h6>
          <div className="hero-title-wrapper"><span className="hero-title-highlight-text">DEGREE</span></div>
          <h6>JOURNEY.</h6>
        </div>

        <div className="hero-description">
          Join thousands of students and alumni sharing honest reviews about degree programs, career outcomes, and academic experiences.
        </div>

        <ShadowWrapper
          className="bg-white text-black flex"
          // wrapperClassName="w-full"
        >
          <HeroSearchBar />
        </ShadowWrapper>
      </div>

      <div className="hero-right">
        <BounceWrapper>
          <FiveStars className="hero-five-stars-card" />
        </BounceWrapper>

        <HangingWrapper>
          <ShadowWrapper className="bg-white" shadowDepth={2}>
            <Image 
              src="/assets/images/hero-illustration.png"
              width={798}
              height={542}
              alt="Rate My Degree"
            />
          </ShadowWrapper>
        </HangingWrapper>
      </div>
      
    </section>
  )
}
export default Hero