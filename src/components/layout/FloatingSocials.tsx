import { motion } from "framer-motion";
import { Github, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio";

const socialItems = [
  { icon: Github, href: profile.socials.github, label: "GitHub", color: "hover:text-foreground" },
  { icon: Twitter, href: profile.socials.twitter, label: "Twitter / X", color: "hover:text-sky-500" },
  { icon: Instagram, href: profile.socials.instagram, label: "Instagram", color: "hover:text-pink-500" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email", color: "hover:text-orange-500" },
  { icon: MessageCircle, href: profile.socials.whatsapp, label: "WhatsApp", color: "hover:text-green-500" },
];

export function FloatingSocials() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-1.5"
    >
      <div className="w-px h-10 bg-gradient-to-b from-transparent to-border mb-1" />
      {socialItems.map(({ icon: Icon, href, label, color }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`w-9 h-9 flex items-center justify-center rounded-xl border bg-card/80 backdrop-blur-sm text-muted-foreground ${color} border-border hover:border-foreground/20 hover:bg-card hover:shadow-md transition-all duration-200 hover:-translate-x-0.5`}
        >
          <Icon size={15} />
        </a>
      ))}
      <div className="w-px h-10 bg-gradient-to-t from-transparent to-border mt-1" />
    </motion.aside>
  );
}
