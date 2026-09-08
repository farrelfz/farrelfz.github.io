import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  BookOpen,
  Code2,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  Mail,
  MessageCircle,
  Sparkles,
  Zap,
  Github,
  Instagram,
  Copy,
  Clock,
  Home,
} from "lucide-react";
import { toast } from "sonner";
import { projects, writings, profile } from "@/data/portfolio";

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange: controlledOnOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const navigate = useNavigate();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  const handleSelect = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    toast.success("Email disalin ke clipboard!", {
      description: profile.email,
    });
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Cari riset, proyek, artikel, atau ketik perintah... (ESC to close)" />
      <CommandList className="max-h-[380px]">
        <CommandEmpty>Tidak ditemukan hasil.</CommandEmpty>

        {/* Quick Actions */}
        <CommandGroup heading="Aksi Cepat">
          <CommandItem
            onSelect={() =>
              handleSelect(() => {
                const el = document.getElementById("physics-playground");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/#physics-playground");
                }
              })
            }
          >
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            <span>Launch Physics Simulator Playground</span>
            <span className="ml-auto text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
              Interactive
            </span>
          </CommandItem>

          <CommandItem onSelect={() => handleSelect(copyEmail)}>
            <Copy className="mr-2 h-4 w-4 text-cyan-500" />
            <span>Salin Alamat Email</span>
            <span className="ml-auto text-xs text-muted-foreground">{profile.email}</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => {
                window.open(profile.socials.whatsapp, "_blank");
              })
            }
          >
            <MessageCircle className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Kirim Pesan WhatsApp Langsung</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => {
                window.open(profile.socials.github, "_blank");
              })
            }
          >
            <Github className="mr-2 h-4 w-4 text-foreground" />
            <span>Buka Profil GitHub</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Flagship Projects */}
        <CommandGroup heading="Proyek Unggulan (Flagship)">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() =>
                handleSelect(() => {
                  navigate(`/projects/${project.id}`);
                })
              }
            >
              <FlaskConical className="mr-2 h-4 w-4 text-blue-500" />
              <span>{project.title}</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono">
                {project.category}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Research & Articles */}
        <CommandGroup heading="Artikel & Riset">
          {writings.map((writing) => (
            <CommandItem
              key={writing.id}
              onSelect={() =>
                handleSelect(() => {
                  navigate(`/writing/${writing.slug}`);
                })
              }
            >
              <FileText className="mr-2 h-4 w-4 text-purple-500" />
              <span className="truncate">{writing.title}</span>
              <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap pl-2">
                {writing.readingTime}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Navigation Pages */}
        <CommandGroup heading="Navigasi Halaman">
          <CommandItem onSelect={() => handleSelect(() => navigate("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Beranda</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/research"))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Pilar Riset (Research Architecture)</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/projects"))}>
            <Code2 className="mr-2 h-4 w-4" />
            <span>Semua Proyek & Eksplorasi</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/laboratory"))}>
            <FlaskConical className="mr-2 h-4 w-4" />
            <span>Virtual Laboratories</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/experience"))}>
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Pengalaman & Jejak Karier</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/timeline"))}>
            <Clock className="mr-2 h-4 w-4" />
            <span>Milestones & Timeline</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/contact"))}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Hubungi Farrel</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
