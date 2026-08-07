import { useEffect, useRef, useState } from 'react';

/**
 * Cycles through an array of strings with a typewriter effect.
 * Types a line, pauses, deletes it, then advances to the next.
 * Respects `prefers-reduced-motion` by showing the full line statically.
 *
 * @param {string[]} lines   Phrases to cycle through.
 * @param {object}   opts    Timing options (ms).
 */
export function useTypewriter(
  lines,
  { typeSpeed = 55, deleteSpeed = 28, holdTime = 1400, startDelay = 300 } = {}
) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setText(lines[index % lines.length]);
      return;
    }

    const current = lines[index % lines.length];
    let deleting = false;
    let char = 0;
    let started = false;

    const tick = () => {
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer.current = setTimeout(tick, holdTime);
          return;
        }
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          setIndex((i) => i + 1);
          return;
        }
      }
      timer.current = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    timer.current = setTimeout(
      () => {
        started = true;
        tick();
      },
      started ? typeSpeed : startDelay
    );

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, lines]);

  return text;
}
