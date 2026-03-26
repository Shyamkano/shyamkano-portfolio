'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { CSSProperties } from 'react';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (lag effect)
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  // Faster spring for the inner dot
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 400 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('project-card') ||
        target.classList.contains('bento-item') ||
        target.closest('a') ||
        target.closest('button');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          border: '1.5px solid white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          translateX: '-50%',
          translateY: '-50%',
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isClicked ? 0.8 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          backgroundColor: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
          translateX: '-50%',
          translateY: '-50%',
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovered ? 4 : 1,
          backgroundColor: isHovered ? 'white' : 'white',
        }}
      />
    </>
  );
};

export default CustomCursor;
