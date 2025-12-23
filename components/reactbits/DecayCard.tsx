'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface DecayCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function DecayCard({
  children,
  width = '100%',
  height = 'auto',
  className = '',
}: DecayCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width,
        height,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
