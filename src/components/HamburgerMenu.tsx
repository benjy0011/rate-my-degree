'use client'

import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Drawer, DrawerTrigger } from "./ui/drawer"

const HamburgerMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild className="except-lg ">
        <Button size="icon" variant="ghost">
          <Menu />
        </Button>
      </DrawerTrigger>
    </Drawer>
  )
}
export default HamburgerMenu