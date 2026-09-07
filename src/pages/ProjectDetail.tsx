import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/AnimationPrimitives";
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch, Github, Layers, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Muhamad Farrel Dava Fauzan`;
    } else {
      navigate("/projects");
    }
  }, [project, navigate]);

  if (!project) return null;

  const currentIdx = projects.findIndex((p) => p.id === id);
  const prev = projects[currentIdx - 1];
  const next = projects[currentIdx + 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-hero-light border-b">
          <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
          <div className="container-narrow relative z-10">
            <FadeIn>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
              >
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
                Back to All Projects
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-muted border text-muted-foreground">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                  {project.status}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 leading-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] font-medium mb-4">
                {project.subtitle}
              </p>
              <div className="text-xs font-mono text-muted-foreground">
                <strong className="text-foreground">Domain:</strong> {project.domain}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-3 mt-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border text-foreground bg-card hover:bg-muted transition-all shadow-sm"
                  >
                    <Github size={14} /> View Verified Repository
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 13: Recommended Case Study Structure */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 flex flex-col gap-10">
                {/* 01 Overview */}
                <FadeIn>
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-mono">01</span>
                      Overview
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </FadeIn>

                {/* 02 Problem */}
                <FadeIn delay={0.1}>
                  <div className="p-6 rounded-2xl border-l-4 bg-rose-500/5 border-rose-500/40">
                    <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                      <Target size={16} className="text-rose-500" />
                      02 Problem Statement
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                </FadeIn>

                {/* 03 System Design & Approach */}
                <FadeIn delay={0.15}>
                  <div className="p-6 rounded-2xl border-l-4 bg-indigo-500/5 border-indigo-500/40">
                    <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                      <Layers size={16} className="text-indigo-500" />
                      03 System Design & Approach
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.approach}
                    </p>
                  </div>
                </FadeIn>

                {/* 04 Evidence & Key Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <FadeIn delay={0.2}>
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-mono">04</span>
                        Evidence & Key Metrics
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                            <Sparkles size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-foreground font-semibold">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* Disclaimer / Notes */}
                {"note" in project && project.note && (
                  <FadeIn delay={0.25}>
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>Methodological Note:</strong> {project.note}
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6">
                <FadeIn direction="left">
                  <div className="p-6 rounded-3xl border bg-card shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3 border-b border-border">
                      Project Metadata
                    </h3>

                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Status</div>
                      <div className="text-xs font-bold text-foreground">{project.status}</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Year</div>
                      <div className="text-xs font-mono font-bold text-foreground">{project.year}</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Domain</div>
                      <div className="text-xs font-semibold text-foreground leading-tight">{project.domain}</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</div>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground border border-border/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.githubUrl && (
                      <div className="pt-3 border-t border-border">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border bg-muted/50 hover:bg-muted text-xs font-bold text-foreground transition-colors"
                        >
                          <Github size={13} />
                          GitHub Repository
                        </a>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Pagination between projects */}
            <div className="mt-16 pt-8 border-t flex items-center justify-between gap-4">
              {prev ? (
                <Link
                  to={`/projects/${prev.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={13} /> Previous: {prev.title}
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  to={`/projects/${next.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next: {next.title} <ArrowRight size={13} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
