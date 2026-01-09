import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  }

  const [ matches, setMatches ] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return (() => {
      matchMedia.removeEventListener("change", handleChange)
    });

    function handleChange() {
      setMatches(matchMedia.matches)
    };

  }, [query]);

  return matches;
}