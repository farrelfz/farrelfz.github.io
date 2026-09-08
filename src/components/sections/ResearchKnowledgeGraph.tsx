import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { Sparkles, Network, ExternalLink, RefreshCw, ZoomIn, Info, ShieldCheck } from "lucide-react";

interface Node {
  id: string;
  label: string;
  category: "Core" | "Domain" | "Environment" | "Tools" | "Platform" | "Method";
  color: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  description: string;
  metric?: string;
  link?: string;
}

interface Edge {
  source: string;
  target: string;
  label?: string;
}

const INITIAL_NODES: Node[] = [
  {
    id: "center",
    label: "Farrel Dava",
    category: "Core",
    color: "#0284c7",
    radius: 28,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    description: "Physics Education Researcher · EdTech Developer · AI for Education di Universitas Negeri Jakarta.",
  },
  {
    id: "per",
    label: "Physics Education (PER)",
    category: "Domain",
    color: "#0e7490",
    radius: 22,
    x: -140,
    y: -80,
    vx: 0,
    vy: 0,
    description: "Fondasi domain pedagogi: diagnosis miskonsepsi fisika, conceptual change theory, dan scaffolding inkuiri terbimbing.",
    metric: "1,002 Variasi Miskonsepsi",
  },
  {
    id: "edtech",
    label: "Educational Technology",
    category: "Environment",
    color: "#3b82f6",
    radius: 22,
    x: 140,
    y: -80,
    vx: 0,
    vy: 0,
    description: "Lingkungan belajar interaktif: Canvas 2D engine, integrasi numerik 60 FPS, arsitektur PWA offline-first.",
    metric: "5 Platform Flagship",
  },
  {
    id: "ai",
    label: "AI & Computational Research",
    category: "Tools",
    color: "#8b5cf6",
    radius: 22,
    x: 0,
    y: 150,
    vx: 0,
    vy: 0,
    description: "Perangkat analisis komputasional: transformer IndoBERT, knowledge graph OpenAlex, orkestrasi local LLM via Ollama.",
    metric: "200k+ Komentar Dianalisis",
  },
  {
    id: "conceptra",
    label: "Conceptra",
    category: "Platform",
    color: "#0891b2",
    radius: 17,
    x: -240,
    y: -140,
    vx: 0,
    vy: 0,
    description: "Observatory sintesis miskonsepsi fisika pertama di Indonesia mengindeks 17.755 paper riset.",
    metric: "17,755 Papers Mined",
    link: "https://github.com/farrelfz/conceptra",
  },
  {
    id: "physion",
    label: "PHYSION Virtual Lab",
    category: "Platform",
    color: "#2563eb",
    radius: 17,
    x: 240,
    y: -140,
    vx: 0,
    vy: 0,
    description: "Laboratorium fisika virtual dengan Web Workers dan mesin integrasi numerik ODE (Euler-Cromer).",
    metric: "60 FPS Render Engine",
    link: "https://github.com/farrelfz/physion",
  },
  {
    id: "indobert",
    label: "IndoBERT Discourse Mining",
    category: "Method",
    color: "#7c3aed",
    radius: 17,
    x: 120,
    y: 220,
    vx: 0,
    vy: 0,
    description: "Studi komputasional menambang 202.429 komentar sains YouTube dengan akurasi klasifikasi 97.73%.",
    metric: "97.73% Accuracy",
    link: "https://github.com/farrelfz/kokbisa-analytics",
  },
  {
    id: "scaffolding",
    label: "KIR / OPSI Mentoring",
    category: "Method",
    color: "#f59e0b",
    radius: 16,
    x: -220,
    y: 40,
    vx: 0,
    vy: 0,
    description: "Pelatihan riset siswa SMAN 78 Jakarta hingga finalis nasional Olimpiade Penelitian Siswa Indonesia (OPSI).",
    metric: "Finalis Nasional OPSI 2023",
  },
  {
    id: "jams",
    label: "Risenologi JAMS",
    category: "Platform",
    color: "#0284c7",
    radius: 16,
    x: 220,
    y: 30,
    vx: 0,
    vy: 0,
    description: "Sistem otomasi manajemen editorial jurnal mahasiswa dengan metrik kesiapan akreditasi Sinta/Arjuna.",
    metric: "Workflow Automation",
    link: "https://github.com/farrelfz/Risenologi-JAMS",
  },
];

const EDGES: Edge[] = [
  { source: "center", target: "per" },
  { source: "center", target: "edtech" },
  { source: "center", target: "ai" },
  { source: "per", target: "conceptra" },
  { source: "per", target: "scaffolding" },
  { source: "edtech", target: "physion" },
  { source: "edtech", target: "jams" },
  { source: "ai", target: "conceptra" },
  { source: "ai", target: "indobert" },
  { source: "conceptra", target: "physion" },
];

