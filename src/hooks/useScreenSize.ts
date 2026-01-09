import useMediaQuery from "./useMediaQuery";

export default function useScreenSize() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
}