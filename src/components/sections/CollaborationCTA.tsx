import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/AnimationPrimitives";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { profile } from "@/data/portfolio";

export function CollaborationCTA() {
  return (
    <section id="collaboration" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 100% 120% at 60% 50%, hsl(217 91% 60% / 0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 50%, hsl(180 70% 38% / 0.1) 0%, transparent 70%), hsl(var(--card))",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(180_70%_38%/0.4)] to-transparent" />
          </div>

          {/* Dots background */}
          <div className="absolute inset-0 bg-dots opacity-20 dark:opacity-10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 text-center py-20 px-6 border rounded-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-8"
                style={{
                  background: "hsl(180 70% 38% / 0.08)",
                  borderColor: "hsl(180 70% 38% / 0.25)",
                  color: "hsl(180 70% 30%)",
                }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Collaboration
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 max-w-3xl mx-auto leading-tight">
                Let's Build the{" "}
                <span className="text-gradient-primary">Future of Learning</span>{" "}
                Together
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
                I'm actively seeking research collaborations, EdTech partnerships, and conversations
                about the future of physics education. If you're working on something meaningful, let's talk.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  id="cta-contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, hsl(180 70% 35%), hsl(217 91% 55%))" }}
                >
                  <Mail size={16} />
                  Start a Conversation
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                >
                  <MessageSquare size={15} />
                  {profile.email}
                </a>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
