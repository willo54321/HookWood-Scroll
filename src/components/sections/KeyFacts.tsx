export default function KeyFacts() {
  const facts = [
    { value: "45%", label: "Affordable Housing" },
    { value: "200", label: "Affordable Homes" },
    { value: "2027", label: "Target Completion" },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--navy)]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-[var(--navy-light)] rounded-2xl p-8 text-center border border-[var(--slate)]"
            >
              <div className="text-5xl md:text-6xl font-bold text-[var(--teal)] mb-3">
                {fact.value}
              </div>
              <div className="text-lg text-[var(--text-muted)]">
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
