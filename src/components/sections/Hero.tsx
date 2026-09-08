import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, Github, Instagram, Mail, Sparkles, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

const rotatingWords = [
  "Misconception Research",
  "Virtual Laboratories",
  "Applied AI & NLP",
  "Interactive Simulations",
  "Evidence-Based EdTech",
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-flex overflow-hidden align-bottom pb-1 font-bold"
      style={{ minWidth: "16ch", height: "1.4em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-primary absolute inset-0 whitespace-nowrap"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
              className="text-base sm:text-lg font-bold text-foreground/90 mb-3 flex flex-wrap items-center gap-2"
            >
              <span className="text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)]">Physics Education Researcher</span>
              <span className="text-muted-foreground/50 hidden sm:inline">·</span>
              <span className="text-blue-600 dark:text-blue-400">EdTech Developer</span>
              <span className="text-muted-foreground/50 hidden sm:inline">·</span>
              <span className="text-indigo-600 dark:text-indigo-400">AI for Education</span>
            </motion.div>

            {/* Dynamic Rotating Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg font-medium text-foreground/80 mb-4 flex items-center gap-2 flex-wrap"
            >
              <span className="text-muted-foreground">Building learning through</span>
              <RotatingWord />
            </motion.div>

            {/* Supporting statement */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-7"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 mb-6"
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

            {/* Authentic Stat Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="pt-6 border-t border-border/60 mt-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                <div className="flex flex-col items-center p-3 rounded-2xl border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-sm mb-1">🔬</div>
                  <span className="text-xl font-black text-foreground tracking-tight">17,000+</span>
                  <span className="text-[10px] text-muted-foreground font-semibold text-center">Papers Synthesized</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm mb-1">💬</div>
                  <span className="text-xl font-black text-foreground tracking-tight">200k+</span>
                  <span className="text-[10px] text-muted-foreground font-semibold text-center">Comments Mined</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-sm mb-1">⚛️</div>
                  <span className="text-xl font-black text-foreground tracking-tight">1,002</span>
                  <span className="text-[10px] text-muted-foreground font-semibold text-center">Misconceptions Mapped</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-sm mb-1">⚙️</div>
                  <span className="text-xl font-black text-foreground tracking-tight">5</span>
                  <span className="text-[10px] text-muted-foreground font-semibold text-center">Flagship Platforms</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Academic profile card with FLOATING CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Background ambient glow */}
              <div
                className="absolute -inset-6 rounded-full blur-3xl opacity-25 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, hsl(180 70% 38%) 60%, transparent 100%)" }}
              />

              {/* Decorative dashed rings */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-[hsl(217_91%_60%/0.25)] opacity-60 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-2 border-dashed border-[hsl(180_70%_38%/0.25)] opacity-60 pointer-events-none" />

              {/* FLOATING CARD 1 — Top Left: Physics Education */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 sm:-left-8 top-8 z-20 px-3.5 py-2.5 rounded-2xl border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-sm">
                    ⚛️
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground font-medium">Physics Education</div>
                    <div className="text-xs font-bold text-foreground">UNJ Jakarta</div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2 — Bottom Right: Open to Collaborate */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -right-6 sm:-right-8 bottom-12 z-20 px-3.5 py-2.5 rounded-2xl border bg-card/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Open to Collaborate</div>
                    <div className="text-[10px] text-muted-foreground">Research & EdTech</div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 3 — Top Right: AI for Education */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-3 sm:-right-5 -top-3 z-20 px-3 py-1.5 rounded-xl border bg-card/95 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🧠</span>
                  <span className="text-[11px] font-bold text-foreground">AI for Education</span>
                </div>
              </motion.div>

              {/* FLOATING CARD 4 — Bottom Left: Interactive Sim Engine */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
                className="absolute -left-3 sm:-left-5 -bottom-3 z-20 px-3 py-1.5 rounded-xl border bg-card/95 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">⚡</span>
                  <span className="text-[11px] font-bold text-foreground">Conceptra · PHYSION</span>
                </div>
              </motion.div>

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border bg-card shadow-2xl p-6 z-10">
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
