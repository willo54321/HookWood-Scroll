export default function StatCallout() {
  return (
    <section className="min-h-[50vh] md:min-h-[60vh] flex items-center justify-center px-6 py-16 bg-[var(--teal)]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl text-[var(--navy)]/70 mb-6">
          In 1990, a house cost
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
          <div className="text-center">
            <span className="text-7xl md:text-9xl font-black text-[var(--navy)]">4x</span>
            <p className="text-sm md:text-base text-[var(--navy)]/60 mt-2">the average salary</p>
          </div>

          <div className="text-4xl md:text-6xl text-[var(--navy)]/30 font-light">→</div>

          <div className="text-center">
            <span className="text-7xl md:text-9xl font-black text-[var(--navy)]">15x</span>
            <p className="text-sm md:text-base text-[var(--navy)]/60 mt-2">today</p>
          </div>
        </div>

        <p className="text-xs text-[var(--navy)]/50">
          Source: ONS House Price Statistics, Land Registry
        </p>
      </div>
    </section>
  );
}
