"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const text =
    "A whole generation has been priced out. We simply haven't built enough homes. We need your help and support to build 446 new homes including 200 affordable homes.";

  const highlightWords = ["generation", "priced", "out", "haven't", "built", "enough", "help", "support", "446", "200", "affordable", "homes"];
  const words = text.split(" ");

  // Clean word for matching (remove punctuation)
  const cleanWord = (word: string) => word.replace(/[.,!?]/g, "").toLowerCase();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = wordsRef.current.filter(Boolean);
      const totalWords = wordElements.length;

      // Create pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Animate each word sequentially
      wordElements.forEach((word, index) => {
        const startPosition = index / totalWords;

        tl.to(
          word,
          { opacity: 1, duration: 0.05, ease: "none" },
          startPosition
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-[var(--navy)] flex items-center justify-center px-6"
    >
      <div ref={textRef} className="max-w-5xl mx-auto text-center">
        <h2 className="leading-snug">
          {words.map((word, index) => {
            const cleaned = cleanWord(word);
            const isHighlight = highlightWords.some(
              (hw) => cleaned === hw.toLowerCase() || cleaned.includes(hw.toLowerCase())
            );
            return (
              <span
                key={index}
                ref={(el) => {
                  wordsRef.current[index] = el;
                }}
                className={`inline-block mr-[0.25em] opacity-20 ${
                  isHighlight ? "text-[var(--teal)]" : "text-white"
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
