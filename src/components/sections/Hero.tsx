import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, Github, Instagram, Mail, Sparkles, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-light"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-35 dark:opacity-20 pointer-events-none" />

      {/* Particle system */}
      <div className="absolute inset-0">
        <ParticleCanvas particleCount={60} interactive={true} />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full opacity-20 dark:opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-10 right-10 w-[450px] h-[350px] rounded-full opacity-15 dark:opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(180 70% 38%) 0%, transparent 70%)" }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="container-max relative z-10 pt-28 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border tracking-wide shadow-sm"
                style={{
                  background: "hsl(180 70% 38% / 0.08)",
                  borderColor: "hsl(180 70% 38% / 0.25)",
                  color: "hsl(180 70% 28%)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {profile.institution} · {profile.department}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black tracking-tight text-foreground mb-4 leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)", letterSpacing: "-0.03em" }}
            >
              Muhamad Farrel
              <br />
              <span className="text-gradient-primary">Dava Fauzan</span>
            </motion.h1>

            {/* Exact Professional Positioning */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base sm:text-lg font-bold text-foreground/90 mb-4 flex flex-wrap items-center gap-2"
            >
              <span className="text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)]">Physics Education Researcher</span>
              <span className="text-muted-foreground/50 hidden sm:inline">·</span>
              <span className="text-blue-600 dark:text-blue-400">EdTech Developer</span>
              <span className="text-muted-foreground/50 hidden sm:inline">·</span>
              <span className="text-indigo-600 dark:text-indigo-400">AI for Education</span>
            </motion.div>

            {/* Supporting statement */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Link
                to="/research"
                id="hero-cta-research"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, hsl(217 91% 45%), hsl(180 70% 35%))" }}
              >
                <BookOpen size={16} />
                View Research
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/projects"
                id="hero-cta-projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold border transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted"
                style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))", background: "hsl(var(--card))" }}
              >
                <FlaskConical size={16} />
                View Projects
              </Link>

              <Link
                to="/contact"
                id="hero-cta-contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <Mail size={15} />
                Contact
              </Link>
            </motion.div>

            {/* Verified social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-2 pt-4 border-t border-border/60 text-muted-foreground text-xs"
            >
              <span className="font-semibold text-foreground/80 mr-1">Verified:</span>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-card hover:text-foreground hover:bg-muted transition-colors"
              >
                <Github size={13} />
                github.com/farrelfz
              </a>
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-card hover:text-foreground hover:bg-muted transition-colors"
              >
                <Instagram size={13} />
                @mfarreldavaf
              </a>
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-card hover:text-foreground hover:bg-muted transition-colors"
              >
                <Twitter size={13} />
                X / Twitter
              </a>
            </motion.div>
          </div>

          {/* Right: Academic profile card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 pointer-events-none"
                style={{ background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(180 70% 38%))" }}
              />
              <div className="relative rounded-3xl overflow-hidden border bg-card shadow-2xl p-6">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border mb-5 shadow-inner">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active Researcher
                    </div>
                    <div className="font-bold text-sm leading-tight">{profile.name}</div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground font-medium">Domain</span>
                    <span className="font-bold text-foreground">Physics Education</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground font-medium">Focus</span>
                    <span className="font-bold text-foreground">AI, NLP & Misconceptions</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border/50">
                    <span className="text-muted-foreground font-medium">Affiliation</span>
                    <span className="font-bold text-foreground">UNJ (2022 – Sekarang)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
