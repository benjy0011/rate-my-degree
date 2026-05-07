'use client';

import { Search } from "lucide-react"
import ShadowWrapper from "../../ShadowWrapper"
import { cn } from "@/lib/utils"
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSearchBar = ({
  className = ""
} : { className?: string }) => {
  const router = useRouter();
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
        onClick={() => router.push(`/degrees?search=${searchText}`)}
      >
        Search
      </ShadowWrapper>
    </div>
  )
}
export default HeroSearchBar