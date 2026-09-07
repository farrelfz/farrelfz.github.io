import { motion } from "framer-motion";
import { experiences, achievements } from "@/data/portfolio";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { Award, BookOpen, GraduationCap, Trophy, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-muted/10 border-t">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Teaching, Training & Leadership</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                Experience & <span className="text-gradient-science">Achievements</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
                Pengalaman nyata dalam melatih metodologi riset siswa, praktik pengajaran fisika di sekolah, dan kepemimpinan komunikasi riset ilmiah.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="left">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] hover:underline whitespace-nowrap"
            >
              View Full Details
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Roles Grid (Section 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-7 rounded-3xl border bg-card shadow-sm flex flex-col justify-between hover:border-[hsl(180_70%_38%/0.4)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{exp.icon}</span>
                  <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1 leading-snug">{exp.role}</h3>
                <div className="text-xs font-semibold text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] mb-3">
                  {exp.organization}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                  {exp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
                {exp.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted text-muted-foreground border border-border/50">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Achievements (Section 6) */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recognition</span>
            <h3 className="h-display text-2xl font-bold text-foreground mt-1">Selected Achievements</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-5 rounded-2xl border bg-card/60 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{ach.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {ach.level}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{ach.year}</span>
                  </div>
                  <div className="text-sm font-bold text-foreground leading-tight">{ach.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{ach.organizer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
