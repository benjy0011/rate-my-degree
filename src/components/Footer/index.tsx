import Image from "next/image"
import Link from "next/link"

const FOOTER_ELEMENTS = [
  {
    title: "Platform",
    childrens: [
      {
        text: "Browse Degrees",
        href: "/degrees",
        targetBlank: false,
      },
      {
        text: "Write a Review",
        href: "/reviews",
        targetBlank: false,
      },
    ]
  },
  {
    title: "Support Us",
    childrens: [
      {
        text: "Github",
        href: "https://github.com/benjy0011/rate-my-degree",
        targetBlank: true,
      },
    ]
  }
]

const Logo = () => (
  <div className="inline-flex gap-2 items-center">
    <Image
      src="/assets/icons/logo-icon-only.svg"
      alt="Rate My Degree logo"
      width={25}
      height={25}
      className=""
    />

    <h6 className="font-bold font-fredoka text-xl text-black">Rate My Degree</h6>
  </div>
)

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-wrapper">
        
        <div className="footer-upper-wrapper">

          <div className="flex flex-col gap-4 flex-1">
            <Logo />
            <p>Real reviews from real students. Make informed decisions about your degree program.</p>
          </div>


          {FOOTER_ELEMENTS.map(( { title, childrens }, index ) => (
            <div
              key={`${title}-${index}`}
              className=""
            >
              <h6
                className="font-black text-sm text-black mb-2 mt-1"
              >
                {title}
              </h6>

              {childrens.map(( { text, href, targetBlank } , index ) => (
                <div
                  key={`${text}-${index}`}
                  className="flex flex-col text-sm"
                >
                  <Link
                    href={href}
                    target={targetBlank ? "_blank" : "_self"}
                    className="my-0.5 hover:underline"
                  >
                    {text}
                  </Link>
                </div>
              ))}
            </div>
          ))}

        </div>

        <div className="footer-lower-wrapper">
          © {new Date().getFullYear()} Rate My Degree. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
export default Footer