import { Link } from "react-router-dom";
import { Atom, Github, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";

const socialLinks = [
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Twitter, href: profile.socials.twitter, label: "Twitter / X" },
  { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
  { icon: MessageCircle, href: profile.socials.whatsapp, label: "WhatsApp" },
];

const footerNav = [
  {
    heading: "Research & Work",
    links: [
      { label: "Research", href: "/research" },
      { label: "Projects", href: "/projects" },
      { label: "Writing", href: "/writing" },
      { label: "Selected Works", href: "/publications" },
    ],
  },
  {
    heading: "Profile",
    links: [
      { label: "About", href: "/#about" },
      { label: "Experience", href: "/experience" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="container-max relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(180_70%_38%)] to-[hsl(217_91%_60%)]" />
                <Atom size={18} className="relative z-10 text-white" strokeWidth={2} />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-foreground block">Muhamad Farrel Dava Fauzan</span>
                <span className="text-[11px] text-muted-foreground font-mono">Physics Education · UNJ</span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-6">
              Physics Education Researcher, Educational Technology Developer & AI for Education practitioner. Building evidence-based educational systems.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center w-9 h-9 rounded-xl border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">
                {group.heading}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} Muhamad Farrel Dava Fauzan. Built with evidence-based research integrity.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to research collaboration
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
