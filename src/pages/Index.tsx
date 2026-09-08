import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Philosophy } from "@/components/sections/Philosophy";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ResearchInterests } from "@/components/sections/ResearchInterests";
import { Publications } from "@/components/sections/Publications";
import { WritingPreview } from "@/components/sections/WritingPreview";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { PhysicsPlayground } from "@/components/sections/PhysicsPlayground";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/data/portfolio";

const Index = () => {
  useEffect(() => {
    document.title = siteConfig.title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = siteConfig.description;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <ResearchInterests />
        <FeaturedProjects />
        <PhysicsPlayground />
        <Publications />
        <WritingPreview />
        <TimelineSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
