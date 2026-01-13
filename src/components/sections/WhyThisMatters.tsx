"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyThisMatters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 bg-[var(--cream-dark)]"
    >
      <div ref={textRef} className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-dark)] mb-8">
          Why This Matters
        </h2>
        <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-6">
          Average house prices in Mole Valley exceed{" "}
          <span className="font-bold text-[var(--green)]">
            12 times average earnings
          </span>
          . Young professionals working at Gatwick, Crawley, Horley, or Reigate
          struggle to afford homeownership.
        </p>
        <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-6">
          Rental costs continue rising. Housing waiting lists grow longer. This
          development offers potential relief, though planning decisions
          typically favor existing homeowners.
        </p>
        <p className="text-2xl md:text-3xl font-bold text-[var(--green)] mt-12">
          Your voice matters.
        </p>
      </div>
    </section>
  );
}
