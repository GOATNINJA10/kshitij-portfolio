'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = '', delay = 100 }: SplitTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const springs = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: inView
      ? async (next: any) => {
          await next({ opacity: 1, transform: 'translate3d(0, 0, 0)' });
          await next({ transform: 'translate3d(0, 0, 0)' });
        }
      : { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    delay,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <animated.div ref={ref} style={springs} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, j) => (
            <span key={j} style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </animated.div>
  );
}
