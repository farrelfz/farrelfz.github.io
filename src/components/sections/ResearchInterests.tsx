import { motion } from "framer-motion";
import { researchInterests } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ResearchInterests() {
  return (
    <section id="research-interests" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Scientific Focus</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                Research <span className="text-gradient-primary">Interests</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
                Fokus riset terapan di persimpangan antara teori perubahan konseptual fisika, penalaran semantik AI, dan penambangan literatur ilmiah komputasional.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] hover:underline"
            >
              Explore Full Research Profile <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchInterests.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`h-full p-6 sm:p-7 rounded-3xl border bg-gradient-to-br ${item.color} ${item.borderColor} flex flex-col justify-between shadow-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/80 border text-foreground/80">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2.5 leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Topics / Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                  {item.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-background/80 text-foreground/80 border border-border/60"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
