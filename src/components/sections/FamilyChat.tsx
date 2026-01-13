"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Message {
  id: string;
  sender: string;
  text: string;
  highlight?: string;
}

export default function FamilyChat() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = [
    {
      id: "1",
      sender: "Emma",
      text: "Tom proposed!! But we can't afford anywhere within",
      highlight: "40 miles of home",
    },
    {
      id: "2",
      sender: "Grandma",
      text: "40 miles?? We bought our house for",
      highlight: "£8,000 in 1972",
    },
    {
      id: "3",
      sender: "Dad",
      text: "Mum, that house is worth £450,000 now. Emma needs to earn",
      highlight: "£100k+ for a mortgage",
    },
    {
      id: "4",
      sender: "James",
      text: "My rent just hit £1,400/month for a mouldy flat share",
      highlight: "Can't save anything",
    },
    {
      id: "5",
      sender: "Mum",
      text: "We could sell and downsize to help with deposits...",
    },
    {
      id: "6",
      sender: "Emma",
      text: "NO! You shouldn't lose your home because there's",
      highlight: "nowhere affordable for us",
    },
    {
      id: "7",
      sender: "James",
      text: "We need to support building",
      highlight: "new affordable homes",
    },
    {
      id: "8",
      sender: "Grandma",
      text: "Send it. Families should",
      highlight: "stay together",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const messageEls = messagesRef.current.filter(Boolean);

      // Set initial state
      messageEls.forEach((msg) => {
        gsap.set(msg, { opacity: 0, y: 40 });
      });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Animate each message
      messageEls.forEach((msg, index) => {
        const start = index / (messageEls.length + 1);
        tl.to(msg, { opacity: 1, y: 0, duration: 0.08 }, start);
      });

      // Show CTA at the end
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.1 }, 0.92);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[var(--navy)] flex items-center justify-center px-6"
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--teal)] text-sm font-medium tracking-wide uppercase mb-2">
            Family Group Chat
          </p>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              ref={(el) => {
                messagesRef.current[index] = el;
              }}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  index % 2 === 0
                    ? "bg-[var(--navy-light)] rounded-bl-sm"
                    : "bg-[var(--teal)]/10 rounded-br-sm"
                }`}
              >
                <p className="text-[var(--teal)] text-xs font-semibold mb-1">
                  {msg.sender}
                </p>
                <p className="text-white/90 text-base leading-relaxed">
                  {msg.text}
                  {msg.highlight && (
                    <>
                      {" "}
                      <span className="text-[var(--teal)] font-semibold">
                        {msg.highlight}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <p className="text-white/60 text-lg mb-6">
            Keep families together
          </p>
          <a
            href="#support-form"
            className="inline-block bg-[var(--teal)] hover:bg-[var(--teal-light)] text-[var(--navy)] font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Add Your Support
          </a>
        </div>
      </div>
    </section>
  );
}
