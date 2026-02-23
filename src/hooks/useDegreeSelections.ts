import { fetchDegreeSelections } from "@/app/actions/degrees"
import useAsync from "./useAsync"
import useDebounce from "./useDebounce"

const useDegreeSelections = (searchTerm?: string) => {
  const debouncedSearch = useDebounce(searchTerm);

  const {
    data,
    loading
  } = useAsync(() => fetchDegreeSelections(searchTerm), [debouncedSearch]);
  
  return {
    data,
    loading,
  }
}
export default useDegreeSelections