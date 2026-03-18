"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormInView, setIsFormInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.5);

      // Hide when form is in view
      const formElement = document.getElementById("support-form");
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const isInView = formRect.top < window.innerHeight && formRect.bottom > 0;
        setIsFormInView(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show if form is in view or not scrolled enough
  if (!isVisible || isFormInView) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[var(--navy)] border-t border-[var(--teal)]/20 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              Support 446 new homes
            </p>
            <p className="text-[var(--text-muted)] text-xs">
              Including 200 affordable homes
            </p>
          </div>
          <a
            href="#support-form"
            className="shrink-0 bg-[var(--teal)] text-[var(--navy)] px-5 py-2.5 text-sm font-bold rounded-full hover:bg-[var(--teal-light)] transition-colors"
          >
            Add Your Name
          </a>
        </div>
      </div>
    </div>
  );
}
