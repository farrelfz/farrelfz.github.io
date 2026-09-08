import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { FlaskConical, ExternalLink, Github, ArrowRight } from "lucide-react";
import { PhysicsPlayground } from "@/components/sections/PhysicsPlayground";

const LaboratoryPage = () => {
  useEffect(() => {
    document.title = "Laboratory — Farrel Dava | Virtual Physics Labs";
  }, []);

  const virtualLabs = projects.filter(
    (p) =>
      p.category.toLowerCase().includes("simulation") ||
      p.tags.some((t) => t.toLowerCase().includes("simulation") || t.toLowerCase().includes("virtual lab"))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-hero-light">
          <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20 pointer-events-none" />
          <div className="container-max relative z-10">
            <FadeIn>
              <div className="label-primary mb-6 w-fit flex items-center gap-1.5">
                <FlaskConical size={12} />
                Virtual Laboratory
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="h-display text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6 max-w-4xl leading-tight">
                Simulating the <span className="text-gradient-primary">Physical World</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
                High-fidelity physics simulations designed for deep conceptual understanding. 
                These virtual laboratories recreate authentic scientific practice with realistic measurement noise, 
                uncertainty, and exploratory autonomy.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Labs Grid */}
        <section className="section-padding border-t">
          <div className="container-max">
            <SectionLabel>Active Simulations</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2 mb-10">
                Explore the Labs
              </h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {virtualLabs.map((lab) => (
                <StaggerItem key={lab.id}>
                  <div className="group flex flex-col h-full rounded-3xl overflow-hidden border bg-card hover:shadow-xl transition-all duration-300">
                    {/* Visual Placeholder / Banner */}
                    <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${lab.color}`}>
                      <div className="absolute inset-0 bg-grid opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-5xl opacity-80 mix-blend-overlay font-display font-bold tracking-tighter">
                           {lab.title}
                         </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-1 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background border shadow-sm">
                          {lab.category}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{lab.year}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[hsl(180_70%_40%)] transition-colors">
                        {lab.title}
                      </h3>
                      <p className="text-sm font-medium text-foreground mb-4">{lab.subtitle}</p>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                        {lab.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-border">
                        {lab.demoUrl && (
                          <a href={lab.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[hsl(180_70%_35%)] hover:bg-[hsl(180_70%_30%)] transition-colors">
                            <ExternalLink size={14} /> Launch Lab
                          </a>
                        )}
                        <Link to={`/projects/${lab.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border text-foreground bg-card hover:bg-muted transition-colors">
                          <ArrowRight size={14} /> Case Study
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Live Interactive Physics Playground */}
        <PhysicsPlayground />
      </main>
      <Footer />
    </div>
  );
};

export default LaboratoryPage;
