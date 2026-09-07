import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { writings } from "@/data/portfolio";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { ArrowRight, Clock, PenLine } from "lucide-react";

const categories = ["All", ...Array.from(new Set(writings.map((w) => w.category)))];

const WritingPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Writing & Perspectives — Muhamad Farrel Dava Fauzan";
  }, []);

  const filtered = activeCategory === "All"
    ? writings
    : writings.filter((w) => w.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-hero-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-15 pointer-events-none" />
          <div className="container-max relative z-10">
            <FadeIn>
              <div className="label-research mb-6 w-fit flex items-center gap-1.5">
                <PenLine size={12} />
                Critical Perspectives & Essays
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight">
                Writing & <span className="text-gradient-warm">Perspectives</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Tulisan konseptual, analisis pedagogi, dan catatan teknis di seputar pendidikan fisika, penerapan kecerdasan buatan, dan komunikasi sains.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Filter & Articles */}
        <section className="section-padding border-t">
          <div className="container-max">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-8 rounded-3xl border bg-card flex flex-col justify-between hover:shadow-lg hover:border-[hsl(180_70%_38%/0.4)] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted border text-muted-foreground">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <Clock size={11} /> {item.readingTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3 leading-snug">
                      {item.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                    <Link
                      to={`/writing/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-[hsl(180_70%_38%)] transition-colors group"
                    >
                      Baca Selengkapnya
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WritingPage;
