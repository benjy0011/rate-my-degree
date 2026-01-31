import { Search } from "lucide-react"

const SearchIcon = () => {
  return (
    <div className="header-search group">
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