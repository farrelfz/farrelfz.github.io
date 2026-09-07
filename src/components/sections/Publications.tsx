import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects, profile } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { ArrowRight, ExternalLink, GitBranch, Github, Layers, Sparkles } from "lucide-react";

export function Publications() {
  return (
    <section id="selected-works" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Academic & Computational Output</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                Research & <span className="text-gradient-primary">Selected Works</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mt-2 leading-relaxed">
                Karya penelitian ilmiah dan sistem komputasional yang sedang aktif dikembangkan. Publikasi jurnal peer-reviewed formal akan dicantumkan secara berkala setelah proses indeksasi dan penelaahan sejawat selesai.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="left">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] hover:underline whitespace-nowrap"
            >
              Explore Research Profile
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Selected research works list */}
        <StaggerContainer className="flex flex-col gap-4">
          {projects.map((proj, i) => (
            <StaggerItem key={proj.id}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group p-6 sm:p-7 rounded-3xl border bg-card hover:border-[hsl(180_70%_38%/0.4)] hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-muted border flex items-center justify-center text-xs font-mono font-bold text-muted-foreground flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted border text-muted-foreground">
                        {proj.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{proj.year}</span>
                      <span className="text-[10px] font-semibold text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)]">
                        · {proj.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-1 leading-snug group-hover:text-[hsl(180_70%_30%)] dark:group-hover:text-[hsl(180_70%_60%)] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {proj.subtitle} — <span className="italic">{proj.domain}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="badge-tag text-[10px]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                  <Link
                    to={`/projects/${proj.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground bg-muted/60 hover:bg-muted transition-colors"
                  >
                    <Layers size={13} /> Details
                  </Link>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                      title="View GitHub Repository"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
