"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-[var(--navy)]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Priced out of{" "}
          <span className="text-[var(--teal)]">Surrey?</span>
        </h1>

        <p className="text-xl md:text-2xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
          446 new homes are proposed for Hookwood — 200 of them affordable. Add your name to support the plans.
        </p>

        <a
          href="#support-form"
          className="inline-block bg-[var(--teal)] text-[var(--navy)] px-10 py-5 md:px-12 md:py-6 text-lg md:text-xl font-bold rounded-full hover:bg-[var(--teal-light)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Register Your Support — takes 30 seconds
        </a>
      </div>
    </section>
  );
}
