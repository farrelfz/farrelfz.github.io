import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Index from "./pages/Index";
import ResearchPage from "./pages/Research";
import ProjectsPage from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import PublicationsPage from "./pages/PublicationsPage";
import WritingPage from "./pages/WritingPage";
import WritingDetail from "./pages/WritingDetail";
import TimelinePage from "./pages/TimelinePage";
import ContactPage from "./pages/ContactPage";
import TeachingPage from "./pages/TeachingPage";
import LaboratoryPage from "./pages/LaboratoryPage";
import ExperiencePage from "./pages/ExperiencePage";
import NotFound from "./pages/NotFound";
import { FloatingSocials } from "./components/layout/FloatingSocials";

const queryClient = new QueryClient();

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/research" element={<PageTransition><ResearchPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/teaching" element={<PageTransition><TeachingPage /></PageTransition>} />
        <Route path="/laboratory" element={<PageTransition><LaboratoryPage /></PageTransition>} />
        <Route path="/publications" element={<PageTransition><PublicationsPage /></PageTransition>} />
        <Route path="/writing" element={<PageTransition><WritingPage /></PageTransition>} />
        <Route path="/writing/:slug" element={<PageTransition><WritingDetail /></PageTransition>} />
        <Route path="/timeline" element={<PageTransition><TimelinePage /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingSocials />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
