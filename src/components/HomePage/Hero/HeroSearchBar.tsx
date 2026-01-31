'use client';

import { Search } from "lucide-react"
import ShadowWrapper from "../../ShadowWrapper"
import { cn } from "@/lib/utils"
import { useState } from "react";

const HeroSearchBar = ({
  className = ""
} : { className?: string }) => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className={cn("flex gap-2 items-center p-1", className)}>
      <Search size="40px" className="text-gray-600" />
      <input
        className="focus-visible:outline-none w-full"
        placeholder="Search degrees, universities, locations ..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ShadowWrapper
        className="px-8 py-2"
        wrapperClassName="ml-2"
        onClick={() => console.log(searchText)}
      >
        Search
      </ShadowWrapper>
    </div>
  )
}
export default HeroSearchBar