'use client'

import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer"
import HeaderLinkTextGroup from "./HeaderLinkTextGroup"
import { DialogTitle } from "@radix-ui/react-dialog"
import useScreenSize from "@/hooks/useScreenSize"
import { useEffect, useState } from "react"
import SignInButton from "./SignInButton"
import AvatarButton, { AvatarButtonProps } from "./AvatarButton"

interface HamburgerMenuProps extends AvatarButtonProps {
  loggedIn?: boolean,
}

const HamburgerMenu = ({
  loggedIn = false,
  ...res
} : HamburgerMenuProps) => {
  const { isLargeScreen } = useScreenSize();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if(isLargeScreen && open) {
      setTimeout(() => {
        setOpen(false);
      }, 0)
    }
  }, [isLargeScreen, open])

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild className="except-lg" >
        <Button
          size="icon"
          variant="ghost"
          className="
            text-gray-600 
            hover:cursor-pointer border-2 
            border-gray-500
            ml-4 
            hover:bg-custom-light-gray 
            shadow-[0px_0px_4px_0px_rgba(0,0,0,0.49)]
            active:shadow-none
            active:border-gray-400
            active:text-gray-500
            transition-all
            duration-300
            "
          >
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="side-drawer" style={{ width: "250px" }}>
        <DialogTitle className="sr-only">Mobile Nav Bar</DialogTitle>
        <HeaderLinkTextGroup />
        
        <div className="side-drawer-sign-in-wrapper">
          <div className="side-drawer-sign-in">
            {loggedIn
              ? <AvatarButton {...res} />
              : <SignInButton />
            }
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default HamburgerMenu