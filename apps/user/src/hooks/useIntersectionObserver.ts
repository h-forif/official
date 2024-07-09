// hooks/useIntersectionObserver.ts
import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  targetRef: RefObject<Element>;
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  targetRef,
}: UseIntersectionObserverProps): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0) {
          setIsIntersecting(entries[0]!.isIntersecting);
        }
      },
      { root, rootMargin, threshold },
    );

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef, root, rootMargin, threshold]);

  return isIntersecting;
};
