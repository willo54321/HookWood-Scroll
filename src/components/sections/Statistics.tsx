"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  label: string;
  description: string;
}

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats: Stat[] = [
    {
      value: "45%",
      label: "Affordable Housing",
      description:
        "Our planning application commits to 45% affordable—well above the typical 30% requirement",
    },
    {
      value: "200",
      label: "Affordable Homes",
      description:
        "Our application includes 200 shared ownership and affordable rent homes for local people",
    },
    {
      value: "2027",
      label: "Target Completion",
      description: "If our planning application is approved, homes could be ready by 2027",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const contents = contentRef.current.filter(Boolean);
      if (contents.length === 0) return;

      const blurAmount = 30;

      // Set initial states - ALL stats start hidden
      contents.forEach((content) => {
        gsap.set(content, { opacity: 0, filter: `blur(${blurAmount}px)` });
      });

      // First stat fades in as section enters viewport (before pinning)
      gsap.to(contents[0], {
        opacity: 1,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          end: "top 50%",
          scrub: 0.2,
        },
      });

      // Create timeline with longer scroll distance for more hold time
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${stats.length * 150}%`,
          pin: true,
          scrub: 0.5,
        },
      });

      // Animate between stats with shorter transition periods
      contents.forEach((content, index) => {
        if (index < contents.length - 1) {
          const nextContent = contents[index + 1];
          // Each stat gets equal time, transitions happen at the boundaries
          const transitionStart = (index + 0.8) / stats.length;

          // Fade out current (quick transition)
          tl.to(
            content,
            {
              opacity: 0,
              filter: `blur(${blurAmount}px)`,
              duration: 0.15,
            },
            transitionStart
          );

          // Fade in next (quick transition)
          tl.to(
            nextContent,
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.15,
            },
            transitionStart + 0.05
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-[#0d9488] overflow-hidden relative"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => {
            contentRef.current[index] = el;
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center px-6 max-w-2xl mx-auto">
            {/* Big number */}
            <div className="text-[7rem] md:text-[10rem] lg:text-[14rem] font-bold text-[var(--navy)] leading-none mb-6">
              {stat.value}
            </div>

            {/* Label */}
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-4">
              {stat.label}
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-[var(--navy)]/70 max-w-md mx-auto">
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
