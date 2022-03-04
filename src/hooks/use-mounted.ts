import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

export const useMounted = (): MutableRefObject<boolean> => {
  const isMounted = useRef(true);

  useEffect(
    () => (): void => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
};
