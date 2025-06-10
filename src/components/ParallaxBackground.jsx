"use client";

import { useEffect } from 'react';

const ParallaxBackground = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY;
      document.documentElement.style.setProperty('--scroll-offset', scrollOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default ParallaxBackground; 