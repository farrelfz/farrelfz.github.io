import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Copy, Check, Quote, BookOpen } from "lucide-react";
import { toast } from "sonner";

export interface CitationItem {
  id: string;
  title: string;
  authors: string[];
  year: number | string;
  type: string;
  publisher?: string;
  url?: string;
  doi?: string;
}

interface CiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  citation: CitationItem | null;
}

export function CiteModal({ open, onOpenChange, citation }: CiteModalProps) {
  const [activeTab, setActiveTab] = useState<"apa" | "bibtex" | "ieee">("apa");
  const [copied, setCopied] = useState(false);

  if (!citation) return null;

  const authorsApa = citation.authors.join(", ");
  const authorsIeee = citation.authors.join(", ");
  const key = `${citation.authors[0]?.split(" ").pop()?.toLowerCase() || "fauzan"}${citation.year}`;

  const formatApa = `${authorsApa} (${citation.year}). ${citation.title}. ${citation.publisher || "Universitas Negeri Jakarta"}. ${citation.url || "https://github.com/farrelfz"}`;

  const formatIeee = `${authorsIeee}, "${citation.title}," ${citation.publisher || "UNJ Research Archive"}, ${citation.year}. [Online]. Available: ${citation.url || "https://github.com/farrelfz"}`;

  const formatBibtex = `@misc{${key},
  author       = {${citation.authors.join(" and ")}},
  title        = {${citation.title}},
  year         = {${citation.year}},
  howpublished = {\\\\url{${citation.url || "https://github.com/farrelfz"}}},
  note         = {${citation.publisher || "Physics Education Research & Technology"}}
}`;

  const currentText =
    activeTab === "apa" ? formatApa : activeTab === "ieee" ? formatIeee : formatBibtex;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    toast.success("Format sitasi berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader className="border-b pb-3 text-left">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Quote size={14} /> Academic Citation Generator
          </div>
          <DialogTitle className="text-lg font-bold text-foreground leading-snug">
            {citation.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Pilih format sitasi untuk dimasukkan ke dalam daftar pustaka karya ilmiah atau manajer sitasi Anda.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 pt-2">
          {(["apa", "bibtex", "ieee"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Citation Box */}
        <div className="relative mt-2 p-4 rounded-xl border bg-muted/40 font-mono text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed select-all">
          {currentText}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-muted-foreground">
            {activeTab === "bibtex" ? "Siap di-import ke Zotero, Mendeley, atau LaTeX" : "Format standar publikasi akademik"}
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
            style={{ background: "hsl(180 70% 38%)" }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Tersalin!" : "Salin Sitasi"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
