import { useEffect, useRef, useState } from 'react';

export function useNavMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = (menuTitle: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setActiveMenu(menuTitle);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const handleClick = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    activeMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
