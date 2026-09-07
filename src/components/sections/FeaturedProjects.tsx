import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { ArrowRight, ExternalLink, GitBranch, Github, Layers, Sparkles } from "lucide-react";

const statusBadgeStyles: Record<string, string> = {
  "Active Development": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Designed / In Development": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "In Development": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

export function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding bg-muted/20 border-t">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Flagship Systems & Research</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2">
                Flagship <span className="text-gradient-science">Projects</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mt-2 leading-relaxed">
                Sistem perangkat lunak riset, knowledge graph, analitik diskursus ilmiah, dan platform pembelajaran fisika interaktif berbasis bukti empiris.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="left">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] hover:underline whitespace-nowrap"
            >
              View Full Architecture & Projects
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Projects grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full flex flex-col justify-between rounded-3xl border bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[hsl(180_70%_38%/0.4)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted border text-muted-foreground">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeStyles[project.status] || "bg-muted text-muted-foreground"}`}>
              {project.status}
            </span>
            <span className="text-xs font-mono font-bold text-muted-foreground">{project.year}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 leading-snug">
          {project.title}
        </h3>
        <div className="text-xs font-semibold text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] mb-3">
          {project.subtitle}
        </div>
        
        <div className="text-[11px] font-mono text-muted-foreground mb-4 pb-3 border-b border-border/60">
          <strong className="text-foreground/80">Domain:</strong> {project.domain}
        </div>

        {/* Problem & Approach */}
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed mb-6">
          <p>
            <strong className="text-foreground font-semibold">Problem:</strong> {project.problem}
          </p>
          <p>
            <strong className="text-foreground font-semibold">Approach:</strong> {project.approach}
          </p>
        </div>

        {/* Verified Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/50 mb-6">
            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-foreground mb-1.5 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" /> Key Evidence & Metrics:
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

        {/* Disclaimer / Note if designed */}
        {"note" in project && project.note && (
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 mb-6 italic leading-relaxed">
            * {project.note}
          </div>
        )}
      </div>

      {/* Bottom Tech & Links */}
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
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-[hsl(180_70%_38%)] transition-colors group/link"
          >
            <Layers size={13} />
            System Architecture
            <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
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
    </motion.div>
  );
}
