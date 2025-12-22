import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="header max-w-dvw">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Rate My Degree logo"
            width={140}
            height={32}
            className="header-logo"
          />
        </Link>
      </div>
    </header>
  )
}
export default Header