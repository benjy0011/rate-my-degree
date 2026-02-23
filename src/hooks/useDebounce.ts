import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(val: T, interval: number = 300): T => {
  const [debouncedVal, setDebouncedVal] = useState<T>(val);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedVal(val);
    }, interval);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [val, interval]);

  return debouncedVal;
};

export default useDebounce;