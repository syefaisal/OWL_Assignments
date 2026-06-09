import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Tiny data-fetching hook. Runs the loader once on mount. */
export function useFetch<T>(loader: () => Promise<T>): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    loader()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch(
        (err) =>
          active &&
          setState({ data: null, loading: false, error: String(err) })
      );
    return () => {
      active = false;
    };
    // loader is expected to be a stable reference (module-level api.* fn).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
