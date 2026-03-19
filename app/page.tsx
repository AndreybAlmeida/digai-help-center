import AIChatBanner from "@/components/home/AIChatBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import HeroSearch from "@/components/home/HeroSearch";
import OnboardingTeaser from "@/components/home/OnboardingTeaser";
import QuickLinks from "@/components/home/QuickLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central de Ajuda — DigAI",
  description: "Documentação, tutoriais e suporte para a plataforma DigAI Talent Intelligence.",
};

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      <HeroSearch />
      <CategoryGrid />
      <QuickLinks />
      <OnboardingTeaser />
      <FeaturedArticles />
      <AIChatBanner />
    </div>
  );
}
