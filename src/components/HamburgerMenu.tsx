'use client'

import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer"
import HeaderLinkTextGroup from "./HeaderLinkTextGroup"
import { DialogTitle } from "@radix-ui/react-dialog"

const HamburgerMenu = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild className="except-lg ">
        <Button size="icon" variant="ghost" className="text-gray-600 hover:cursor-pointer border-2 border-gray-500 ml-4 hover:bg-custom-light-gray">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="side-drawer" style={{ width: "250px" }}>
        <DialogTitle className="sr-only">Mobile Nav Bar</DialogTitle>
        <HeaderLinkTextGroup />
      </DrawerContent>
    </Drawer>
  )
}
export default HamburgerMenu