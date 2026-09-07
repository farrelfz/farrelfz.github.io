import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { writings } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { ArrowRight, Clock, PenLine } from "lucide-react";

export function WritingPreview() {
  return (
    <section id="writing" className="section-padding bg-muted/20 border-t">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Perspectives & Essays</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2 leading-tight">
                Writing & <span className="h-editorial italic text-gradient-warm">Perspectives</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl leading-relaxed">
                Pemikiran kritis mengenai perubahan konseptual fisika, etika epistemik AI dalam penelitian, dan dinamika komunikasi sains publik.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} direction="left">
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] hover:underline whitespace-nowrap"
            >
              View All Articles
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {writings.map((article) => (
            <StaggerItem key={article.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl border bg-card hover:shadow-lg hover:border-[hsl(180_70%_38%/0.4)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted border text-muted-foreground">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                      <Clock size={11} /> {article.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-[hsl(180_70%_35%)] dark:group-hover:text-[hsl(180_70%_55%)] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
                  <span className="text-xs font-mono text-muted-foreground">{article.date}</span>
                  <Link
                    to={`/writing/${article.slug}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-[hsl(180_70%_38%)] transition-colors group/link"
                  >
                    <PenLine size={13} />
                    Read Article
                    <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
