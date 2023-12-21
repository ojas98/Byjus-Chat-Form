import { useCallback, useEffect, useRef } from "react";

import { useMemoizedCallback } from "./useMemoizedCallback";

/**
 * A hook that handles the setTimeout timer function.
 * @param callback The function to be executed after {@link delay} milliseconds.
 * @param delay The number of milliseconds to wait before executing the function. The timer will be cancelled if {@link delay} is `null | undefined`.
 * @returns clear timeout handle.
 */
export const useTimeout = (callback: () => void, delay?: number | null) => {
  const timerCallback = useMemoizedCallback(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (delay == null || delay < 0) return;
    timerRef.current = setTimeout(timerCallback, delay);
    return clear;
    // timerCallback and clear should not change and hence not included in the dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return clear;
};
