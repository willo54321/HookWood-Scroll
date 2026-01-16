"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const messageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      const percentage = Math.round(progress * 100);

      // Direct DOM updates for smooth performance
      if (fillRef.current) {
        fillRef.current.style.width = `${progress * 100}%`;
      }
      if (edgeRef.current) {
        edgeRef.current.style.left = `${progress * 100}%`;
      }
      // Counter stays fixed on the left
      if (percentRef.current) {
        percentRef.current.textContent = `${percentage}%`;
      }

      // Update message based on progress
      if (messageRef.current) {
        if (percentage >= 95) {
          messageRef.current.textContent = "Sign up! →";
        } else if (percentage >= 75) {
          messageRef.current.textContent = "Almost there...";
        } else if (percentage >= 40) {
          messageRef.current.textContent = "Keep going...";
        } else {
          messageRef.current.textContent = "Scroll to sign up →";
        }
      }

      setHasScrolled(scrollTop > 100);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById("support-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 h-8 transition-opacity duration-500"
      style={{ opacity: hasScrolled ? 1 : 0, zIndex: 9999 }}
    >
      {/* Track */}
      <div className="h-full bg-[var(--navy-light)] w-full relative overflow-hidden">
        {/* Progress fill */}
        <div
          ref={fillRef}
          className="absolute inset-y-0 left-0 bg-teal-400/20 will-change-[width]"
          style={{ width: 0 }}
        />
        <div
          ref={edgeRef}
          className="absolute inset-y-0 w-1 bg-teal-400 will-change-[left]"
          style={{
            left: 0,
            boxShadow: "0 0 15px rgba(20, 184, 166, 0.8), 0 0 30px rgba(20, 184, 166, 0.4)",
          }}
        />

        {/* Percentage counter - fixed on left */}
        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
          <span ref={percentRef} className="text-sm font-bold text-teal-400 tabular-nums">
            0%
          </span>
        </div>

        {/* Dynamic message - clickable */}
        <button
          onClick={scrollToForm}
          className="absolute right-3 inset-y-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span
            ref={messageRef}
            className="text-xs font-medium text-white/80 uppercase tracking-wider"
          >
            Scroll to sign up →
          </span>
        </button>
      </div>
    </div>
  );
}
