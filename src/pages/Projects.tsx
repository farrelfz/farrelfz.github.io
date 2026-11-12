import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects, secondaryProjects } from "@/data/portfolio";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe, Microscope } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

const ProjectsPage = () => {
  useEffect(() => {
    document.title = "Projects & Systems — Muhamad Farrel Dava Fauzan";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHeader
          className="pt-32 pb-16 bg-hero-light relative overflow-hidden"
          gridClass="absolute inset-0 bg-grid opacity-30 dark:opacity-15 pointer-events-none"
          labelClass="label-science"
          labelIcon={Microscope}
          labelIconAriaHidden
          label="Systems & Engineering"
          titleClass="h-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5 leading-tight"
          title={<>Research Systems & <br />
            <span className="text-accent-text">Educational Platforms</span></>}
          leadClass="text-base text-muted-foreground max-w-2xl leading-relaxed"
          lead="Koleksi sistem komputasional, knowledge graph miskonsepsi fisika, analitik diskursus sains publik, serta platform pembelajaran interaktif berbasis riset."
        />

        {/* Flagship Projects Section */}
        <section className="section-padding border-t">
          <div className="container-max">
            <div className="mb-10">
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2">
                Flagship Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="full" />
              ))}
            </div>

            {/* Section 28: Supporting & Secondary Repositories */}
            <div>
              <div className="mb-8">
                <h3 className="h-display text-2xl sm:text-3xl text-foreground mt-1">
                  Secondary & Exploratory Repositories
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Repositori terverifikasi untuk pengolahan teks edukatif, modul data science, dan alat bantu fasilitasi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {secondaryProjects.map((item) => (
                  <Card key={item.title} className="p-6 rounded-2xl flex flex-col justify-between hover:border-accent/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-base text-foreground">{item.title}</h4>
                        <div className="flex items-center gap-1">
                          {item.siteUrl && (
                            <a
                              href={item.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${item.title} live site`}
                              className="-m-2 flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Globe size={16} aria-hidden="true" />
                            </a>
                          )}
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.title} repository on GitHub`}
                            className="-m-2 flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github size={16} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                      {item.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </Card>
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

export default ProjectsPage;