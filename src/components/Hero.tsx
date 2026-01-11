import { Search } from "lucide-react"
import ShadowWrapper from "./ShadowWrapper"
import Image from "next/image"

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
          <div className="flex gap-2 items-center p-1">
            <Search size="40px" className="text-gray-600" />
            <input className="focus-visible:outline-none w-full" placeholder="Search degrees, universities, locations ..." />
            <ShadowWrapper className="px-8 py-2" wrapperClassName="ml-2">
              Search
            </ShadowWrapper>
          </div>
          
        </ShadowWrapper>
      </div>

      <div className="hero-right">
        <ShadowWrapper className="bg-white">
          <Image 
            src="/assets/images/hero-illustration.png"
            width={798}
            height={542}
            alt="Rate My Degree"
          />
        </ShadowWrapper>
      </div>
      
    </section>
  )
}
export default Hero