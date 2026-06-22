import Hero from "@/components/layout/Hero";
import LandingContent from "@/components/layout/LandingContent";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LandingContent />
    </div>
  );
}
