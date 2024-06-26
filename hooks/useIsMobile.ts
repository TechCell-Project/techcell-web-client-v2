import { useEffect, useState } from 'react';

export const useIsMobile = (px_width?: number) => {
  const [width, setWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    setIsMobile(width <= 768);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [width]);

  useEffect(() => {
    if (px_width) {
        setIsMobile(width <= px_width);
    }
  }, [px_width, width]);

  if (isMobile === null) {
    return false;
  }

  return isMobile;
};
