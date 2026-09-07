import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects, secondaryProjects } from "@/data/portfolio";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { ArrowRight, ExternalLink, GitBranch, Github, Layers, Sparkles } from "lucide-react";

const ProjectsPage = () => {
  useEffect(() => {
    document.title = "Projects & Systems — Muhamad Farrel Dava Fauzan";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-hero-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-15 pointer-events-none" />
          <div className="container-max relative z-10">
            <FadeIn>
              <div className="label-science mb-6 w-fit">🔬 Systems & Engineering</div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight">
                Research Systems & <br />
                <span className="text-gradient-science">Educational Platforms</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Koleksi sistem komputasional, knowledge graph miskonsepsi fisika, analitik diskursus sains publik, serta platform pembelajaran interaktif berbasis riset.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Flagship Projects Section */}
        <section className="section-padding border-t">
          <div className="container-max">
            <div className="mb-10">
              <SectionLabel>Core Implementations</SectionLabel>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                Flagship Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl border bg-card p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted border text-muted-foreground">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-muted-foreground">{project.year}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-1 leading-snug">
                      {project.title}
                    </h3>
                    <div className="text-xs font-semibold text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] mb-3">
                      {project.subtitle}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    <div className="space-y-2 text-xs text-muted-foreground mb-6">
                      <div>
                        <strong className="text-foreground">Problem:</strong> {project.problem}
                      </div>
                      <div>
                        <strong className="text-foreground">Approach:</strong> {project.approach}
                      </div>
                    </div>

                    {project.metrics && (
                      <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/50 mb-6">
                        <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-foreground mb-1.5 flex items-center gap-1">
                          <Sparkles size={12} className="text-amber-500" /> Evidence & Metrics:
                        </div>
                        <ul className="grid grid-cols-1 gap-1 text-[11px] text-muted-foreground">
                          {project.metrics.map((m) => (
                            <li key={m} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[hsl(180_70%_38%)]" />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {"note" in project && project.note && (
                      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 mb-6 italic">
                        * {project.note}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border/60 mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground border border-border/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-[hsl(180_70%_38%)] transition-colors group"
                      >
                        <Layers size={13} />
                        View Full Case Study
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-all"
                        >
                          <Github size={13} />
                          Repository
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 28: Supporting & Secondary Repositories */}
            <div>
              <div className="mb-8">
                <SectionLabel>Explorations & Supporting Tools</SectionLabel>
                <h3 className="h-display text-2xl sm:text-3xl text-foreground mt-1">
                  Secondary & Exploratory Repositories
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Repositori terverifikasi untuk pengolahan teks edukatif, modul data science, dan alat bantu fasilitasi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {secondaryProjects.map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl border bg-card flex flex-col justify-between hover:border-[hsl(180_70%_38%/0.4)] transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-base text-foreground">{item.title}</h4>
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github size={15} />
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted text-muted-foreground border border-border/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
