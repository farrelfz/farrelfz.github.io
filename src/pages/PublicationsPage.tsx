import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects, profile } from "@/data/portfolio";
import { FadeIn, SectionLabel, StaggerContainer, StaggerItem } from "@/components/ui/AnimationPrimitives";
import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, Sparkles, AlertCircle, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CiteModal, type CitationItem } from "@/components/ui/CiteModal";

const PublicationsPage = () => {
  const [selectedCitation, setSelectedCitation] = useState<CitationItem | null>(null);

  useEffect(() => {
    document.title = "Research & Selected Works — Muhamad Farrel Dava Fauzan";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-hero-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-15 pointer-events-none" />
          <div className="container-max relative z-10">
            <FadeIn>
              <div className="label-research mb-6 w-fit">🔬 Academic & Research Output</div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight">
                Research & <span className="text-gradient-primary">Selected Works</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Kompilasi sistem riset komputasional, pipeline analisis wacana sains, dan repositori pengetahuan pendidikan fisika.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max">
            {/* Academic Integrity Notice */}
            <FadeIn>
              <div className="flex items-start gap-3.5 p-5 rounded-2xl border bg-card/60 text-xs text-muted-foreground mb-10">
                <AlertCircle size={18} className="text-[hsl(180_70%_35%)] flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-foreground font-semibold">Catatan Integritas Akademik:</strong> Publikasi artikel jurnal dan prosiding konferensi saat ini sedang dalam proses penyusunan manuskrip dan penelaahan sejawat (peer-review). Seluruh karya komputasional, dataset, dan arsitektur di bawah ini dapat diverifikasi langsung melalui repositori kode sumber terbuka di GitHub.
                </div>
              </div>
            </FadeIn>

            <StaggerContainer className="flex flex-col gap-6">
              {projects.map((item, i) => (
                <StaggerItem key={item.id}>
                  <div className="p-7 rounded-3xl border bg-card hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{item.year}</span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                        {item.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-1 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs font-medium text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {item.metrics && (
                      <div className="p-3 rounded-xl bg-muted/40 border text-xs text-muted-foreground mb-4">
                        <strong className="text-foreground">Bukti & Metrik Terverifikasi:</strong>
                        <ul className="mt-1 space-y-0.5">
                          {item.metrics.map((m) => (
                            <li key={m}>• {m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="badge-tag text-[10px]">{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/projects/${item.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-[hsl(180_70%_38%)]"
                        >
                          <Layers size={13} /> Arsitektur Sistem
                        </Link>
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-all"
                          >
                            <Github size={13} /> Repositori
                          </a>
                        )}

                        <button
                          onClick={() =>
                            setSelectedCitation({
                              id: item.id,
                              title: item.title,
                              authors: ["Muhamad Farrel Dava Fauzan"],
                              year: item.year,
                              type: "Software / Research Platform",
                              publisher: "Universitas Negeri Jakarta",
                              url: item.githubUrl || "https://github.com/farrelfz",
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-primary/10 hover:bg-primary/20 text-xs font-semibold text-primary transition-all shadow-sm"
                          title="Generate Sitasi Akademik (BibTeX / APA / IEEE)"
                        >
                          <Quote size={12} /> Sitasi
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Academic Citation Modal */}
        <CiteModal
          open={!!selectedCitation}
          onOpenChange={(open) => !open && setSelectedCitation(null)}
          citation={selectedCitation}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PublicationsPage;
