"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  children: string;
  highlightWords?: string[];
  className?: string;
}

export default function ScrollRevealText({
  children,
  highlightWords = [],
  className = "",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = children.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = wordsRef.current.filter(Boolean);
      const totalWords = wordElements.length;

      // Create a timeline that reveals words sequentially
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      // Animate each word based on its position in the sequence
      wordElements.forEach((word, index) => {
        if (word) {
          const startPosition = index / totalWords;
          const endPosition = (index + 1) / totalWords;

          tl.fromTo(
            word,
            { opacity: 0.2 },
            { opacity: 1, duration: 0.1, ease: "none" },
            startPosition
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => {
        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <span
            key={index}
            ref={(el) => {
              wordsRef.current[index] = el;
            }}
            className={`inline-block mr-[0.3em] opacity-20 ${
              isHighlight ? "text-[var(--teal)]" : "text-white"
            }`}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
