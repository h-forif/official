import { useCallback, useEffect, useState } from 'react';

import { debounce } from 'es-toolkit';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updatePosition = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    const debouncedUpdatePosition = debounce(updatePosition, 20);

    const handleScroll = () => {
      debouncedUpdatePosition();
    };

    window.addEventListener('scroll', handleScroll);

    // 초기 위치 설정
    updatePosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      debouncedUpdatePosition.cancel();
    };
  }, [updatePosition]);

  return scrollPosition;
};

export default useScrollPosition;
