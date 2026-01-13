"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatHappensNext() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "01",
      title: "You Register",
      description: "Complete the support form above with your details",
    },
    {
      number: "02",
      title: "We Email You",
      description:
        "Receive guidance on submitting formal responses to the council",
    },
    {
      number: "03",
      title: "Council Reviews",
      description:
        "Planning officers and councillors review all comments during decision-making",
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[var(--navy)]">
      <div ref={contentRef} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            What Happens Next
          </h2>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
            After registration, you'll receive guidance on how to make your
            voice heard in the planning process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-20 h-20 bg-[var(--navy-light)] border border-[var(--slate)] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[var(--teal)]">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-[var(--text-muted)]">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/our-proposals"
            className="inline-flex items-center gap-2 text-[var(--teal)] font-semibold hover:text-[var(--teal-light)] transition-colors text-lg"
          >
            View the consultation materials
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
