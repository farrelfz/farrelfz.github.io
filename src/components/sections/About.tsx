import { motion } from "framer-motion";
import { profile, coreExpertise } from "@/data/portfolio";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { Atom, Brain, Code2, GraduationCap, MapPin, Sparkles } from "lucide-react";

export function About() {
  return (
    <section id="about" className="section-padding bg-muted/20 border-t border-b">
      <div className="container-max">
        {/* Top narrative: Bio & Conceptual triad */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Bio & Narrative */}
          <div className="lg:col-span-7">
            <SectionLabel>About & Background</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 mb-6 leading-tight">
                Grounded in <span className="text-gradient-primary">Physics Education</span>,
                <br />
                Driven by <span className="text-gradient-science">Computational Systems</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Mahasiswa Pendidikan Fisika di Universitas Negeri Jakarta yang membangun fondasi riset dan educational technology berbasis bukti nyata, bukan sekadar minat. Mengembangkan sistem AI-assisted untuk riset pendidikan fisika, platform pembelajaran fisika interaktif, serta knowledge graph miskonsepsi fisika berbasis NLP.
                </p>
                <p>
                  Berpengalaman menyusun materi pelatihan riset siswa (KIR/OPSI), praktik mengajar fisika di jenjang SMA, serta memimpin divisi komunikasi ilmiah pada organisasi riset mahasiswa.
                </p>
                <p>
                  Menggabungkan fondasi Physics Education dengan computational methods, data analysis, dan pengembangan aplikasi untuk membangun solusi pendidikan yang terukur — dengan spesialisasi yang sedang berkembang pada AI for Physics Education Research.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: Conceptual Relationship Triad */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.25} direction="left">
              <div className="p-6 sm:p-7 rounded-3xl border bg-card shadow-sm space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] flex items-center gap-1.5 mb-2">
                  <Sparkles size={14} />
                  Conceptual Framework
                </div>
                
                {profile.conceptualFramework.map((item, idx) => (
                  <div key={item.domain} className="p-4 rounded-2xl bg-muted/50 border border-border/40 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-foreground">{item.domain}</span>
                      <span className="font-mono text-[11px] text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] font-semibold">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom: Core Expertise Matrix (Section 3) */}
        <div>
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Domain Competencies</span>
                <h3 className="h-display text-2xl sm:text-3xl text-foreground mt-1">Core Expertise</h3>
              </div>
              <p className="text-xs text-muted-foreground max-w-sm">
                Kompetensi inti yang saling menguatkan antara metodologi riset sains dan rekayasa teknologi edukasi.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreExpertise.map((exp, index) => (
              <FadeIn key={exp.title} delay={index * 0.08}>
                <div className="h-full p-6 rounded-2xl border bg-card hover:border-[hsl(180_70%_38%/0.4)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl mb-4 shadow-sm">
                      {exp.icon}
                    </div>
                    <h4 className="text-base font-bold text-foreground mb-2 leading-snug">{exp.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
