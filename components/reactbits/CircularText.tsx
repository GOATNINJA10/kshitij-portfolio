'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CircularTextProps {
  text: string;
  radius?: number;
  className?: string;
  letterSpacing?: number;
  duration?: number;
}

export default function CircularText({
  text,
  radius = 100,
  className = '',
  letterSpacing = 10,
  duration = 10,
}: CircularTextProps) {
  const characters = text.split('');
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: duration,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [controls, duration]);

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
      animate={controls}
    >
      {characters.map((char, i) => {
        const angle = (i / characters.length) * 360;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-center font-bold"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
            }}
          >
            {char}
          </div>
        );
      })}
    </motion.div>
  );
}
