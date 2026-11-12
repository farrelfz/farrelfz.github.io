import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight, Github, Globe, Layers, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";

/** Status → badge treatment. Categorical colour is intentional here (it encodes
 *  project lifecycle stage), so raw palette classes are used deliberately. */
const STATUS_STYLES: Record<string, string> = {
  "Active Development": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Designed / In Development":
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "In Development": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

interface ProjectCardProps {
  project: Project;
  /** `featured` shows the domain line + status badge; `full` shows the summary. */
  variant?: "featured" | "full";
}

/**
 * Single source of truth for project cards, shared by the homepage
 * FeaturedProjects section and the /projects page.
 */
export function ProjectCard({ project, variant = "featured" }: ProjectCardProps) {
  return (
    <m.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
      <Card className="h-full flex flex-col justify-between rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden">
        <CardHeader className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <Badge variant="secondary" className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              {project.category}
            </Badge>
            <div className="flex items-center gap-2">
              {variant === "featured" && (
                <span
                  className={cn(
                    "text-[10px] font-semibold px-2.5 py-0.5 rounded-full border",
                    STATUS_STYLES[project.status] || "bg-muted text-muted-foreground"
                  )}
                >
                  {project.status}
                </span>
              )}
              <span className="text-xs font-bold text-muted-foreground">{project.year}</span>
            </div>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground mb-1 leading-snug">
            {project.title}
          </CardTitle>
          <CardDescription className="text-xs font-semibold text-accent-text mb-3">
            {project.subtitle}
          </CardDescription>

          {variant === "featured" ? (
            <div className="text-[11px] text-muted-foreground mb-4 pb-3 border-b border-border/60">
              <strong className="text-foreground/80">Domain:</strong> {project.domain}
            </div>
          ) : null}
        </CardHeader>

        <CardContent className="p-0">
          {variant === "full" && (
            <p className="text-xs text-muted-foreground leading-relaxed mb-5">{project.summary}</p>
          )}

          <div className="flex flex-col gap-3 text-xs text-muted-foreground leading-relaxed mb-6">
            <p>
              <strong className="text-foreground font-semibold">Problem:</strong> {project.problem}
            </p>
            <p>
              <strong className="text-foreground font-semibold">Approach:</strong> {project.approach}
            </p>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/50 mb-6">
              <div className="text-[10px] uppercase tracking-wider font-bold text-foreground mb-1.5 flex items-center gap-1">
                <Sparkles size={12} className="text-accent-text" aria-hidden="true" /> Evidence &amp; Metrics:
              </div>
              <ul className="grid grid-cols-1 gap-1 text-[11px] text-muted-foreground">
                {project.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-accent" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.note && (
            <div className="p-3 rounded-xl bg-muted/50 border border-border/60 text-[11px] text-foreground/75 mb-6 italic leading-relaxed">
              * {project.note}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-stretch p-0 pt-4 border-t border-border/60 mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[10px] font-medium">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors group/link"
            >
              <Layers size={13} aria-hidden="true" />
              {variant === "featured" ? "System Architecture" : "View Full Case Study"}
              <ArrowRight
                size={12}
                aria-hidden="true"
                className="transition-transform group-hover/link:translate-x-0.5"
              />
            </Link>

            {project.siteUrl && (
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live application`}
                className="inline-flex h-11 items-center gap-1.5 px-4 rounded-xl border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-all"
              >
                <Globe size={13} aria-hidden="true" />
                Live App
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository on GitHub`}
                className="inline-flex h-11 items-center gap-1.5 px-4 rounded-xl border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-all"
              >
                <Github size={13} aria-hidden="true" />
                Repository
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </m.div>
  );
}
