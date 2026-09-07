import { motion } from "framer-motion";
import { teachingFramework } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { BookOpen, Brain, Layers, Lightbulb } from "lucide-react";

const icons = [BookOpen, Brain, Layers, Lightbulb];

export function Teaching() {
  return (
    <section id="teaching" className="section-padding bg-muted/20">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-center">
          {/* Left: content */}
          <div className="lg:col-span-2">
            <SectionLabel>Pedagogy</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-4xl sm:text-5xl text-foreground mt-2 mb-5 leading-tight">
                How I{" "}
                <span className="text-gradient-science">Teach</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                My teaching practice is built on four evidence-based frameworks that collectively
                create learning environments where students build deep, transferable understanding
                — not surface-level recall.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These frameworks inform every project I develop: from how Conceptra structures
                misconception remediation to how PHYSION and FisikaSeru scaffold interactive simulations.
              </p>
            </FadeIn>
          </div>

          {/* Right: framework cards */}
          <div className="lg:col-span-3">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teachingFramework.map((item, i) => {
                const Icon = icons[i];
                return (
                  <StaggerItem key={item.id}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group p-5 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
                    >
                      {/* Abbr badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white`}
                        >
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <div>
                          <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                            {item.abbr}
                          </div>
                          <div className="text-sm font-bold text-foreground leading-tight">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
