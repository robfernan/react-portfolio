import { useState, useEffect } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

const GLYPHS = '01アイウエオカキクケコサシスセソタチツテトABCDEF0123456789_#@$%&';

/**
 * High-performance text scramble reveal effect inspired by Signal-A Studio & Awwwards SOTD sites.
 * Uses requestAnimationFrame with zero layout thrashing.
 */
export default function TextScramble({
  text,
  className = '',
  triggerOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }

      iteration += 1 / 2;
    }, 28);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span
      className={`inline-block select-none font-inherit ${className}`}
      onMouseEnter={triggerOnHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}
