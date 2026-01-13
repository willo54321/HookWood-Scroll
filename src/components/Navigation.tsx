"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#why-this-matters", label: "Why It Matters" },
    { href: "#the-numbers", label: "The Numbers" },
    { href: "#what-you-get", label: "What You Get" },
    { href: "#support-form", label: "Have Your Say" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-[var(--green)]">
          Hookwood
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[var(--text-dark)] hover:text-[var(--green)]"
                  : "text-[var(--text-dark)] hover:text-[var(--green)]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#support-form"
            className="bg-[var(--green)] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--green-light)] transition-colors"
          >
            Register Support
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-[var(--text-dark)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-4">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[var(--text-dark)] hover:text-[var(--green)] font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#support-form"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-[var(--green)] text-white px-5 py-3 rounded-full text-center font-semibold hover:bg-[var(--green-light)] transition-colors"
            >
              Register Support
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
