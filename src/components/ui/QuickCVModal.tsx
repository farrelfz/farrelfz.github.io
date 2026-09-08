import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profile, coreExpertise, experiences, achievements, projects, skills } from "@/data/portfolio";
import { Printer, Copy, Check, Download, ExternalLink, Mail, MessageCircle, MapPin, GraduationCap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuickCVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickCVModal({ open, onOpenChange }: QuickCVModalProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `${profile.name}
${profile.role}
${profile.institution} — ${profile.department} (${profile.educationPeriod})
Email: ${profile.email} | WhatsApp: +62 812-9016-7472 | GitHub: ${profile.socials.github}

SUMMARY:
Mahasiswa Pendidikan Fisika di UNJ yang mengembangkan riset berbasis bukti nyata pada irisan Physics Education, Educational Technology, dan Artificial Intelligence.

EXPERIENCE:
- Pelatih KIR SMAN 78 Jakarta & Pembimbing OPSI (2023 - Sekarang)
- Praktik Keterampilan Mengajar Fisika (PKM) SMAN 78 Jakarta (2025)
- Kepala Divisi Hubungan Informasi & Komunikasi (HIK) KPM UNJ (2024 - 2025)
- Pelatihan Data Science Kejuruan PPKD Jakarta Pusat (2026)

FLAGSHIP PROJECTS:
1. Conceptra — Physics Misconception Observatory (17,755 papers, 1,002 misconception variants)
2. PHYSION — High-Fidelity Physics Virtual Laboratory (60 FPS Canvas 2D engine)
3. Kok Bisa? Public Science Analytics (202,429 comments classified with IndoBERT, 97.73% accuracy)
4. FisikaSeru 3.0 — Interactive Physics Learning Platform (PWA, mobile-first)
5. Risenologi JAMS — Journal Action Management System (Sinta accreditation readiness)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Ringkasan CV disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="border-b pb-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                {profile.name}
              </DialogTitle>
              <DialogDescription className="text-sm font-semibold text-[hsl(180_70%_35%)] dark:text-[hsl(180_70%_55%)] mt-1">
                {profile.role}
              </DialogDescription>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {profile.location}
                </span>
                <span>•</span>
                <span>{profile.institution}</span>
                <span>•</span>
                <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                  {profile.email}
                </a>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
                title="Salin ringkasan teks"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                {copied ? "Tersalin" : "Salin Teks"}
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
                title="Cetak CV"
              >
                <Printer size={13} /> Cetak
              </button>
            </div>
          </div>
        </DialogHeader>

        {/* CV Body Content */}
        <div className="space-y-6 pt-4 text-xs text-foreground">
          {/* Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <GraduationCap size={14} className="text-primary" /> Pendidikan & Spesialisasi
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl border bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm text-foreground">{profile.institution}</div>
                    <div className="text-muted-foreground">{profile.department}</div>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{profile.educationPeriod}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                  Fokus akademik pada didaktik fisika, perubahan konseptual (conceptual change), identifikasi miskonsepsi, dan desain lingkungan belajar berbasis teknologi.
                </p>
              </div>

              <div className="p-3 rounded-xl border bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm text-foreground">PPKD Jakarta Pusat</div>
                    <div className="text-muted-foreground">Pelatihan Kejuruan Data Science</div>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">2026</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                  Data processing pipeline dengan Python, machine learning modeling, analisis statistik terapan, dan perancangan dashboard prediktif.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Roles & Teaching */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              🔬 Pengalaman Riset & Kepemimpinan
            </h4>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-3 rounded-xl border bg-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-sm text-foreground">{exp.role}</div>
                      <div className="text-primary font-medium">{exp.organization}</div>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {exp.achievements.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Projects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              ⚙️ Portofolio Sistem Unggulan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-xl border bg-muted/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-xs">{p.title}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                    </div>
                    <div className="text-[10px] text-primary font-medium mb-1.5">{p.category}</div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border/50 flex flex-wrap gap-1">
                    {p.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-background border text-[9px] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              🛠️ Keahlian Teknis & Metodologi
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl border bg-card">
                <div className="font-bold text-[11px] text-foreground mb-1">Physics & Pedagogy</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">
                  Conceptual Change, Diagnostic Testing, Inquiry Scaffolding, Kurikulum Merdeka Fisika.
                </div>
              </div>
              <div className="p-2.5 rounded-xl border bg-card">
                <div className="font-bold text-[11px] text-foreground mb-1">AI & Data Science</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">
                  Python, IndoBERT (Hugging Face), DuckDB, Ollama Local LLMs, SPSS, Jamovi.
                </div>
              </div>
              <div className="p-2.5 rounded-xl border bg-card">
                <div className="font-bold text-[11px] text-foreground mb-1">EdTech Engineering</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">
                  TypeScript, React, Next.js, HTML5 Canvas 2D, Numerical ODE (Euler-Cromer), Tailwind CSS.
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