export function ResearchKnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<Node>(INITIAL_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const draggedNodeRef = useRef<Node | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize canvas coordinates around center
  const initPositions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / (2 * window.devicePixelRatio);
    const cy = canvas.height / (2 * window.devicePixelRatio);

    setNodes(
      INITIAL_NODES.map((n) => ({
        ...n,
        x: cx + n.x,
        y: cy + n.y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    );
  }, []);

  // Render network loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = width / 2;
      const cy = height / 2;

      // Force-directed relaxation & gentle orbital drift
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (draggedNodeRef.current && draggedNodeRef.current.id === node.id) {
            return node;
          }

          // Spring pull toward home anchor
          const original = INITIAL_NODES.find((on) => on.id === node.id);
          const homeX = cx + (original ? original.x : 0);
          const homeY = cy + (original ? original.y : 0);

          const kSpring = 0.015;
          const fx = (homeX - node.x) * kSpring;
          const fy = (homeY - node.y) * kSpring;

          const damping = 0.88;
          const newVx = (node.vx + fx) * damping;
          const newVy = (node.vy + fy) * damping;

          return {
            ...node,
            x: node.x + newVx,
            y: node.y + newVy,
            vx: newVx,
            vy: newVy,
          };
        })
      );

      // 1. Draw Edges
      EDGES.forEach((edge) => {
        const sNode = nodes.find((n) => n.id === edge.source);
        const tNode = nodes.find((n) => n.id === edge.target);
        if (!sNode || !tNode) return;

        const isHighlighted =
          (selectedNode && (selectedNode.id === sNode.id || selectedNode.id === tNode.id)) ||
          (hoveredNode && (hoveredNode.id === sNode.id || hoveredNode.id === tNode.id));

        ctx.strokeStyle = isHighlighted ? "rgba(56, 189, 248, 0.7)" : "rgba(148, 163, 184, 0.22)";
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;

        ctx.beginPath();
        ctx.moveTo(sNode.x, sNode.y);
        ctx.lineTo(tNode.x, tNode.y);
        ctx.stroke();

        // Pulsing energy particle along edge
        if (isHighlighted) {
          const tProgress = (Date.now() % 2000) / 2000;
          const px = sNode.x + (tNode.x - sNode.x) * tProgress;
          const py = sNode.y + (tNode.y - sNode.y) * tProgress;
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 2. Draw Nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode && selectedNode.id === node.id;
        const isHovered = hoveredNode && hoveredNode.id === node.id;

        // Outer Aura
        if (isSelected || isHovered) {
          const grad = ctx.createRadialGradient(node.x, node.y, node.radius, node.x, node.y, node.radius + 14);
          grad.addColorStop(0, `${node.color}66`);
          grad.addColorStop(1, `${node.color}00`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 14, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node Body
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = "hsl(var(--foreground))";
        ctx.font = isSelected || isHovered ? "bold 11px Inter, sans-serif" : "500 10px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [nodes, selectedNode, hoveredNode]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initPositions();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initPositions]);

  // Mouse / Touch Drag Interactions
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    const clicked = nodes.find((n) => Math.hypot(n.x - x, n.y - y) <= n.radius + 6);
    if (clicked) {
      draggedNodeRef.current = clicked;
      setSelectedNode(clicked);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    if (draggedNodeRef.current) {
      const draggedId = draggedNodeRef.current.id;
      setNodes((prev) =>
        prev.map((n) => (n.id === draggedId ? { ...n, x, y, vx: 0, vy: 0 } : n))
      );
    } else {
      const hovered = nodes.find((n) => Math.hypot(n.x - x, n.y - y) <= n.radius + 6);
      setHoveredNode(hovered || null);
    }
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
  };

  return (
    <section className="section-padding bg-background border-t border-border/60 relative overflow-hidden">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <SectionLabel>Conceptual Architecture</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl text-foreground mt-2 mb-2">
                Research <span className="text-gradient-primary">Knowledge Graph</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                Peta interaktif hubungan konseptual antara pedagogi fisika, educational technology, dan artificial intelligence. Klik atau geser simpul untuk menjelajah keterkaitan riset.
              </p>
            </FadeIn>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>Interactive Force Network</span>
          </div>
        </div>

        {/* Canvas & Node Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Graph Viewport */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border bg-card/60 shadow-xl h-[420px] sm:h-[480px]">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full block cursor-grab active:cursor-grabbing"
            />

            {/* Instruction Overlay */}
            <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] text-muted-foreground font-mono bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-xl border">
              Tip: Klik simpul untuk melihat detail atau geser untuk reorganisasi posisi.
            </div>

            <button
              onClick={initPositions}
              className="absolute top-4 right-4 p-2 rounded-xl border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Reset Posisi Simpul"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl border bg-card shadow-xl flex flex-col h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedNode.color }}
                  />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border text-muted-foreground">
                    {selectedNode.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
                  {selectedNode.label}
                </h3>

                {selectedNode.metric && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-semibold w-fit mb-4">
                    <Sparkles size={12} />
                    {selectedNode.metric}
                  </div>
                )}

                <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-1">
                  {selectedNode.description}
                </p>

                {selectedNode.link && (
                  <a
                    href={selectedNode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
                    style={{ background: "linear-gradient(135deg, hsl(217 91% 45%), hsl(180 70% 35%))" }}
                  >
                    <span>Jelajahi Kode & Data Riset</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
