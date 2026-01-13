import {
  Hero,
  ProblemStatement,
  AffordabilityChart,
  Statistics,
  HousingOptions,
  SupportForm,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemStatement />
      <AffordabilityChart />
      <Statistics />
      <HousingOptions />
      <SupportForm />
    </main>
  );
}
