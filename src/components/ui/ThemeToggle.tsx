import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-9 h-9 flex items-center justify-center rounded-xl border bg-card/80 hover:bg-muted text-foreground transition-all duration-200 shadow-sm ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Mode Terang (Clean Academic)" : "Mode Gelap (Scientific Terminal)"}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center text-foreground"
      >
        {isDark ? (
          <Sun size={16} className="text-amber-400" />
        ) : (
          <Moon size={16} className="text-slate-700" />
        )}
      </motion.div>
    </button>
  );
}
