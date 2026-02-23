import { DependencyList, useCallback, useEffect, useState } from "react"

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
};



const useAsync = <T>(
  asyncFn: () => Promise<T>,
  deps: DependencyList
) => {
  const [ state, setState ] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const result = await asyncFn();

      setState({
        data: result,
        loading: false,
        error: null,
      });

      return result;
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err,
      });

      throw err;
    }
  }, [asyncFn]);

  useEffect(() => {
    setTimeout(() => {
      execute();
    }, 0)
  }, deps);

  return {
    ...state,
    refetch: execute,
  };
}
export default useAsync