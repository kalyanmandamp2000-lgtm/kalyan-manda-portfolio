import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";

export default function Home() {
  return (
    <>
      <AnalyticsProvider />
      <PortfolioExperience />
    </>
  );
}
