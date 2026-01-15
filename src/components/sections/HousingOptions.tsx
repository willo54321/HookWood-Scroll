"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function OptionCard({ icon, title, description, index }: OptionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group bg-[var(--navy-light)] rounded-3xl p-8 md:p-10 border border-[var(--slate)] hover:border-[var(--teal)] transition-all duration-500 hover:-translate-y-2"
    >
      <div className="w-16 h-16 bg-[var(--teal)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {title}
      </h3>
      <p className="text-[var(--text-muted)] leading-relaxed">{description}</p>
    </div>
  );
}

export default function HousingOptions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const options = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-[var(--navy)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      title: "Shared Ownership",
      description:
        "Purchase a share (typically 25-75%) and pay rent on the remainder. A realistic pathway to homeownership for those who can't afford to buy outright.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-[var(--navy)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Affordable Rent",
      description:
        "Rents capped at 80% of market rate, managed by a housing association. Making quality housing accessible for local families and individuals.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-[var(--navy)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Great Location",
      description:
        "Minutes from Gatwick and Horley with convenient commutes to London, Crawley, and Reigate. Perfect for professionals working in the area.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[var(--navy)]">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            In Our Proposals
          </h2>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
            Multiple pathways to affordable housing:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <OptionCard
              key={option.title}
              icon={option.icon}
              title={option.title}
              description={option.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
