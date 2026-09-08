import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { researchInterests, technicalSkills, projects } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { Atom, Brain, Cpu, Database, ExternalLink, FileSearch, GitBranch, Github, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ResearchKnowledgeGraph } from "@/components/sections/ResearchKnowledgeGraph";

const ResearchPage = () => {
  useEffect(() => {
    document.title = "Research — Muhamad Farrel Dava Fauzan | Physics Education Researcher";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-hero-light">
          <div className="absolute inset-0 bg-grid opacity-35 dark:opacity-20 pointer-events-none" />
          <div className="absolute inset-0 opacity-40">
            <ParticleCanvas particleCount={40} interactive={false} />
          </div>
          <div className="container-max relative z-10">
            <FadeIn>
              <div className="label-research mb-6 w-fit flex items-center gap-1.5">
                <Atom size={13} />
                Scientific Framework & Investigations
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 max-w-4xl leading-tight">
                Computational Research for <br />
                <span className="text-gradient-primary">Physics Education</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Membangun pendekatan terukur yang menggabungkan teori perubahan konseptual fisika dengan pemrosesan bahasa alami (NLP), rekayasa knowledge graph, dan sistem AI untuk mempercepat sintesis bukti riset pendidikan.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 7: Three Core Research Pillars */}
        <section className="section-padding border-t bg-card/40">
          <div className="container-max">
            <SectionLabel>Core Focus</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2 mb-10">
                Research Domains
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {researchInterests.map((pillar, i) => (
                <FadeIn key={pillar.id} delay={i * 0.1}>
                  <div className="h-full p-8 rounded-3xl border bg-card shadow-sm flex flex-col justify-between hover:border-[hsl(180_70%_38%/0.4)] transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-3xl">{pillar.icon}</span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-muted/60 text-muted-foreground">
                          {pillar.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{pillar.description}</p>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-foreground/80 mb-2 uppercase tracking-wider">Focus Areas</div>
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.topics.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground border border-border/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Section 30: Conceptual Network */}
        <section className="section-padding border-t">
          <div className="container-max">
            <SectionLabel>Conceptual Architecture</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2 mb-4">
                The Research & Systems Ecosystem
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mb-12 leading-relaxed">
                Bagaimana integrasi antara ranah Pendidikan Fisika, Metode Komputasional, dan EdTech saling menopang dalam riset dan implementasi nyata.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-8 sm:p-10 rounded-3xl border bg-gradient-to-br from-card to-muted/30 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center md:text-left">
                  <div className="p-5 rounded-2xl border bg-background/80 space-y-2">
                    <div className="text-xs font-bold font-mono uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Atom size={14} /> Domain Foundation
                    </div>
                    <div className="font-extrabold text-foreground text-base">Physics Education</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Menyediakan landasan teoritis: teori perubahan konseptual, taksonomi miskonsepsi fisika, dan desain inkuiri terbimbing.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border bg-background/80 space-y-2">
                    <div className="text-xs font-bold font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Cpu size={14} /> Analytical Engines
                    </div>
                    <div className="font-extrabold text-foreground text-base">AI & NLP Methods</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Menyediakan kapabilitas analisis data skala besar: IMRAD parsing, transformer IndoBERT, embedding semantik, dan graph modeling.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border bg-background/80 space-y-2">
                    <div className="text-xs font-bold font-mono uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Layers size={14} /> Learning Environment
                    </div>
                    <div className="font-extrabold text-foreground text-base">Educational Technology</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Mengimplementasikan ruang belajar aktif: alur inkuiri 7-tahap, simulasi Canvas 2D/WebGL, dan alur kerja editorial ilmiah.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/40 border text-xs text-muted-foreground space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <GitBranch size={14} className="text-[hsl(180_70%_35%)]" /> Pemetaan Proyek terhadap Arsitektur:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <li><strong className="text-foreground">Conceptra:</strong> Knowledge Graph Miskonsepsi Fisika (17.755 artikel + OpenAlex audit)</li>
                    <li><strong className="text-foreground">PHYSION / PERC Engine:</strong> AI-assisted research intelligence & IMRAD claim parsing</li>
                    <li><strong className="text-foreground">Kok Bisa? Analytics:</strong> Analisis wacana publik sains (202.429 komentar + IndoBERT)</li>
                    <li><strong className="text-foreground">FisikaSeru 3.0:</strong> Ekosistem belajar fisika interaktif berbasis perubahan konseptual</li>
                    <li><strong className="text-foreground">Risenologi JAMS:</strong> Otomasi komunikasi editorial jurnal berbasis human-in-control</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 30B: Interactive Force-Directed Knowledge Graph */}
        <ResearchKnowledgeGraph />

        {/* Section 8: Technical Skills Matrix */}
        <section className="section-padding border-t bg-muted/10">
          <div className="container-max">
            <SectionLabel>Technical Skills</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2 mb-10">
                Methodology & Tech Stack
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(technicalSkills).map(([key, group]) => (
                <FadeIn key={key}>
                  <div className="p-6 rounded-2xl border bg-card h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground mb-4">{group.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/80 text-foreground border border-border/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;
