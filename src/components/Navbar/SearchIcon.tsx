'use client'

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

const SearchIcon = () => {
  const router = useRouter();

  return (
    <div className="header-search group" onClick={() => router.push('/degrees')}>
      <div className="header-search-wrapper">
        <div className="group-hover:rotate-20 header-search-icon">
          <Search />
        </div>

        <div className="search-dot-wrapper">
          <div className="search-dot group-hover:translate-x-[2.9px] group-hover:translate-y-[4.4px]" />
        </div>
      </div>
    </div>
  )
}
export default SearchIcon