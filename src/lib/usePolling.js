import { useEffect, useRef, useState } from "react";
import { api } from "./api";
export function usePolling(path, interval = 3000) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [revision, setRevision] = useState(0);
  const reload = useRef(() => setRevision((x) => x + 1)).current;
  useEffect(() => {
    if (!path) return;
    let active = true,
      timer;
    const controller = new AbortController();
    async function poll() {
      try {
        const result = await api(path, undefined, controller.signal);
        if (active) {
          setData(result);
          setError(null);
        }
      } catch (e) {
        if (active && e.name !== "AbortError") setError(e);
      } finally {
        if (active && interval) timer = setTimeout(poll, interval);
      }
    }
    poll();
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [path, interval, revision]);
  return { data, error, reload };
}
