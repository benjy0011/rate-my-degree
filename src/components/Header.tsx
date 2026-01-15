import Image from "next/image"
import Link from "next/link"
import HeaderLinkTextGroup from "./HeaderLinkTextGroup"
import SearchIcon from "./SearchIcon"
import { Separator } from "./ui/separator"
import SignInButton from "./SignInButton"
import HamburgerMenu from "./HamburgerMenu"

const Header = () => {
  return (
    <header className="header">
      <div className="container header-wrapper">
        <div className="header-left">
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="Rate My Degree logo"
              width={200}
              height={32}
              className="header-logo"
            />
          </Link>

          <div className="only-lg">
            <HeaderLinkTextGroup />
          </div>
          
        </div>
        

        <div className="header-right">
          <SearchIcon />

          <div className="header-right-seperator-wrapper hidden">
            <Separator orientation="vertical" className="bg-black" />
          </div>

          <div className="only-lg">
            <SignInButton />
          </div>

          <HamburgerMenu />
        </div>
      </div>
    </header>
  )
}
export default Header