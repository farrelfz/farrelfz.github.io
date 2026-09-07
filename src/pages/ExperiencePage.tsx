import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { experiences, achievements } from "@/data/portfolio";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { Award, BookOpen, CheckCircle, GraduationCap, Trophy, Users } from "lucide-react";

const ExperiencePage = () => {
  useEffect(() => {
    document.title = "Experience & Achievements — Muhamad Farrel Dava Fauzan";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-hero-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-15 pointer-events-none" />
          <div className="container-max relative z-10">
            <FadeIn>
              <div className="label-science mb-6 w-fit flex items-center gap-1.5">
                <GraduationCap size={13} />
                Academic & Educational Roles
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight">
                Professional Experience & <br />
                <span className="text-gradient-science">Selected Achievements</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Peran nyata dalam memfasilitasi riset siswa (KIR/OPSI), pengajaran fisika terintegrasi STEM di sekolah menengah, dan kepemimpinan komunikasi ilmiah mahasiswa.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 4: Professional Experience */}
        <section className="section-padding border-t">
          <div className="container-max">
            <div className="mb-10">
              <SectionLabel>Verified Experience</SectionLabel>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                Professional & Academic Roles
              </h2>
            </div>

            <div className="space-y-8 mb-20">
              {experiences.map((exp, idx) => (
                <FadeIn key={exp.id} delay={idx * 0.1}>
                  <div className="p-8 sm:p-10 rounded-3xl border bg-card shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-5">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{exp.icon}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground leading-tight">{exp.role}</h3>
                            <div className="text-sm font-semibold text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] mt-0.5">
                              {exp.organization}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full border bg-muted/70 text-foreground self-start sm:self-center">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    <div>
                      <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
                        Key Responsibilities & Deliverables:
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {exp.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 text-xs text-muted-foreground">
                            <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="badge-tag text-[10px] font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Section 6: Selected Achievements */}
            <div>
              <div className="mb-8">
                <SectionLabel>Competition & Funding Recognition</SectionLabel>
                <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                  Selected Achievements
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Pengakuan dan pendanaan kompetisi ilmiah tingkat nasional maupun universitas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {achievements.map((ach) => (
                  <div key={ach.id} className="p-6 rounded-2xl border bg-card flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{ach.icon}</span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-muted-foreground border">
                          {ach.level}
                        </span>
                        <span className="text-xs font-mono font-bold text-muted-foreground">{ach.year}</span>
                      </div>
                      <h4 className="font-bold text-base text-foreground leading-snug">{ach.title}</h4>
                      <p className="text-xs text-muted-foreground">{ach.organizer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
