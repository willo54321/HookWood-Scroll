"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatData {
  label: string;
  value: string;
  headline: string;
  description: string;
  color: string;
  size: number;
}

export default function AffordabilityChart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats: StatData[] = [
    {
      label: "£15k",
      value: "£15,000",
      headline: "Average Surrey salary in 1990",
      description: "The average worker earned £15,000 per year",
      color: "#99f6e4",
      size: 180,
    },
    {
      label: "£60k",
      value: "£60,000",
      headline: "Average house price in 1990",
      description: "A home cost just 4x the average salary",
      color: "#5eead4",
      size: 420,
    },
    {
      label: "£40k",
      value: "£40,000",
      headline: "Average Surrey salary today",
      description: "Salaries have grown over 35 years",
      color: "#14b8a6",
      size: 280,
    },
    {
      label: "£500k",
      value: "£500,000",
      headline: "Average house price today",
      description: "House prices are now 12.5x the average salary",
      color: "#0d9488",
      size: 720,
    },
  ];

  const captions = [
    { text: "In 1990, the average salary was", suffix: "per year", statIndex: 0 },
    { text: "The average house price? Just", suffix: "— only 4x a yearly salary", statIndex: 1 },
    { text: "Today, the average salary is", suffix: "per year", statIndex: 2 },
    { text: "Today, the average house price has skyrocketed to", suffix: "", statIndex: 3 },
    { text: "conclusion", suffix: "", statIndex: -1 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const squares = squaresRef.current.filter(Boolean);
      const captionEls = captionsRef.current.filter(Boolean);

      const growDuration = 0.15;
      const fadeDuration = 0.05;
      const blurAmount = "20px";

      // Set initial state - hidden until scroll
      squares.forEach((sq) => {
        gsap.set(sq, { width: 0, height: 0 });
      });

      // Set initial blur state for conclusion only
      gsap.set(captionEls[4], { filter: `blur(${blurAmount})` });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Phase 0 (0 - 0.20): Grow first square and show caption
      tl.to(captionEls[0], { opacity: 1, duration: fadeDuration }, 0);
      tl.to(squares[0], { width: stats[0].size, height: stats[0].size, duration: growDuration }, 0);

      // Phase 1 (0.20 - 0.40): Grow second square, both visible
      tl.to(captionEls[0], { opacity: 0, duration: fadeDuration }, 0.20 - fadeDuration);
      tl.to(captionEls[1], { opacity: 1, duration: fadeDuration }, 0.20);
      tl.to(squares[1], { width: stats[1].size, height: stats[1].size, duration: growDuration }, 0.20);

      // Phase 2 (0.40 - 0.60): Fade out 2000 squares, grow 2025 salary
      tl.to(captionEls[1], { opacity: 0, duration: fadeDuration }, 0.40 - fadeDuration);
      tl.to(squares[0], { opacity: 0, duration: fadeDuration }, 0.40 - fadeDuration);
      tl.to(squares[1], { opacity: 0, duration: fadeDuration }, 0.40 - fadeDuration);
      tl.to(captionEls[2], { opacity: 1, duration: fadeDuration }, 0.40);
      tl.to(squares[2], { width: stats[2].size, height: stats[2].size, duration: growDuration }, 0.40);

      // Phase 3 (0.60 - 0.70): Grow £500k BEHIND £40k to show size comparison
      tl.to(captionEls[2], { opacity: 0, duration: fadeDuration }, 0.60 - fadeDuration);
      tl.to(captionEls[3], { opacity: 1, duration: fadeDuration }, 0.60);
      tl.to(squares[3], { width: stats[3].size, height: stats[3].size, duration: growDuration }, 0.60);

      // Phase 4 (0.70): Fade out £40k after size comparison is visible
      tl.to(squares[2], { opacity: 0, duration: fadeDuration }, 0.70);

      // Phase 5 (0.75 - 0.85): Caption swaps to conclusion, £500k stays visible
      tl.to(captionEls[3], { opacity: 0, duration: 0.08 }, 0.75);
      tl.to(captionEls[4], { opacity: 1, filter: "blur(0px)", duration: 0.10 }, 0.75);

      // Phase 6 (0.85 - 1.0): £500k square expands BEHIND text, then text fades
      tl.to(squares[3], {
        width: "200vmax",
        height: "200vmax",
        duration: 0.12,
        ease: "power2.in"
      }, 0.85);
      // Text stays on top during expansion, then fades out
      tl.to(captionEls[4], { opacity: 0, duration: 0.05 }, 0.95);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-[var(--navy)] overflow-hidden relative"
    >
      {/* Left side - Dynamic text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-20 max-w-[45%] z-20">
        <div className="relative min-h-[250px]">
          {captions.map((caption, index) => (
            <div
              key={index}
              ref={(el) => {
                captionsRef.current[index] = el;
              }}
              className={`opacity-0 ${index > 0 ? "absolute inset-0" : ""}`}
            >
              {caption.statIndex >= 0 ? (
                <h2 className="text-white leading-tight">
                  {caption.text}{" "}
                  <span style={{ color: stats[caption.statIndex].color }}>
                    {stats[caption.statIndex].value}
                  </span>
                  {caption.suffix && ` ${caption.suffix}`}
                </h2>
              ) : (
                <div>
                  <h2 className="text-white leading-tight mb-4">
                    In 1990, a house cost <span className="font-black">4x</span> the average salary.
                  </h2>
                  <h2 className="text-white leading-tight">
                    Today, it&apos;s <span className="font-black">12.5x</span>
                  </h2>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Overlapping squares */}
      {[...stats].reverse().map((stat, reverseIndex) => {
        const index = stats.length - 1 - reverseIndex;
        return (
          <div
            key={stat.label}
            ref={(el) => {
              squaresRef.current[index] = el;
            }}
            className="absolute bottom-0 right-0 overflow-hidden p-4"
            style={{
              backgroundColor: stat.color,
              zIndex: stats.length - index,
            }}
          >
            <span
              className="font-bold text-[var(--navy)] whitespace-nowrap"
              style={{ fontSize: `clamp(2rem, ${stat.size * 0.2}px, ${stat.size * 0.25}px)` }}
            >
              {stat.label}
            </span>
          </div>
        );
      })}

    </section>
  );
}
