"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const headlineWords = ["Priced", "out", "of"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger each word with a slide-up and fade
      tl.from(words, {
        y: 120,
        opacity: 0,
        rotationX: -90,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      })
        .from(
          ".hero-surrey",
          {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          subheadRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden bg-[var(--navy)]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--teal)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--teal-dark)] opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ perspective: "1000px" }}>
          {headlineWords.map((word, index) => (
            <span
              key={index}
              ref={(el) => { wordsRef.current[index] = el; }}
              className="inline-block mr-[0.25em]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
          <span className="hero-surrey inline-block text-[var(--teal)]">Surrey?</span>
        </h1>

        <p
          ref={subheadRef}
          className="text-xl md:text-2xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          446 homes, including{" "}
          <span className="font-semibold text-[var(--teal)]">
            200 affordable homes
          </span>{" "}
          are coming to Hookwood, near Gatwick. Support plans that could help
          you get on the housing ladder.
        </p>

        <a
          ref={ctaRef}
          href="#support-form"
          className="inline-block bg-[var(--teal)] text-[var(--navy)] px-10 py-5 text-lg font-semibold rounded-full hover:bg-[var(--teal-light)] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Register Your Support
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
