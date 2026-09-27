import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ContactScene } from "@/components/scenes/ContactScene";
import { EducationScene, CertificationScene } from "@/components/scenes/EducationScene";
import { ExperienceScene } from "@/components/scenes/ExperienceScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { ProjectsScene } from "@/components/scenes/ProjectsScene";
import { SkillsScene } from "@/components/scenes/SkillsScene";
import { FloatingNavigation } from "@/components/navigation/FloatingNavigation";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <AnalyticsProvider />
      <FloatingNavigation />
      <div className="relative">
        <HeroScene />
        <ExperienceScene />
        <SkillsScene />
        <ProjectsScene />
        <EducationScene />
        <CertificationScene />
        <ContactScene />
      </div>
    </main>
  );
}
