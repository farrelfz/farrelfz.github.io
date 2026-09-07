import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Atom } from "lucide-react";
import { navigation } from "@/data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastY.current;
    setHidden(diff > 0 && y > 120);
    setScrolled(y > 20);
    lastY.current = y;
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b py-3 shadow-sm"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(180_70%_38%)] to-[hsl(217_91%_60%)] opacity-90 group-hover:opacity-100 transition-opacity" />
              <Atom size={16} className="relative z-10 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">Farrel Dava</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.slice(0, 7).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-muted"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
              style={{
                background: "hsl(180 70% 38%)",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(180 70% 32%)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px hsl(180 70% 38% / 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "hsl(180 70% 38%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Let's Connect
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-lg bg-muted/80 hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 border-l bg-card/95 backdrop-blur-xl shadow-2xl pt-20 pb-8 px-6 flex flex-col"
            >
              <nav className="flex flex-col gap-1">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: "hsl(180 70% 38%)" }}
                >
                  Let's Connect
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
