import {
  Hero,
  ProblemStatement,
  AffordabilityChart,
  Statistics,
  HousingOptions,
  SupportForm,
  Footer,
} from "@/components/sections";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Hero />
      <ProblemStatement />
      <AffordabilityChart />
      <Statistics />
      <HousingOptions />
      <SupportForm />
      <Footer />
    </main>
  );
}
