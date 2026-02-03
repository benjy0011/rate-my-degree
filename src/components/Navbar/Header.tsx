import Image from "next/image"
import Link from "next/link"
import HeaderLinkTextGroup from "./HeaderLinkTextGroup"
import SearchIcon from "./SearchIcon"
import { Separator } from "../ui/separator"
import SignInButton from "./SignInButton"
import HamburgerMenu from "./HamburgerMenu"
import { createClient } from "@/lib/supabase/server"
import AvatarButton, { AvatarButtonProps } from "./AvatarButton"

const Header = async () => {
  const supabase = createClient();

  const { user } = (await (await supabase).auth.getUser()).data;
  const {
    full_name = "",
    email = "",
    avatar_url = "",
  } = user?.user_metadata ?? {};

  const userProfileData = await (await supabase)
    .from("profiles")
    .select("username")
    .eq("id", user?.id)
    .single();


  const username = userProfileData.data?.username;

  const avatarBtnProps: AvatarButtonProps = {
    email: email,
    name: full_name,
    src: avatar_url,
    username: username as unknown as string,
  }

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
              loading="eager"
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
            {!user
              ? <SignInButton />
              : <AvatarButton {...avatarBtnProps} />
            }
          </div>

          <HamburgerMenu loggedIn={!!user} {...avatarBtnProps} />
        </div>
      </div>
    </header>
  )
}
export default Header