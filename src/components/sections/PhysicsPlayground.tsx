import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FadeIn, SectionLabel } from "@/components/ui/AnimationPrimitives";
import { Play, Pause, RotateCcw, Sparkles, Gauge, Compass, Scale, Globe2, Wind, Eye } from "lucide-react";

interface Environment {
  name: string;
  g: number;
  color: string;
  icon: string;
}

const ENVIRONMENTS: Record<string, Environment> = {
  earth: { name: "Bumi", g: 9.8, color: "text-blue-500", icon: "🌍" },
  moon: { name: "Bulan", g: 1.62, color: "text-slate-400", icon: "🌑" },
  mars: { name: "Mars", g: 3.71, color: "text-amber-500", icon: "🔴" },
  jupiter: { name: "Jupiter", g: 24.79, color: "text-orange-600", icon: "🪐" },
};

export function PhysicsPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Simulation Parameters
  const [speed, setSpeed] = useState(30); // m/s
  const [angle, setAngle] = useState(45); // degrees
  const [envKey, setEnvKey] = useState<string>("earth");
  const [mass, setMass] = useState(5); // kg
  const [airResistance, setAirResistance] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const [slowMo, setSlowMo] = useState(false);

  // Simulation State
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [telemetry, setTelemetry] = useState({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    maxH: 0,
    range: 0,
    flightTime: 0,
  });

  // Trail history
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  const g = ENVIRONMENTS[envKey].g;
  const rad = (angle * Math.PI) / 180;
  const v0x = speed * Math.cos(rad);
  const v0y = speed * Math.sin(rad);

  // Theoretical calculations (vacuum)
  const theoreticalMaxH = (v0y * v0y) / (2 * g);
  const theoreticalFlightTime = (2 * v0y) / g;
  const theoreticalRange = (v0x * 2 * v0y) / g;

  // Active state ref for loop
  const simState = useRef({
    x: 0,
    y: 0,
    vx: v0x,
    vy: v0y,
    t: 0,
    maxH: 0,
  });

  const resetSim = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setTime(0);
    trailRef.current = [];
    simState.current = {
      x: 0,
      y: 0,
      vx: speed * Math.cos((angle * Math.PI) / 180),
      vy: speed * Math.sin((angle * Math.PI) / 180),
      t: 0,
      maxH: 0,
    };
    setTelemetry({
      x: 0,
      y: 0,
      vx: simState.current.vx,
      vy: simState.current.vy,
      maxH: 0,
      range: theoreticalRange,
      flightTime: theoreticalFlightTime,
    });
    drawScene();
  }, [speed, angle, g, theoreticalRange, theoreticalFlightTime]);

  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear with dark/light dynamic styling
    ctx.clearRect(0, 0, width, height);

    // Scaling factors (canvas pixels per physical meter)
    // Scale dynamically based on predicted range
    const maxDimension = Math.max(theoreticalRange * 1.15, theoreticalMaxH * 2.2, 80);
    const scale = Math.min((width - 80) / maxDimension, (height - 90) / (maxDimension * 0.6));
    const originX = 50;
    const originY = height - 40;

    // 1. Grid Lines
    ctx.strokeStyle = "rgba(128, 128, 128, 0.12)";
    ctx.lineWidth = 1;
    const step = maxDimension > 200 ? 50 : 20;

    for (let x = 0; x <= maxDimension; x += step) {
      const px = originX + x * scale;
      if (px > width - 20) break;
      ctx.beginPath();
      ctx.moveTo(px, 20);
      ctx.lineTo(px, originY);
      ctx.stroke();

      ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
      ctx.font = "10px monospace";
      ctx.fillText(`${x}m`, px - 10, originY + 18);
    }

    for (let y = 0; y <= maxDimension * 0.6; y += step) {
      const py = originY - y * scale;
      if (py < 20) break;
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(width - 20, py);
      ctx.stroke();

      ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
      ctx.font = "10px monospace";
      ctx.fillText(`${y}m`, originX - 32, py + 3);
    }

    // 2. Ground line
    ctx.strokeStyle = "hsl(180, 70%, 38%)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(originX - 20, originY);
    ctx.lineTo(width - 10, originY);
    ctx.stroke();

    // 3. Trajectory trail
    if (trailRef.current.length > 1) {
      ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(originX + trailRef.current[0].x * scale, originY - trailRef.current[0].y * scale);
      for (let i = 1; i < trailRef.current.length; i++) {
        ctx.lineTo(originX + trailRef.current[i].x * scale, originY - trailRef.current[i].y * scale);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 4. Launcher Cannon Base
    const radCurrent = (angle * Math.PI) / 180;
    const cannonLen = 28;
    const cannonEndX = originX + cannonLen * Math.cos(radCurrent);
    const cannonEndY = originY - cannonLen * Math.sin(radCurrent);

    ctx.strokeStyle = "rgba(100, 116, 139, 0.9)";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(cannonEndX, cannonEndY);
    ctx.stroke();

    ctx.fillStyle = "rgba(71, 85, 105, 1)";
    ctx.beginPath();
    ctx.arc(originX, originY, 8, 0, Math.PI * 2);
    ctx.fill();

    // 5. Projectile Ball
    const currX = originX + simState.current.x * scale;
    const currY = originY - simState.current.y * scale;

    // Glow aura
    const gradient = ctx.createRadialGradient(currX, currY, 2, currX, currY, 14);
    gradient.addColorStop(0, "rgba(56, 189, 248, 1)");
    gradient.addColorStop(0.5, "rgba(14, 165, 233, 0.6)");
    gradient.addColorStop(1, "rgba(14, 165, 233, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(currX, currY, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(currX, currY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 6. Velocity Vectors (if enabled)
    if (showVectors && (isRunning || simState.current.t > 0)) {
      const vScale = 0.8;
      // Total velocity vector (Cyan)
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currX, currY);
      ctx.lineTo(currX + simState.current.vx * vScale, currY - simState.current.vy * vScale);
      ctx.stroke();

      // Gravity vector (Rose/Red pointing straight down)
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(currX, currY);
      ctx.lineTo(currX, currY + g * 1.5);
      ctx.stroke();
    }
  }, [angle, g, theoreticalRange, theoreticalMaxH, showVectors, isRunning]);

  // Main Numerical Integration Loop
  useEffect(() => {
    if (!isRunning) return;

    let lastTime = performance.now();
    const dtBase = 0.016; // 60 FPS baseline (seconds)

    const loop = (currentTime: number) => {
      const elapsed = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Numerical step (Euler-Cromer integration)
      const subSteps = 4;
      const speedMultiplier = slowMo ? 0.4 : 1.0;
      const dt = (dtBase * speedMultiplier) / subSteps;

      for (let s = 0; s < subSteps; s++) {
        let ax = 0;
        let ay = -g;

        // Optional aerodynamic drag
        if (airResistance) {
          const vMag = Math.hypot(simState.current.vx, simState.current.vy);
          const kDrag = 0.015 / mass;
          ax -= kDrag * vMag * simState.current.vx;
          ay -= kDrag * vMag * simState.current.vy;
        }

        simState.current.vx += ax * dt;
        simState.current.vy += ay * dt;
        simState.current.x += simState.current.vx * dt;
        simState.current.y += simState.current.vy * dt;
        simState.current.t += dt;

        if (simState.current.y > simState.current.maxH) {
          simState.current.maxH = simState.current.y;
        }

        // Ground hit check
        if (simState.current.y <= 0 && simState.current.t > 0.05) {
          simState.current.y = 0;
          setIsRunning(false);
          setIsFinished(true);
          break;
        }
      }

      // Append trail sample
      trailRef.current.push({ x: simState.current.x, y: simState.current.y });
      if (trailRef.current.length > 500) {
        trailRef.current.shift();
      }

      setTime(simState.current.t);
      setTelemetry({
        x: simState.current.x,
        y: simState.current.y,
        vx: simState.current.vx,
        vy: simState.current.vy,
        maxH: simState.current.maxH,
        range: simState.current.x,
        flightTime: simState.current.t,
      });

      drawScene();

      if (simState.current.y > 0 || simState.current.t <= 0.05) {
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning, g, mass, airResistance, slowMo, drawScene]);

  // Redraw when parameters change
  useEffect(() => {
    resetSim();
  }, [speed, angle, envKey, mass, airResistance, resetSim]);

  // Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawScene();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawScene]);

  const handleLaunch = () => {
    if (isFinished) {
      resetSim();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  // Determine dynamic misconception insight
  const getPedagogicalInsight = () => {
    if (angle === 45 && !airResistance) {
      return {
        title: "Kondisi Jangkauan Maksimum (Angle 45°)",
        text: "Pada ruang hampa di medan datar, sudut 45° terbukti matematis menghasilkan jangkauan terjauh karena fungsi sin(2θ) mencapai nilai maksimum (1.0).",
        highlight: "Optimal Range",
      };
    }
    if (envKey === "moon") {
      return {
        title: "Pengaruh Gravitasi Rendah (Bulan: 1.62 m/s²)",
        text: "Dengan gravitasi hanya ~1/6 Bumi, proyektil memerlukan waktu jauh lebih lama untuk melambat secara vertikal, melipatgandakan jangkauan dan tinggi maksimum hingga 6 kali lipat!",
        highlight: "Lunar Kinematics",
      };
    }
    if (mass > 10 && !airResistance) {
      return {
        title: "Membantah Miskonsepsi Aristotelian Massa",
        text: "Perhatikan: Mengubah massa proyektil (saat gesekan udara mati) TIDAK mengubah jarak atau waktu tempuh. Di ruang hampa, percepatan gravitasi independen dari massa!",
        highlight: "Mass Invariance",
      };
    }
    if (airResistance) {
      return {
        title: "Dinamika Aerodinamika & Drag Terdistribusi",
        text: "Dengan hambatan udara aktif, lintasan proyektil tidak lagi simetris (bukan parabola murni). Sudut optimal untuk jangkauan terjauh bergeser ke bawah 45° (~38°-42°).",
        highlight: "Real-world Drag",
      };
    }
    return {
      title: "Prinsip Independensi Gerak Horizontal & Vertikal",
      text: "Gerak parabola adalah perpaduan GLB (kecepatan horizontal konstan) dan GLBB vertikal (dipengaruhi percepatan gravitasi g). Keduanya independen satu sama lain.",
      highlight: "Galilean Principle",
    };
  };

  const insight = getPedagogicalInsight();

  return (
    <section id="physics-playground" className="section-padding bg-muted/30 border-y border-border/60 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel>Interactive Laboratory</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 mb-3 leading-tight">
                Virtual Physics <span className="text-gradient-primary">Playground</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Eksplorasi hukum kinematika proyektil secara interaktif dengan mesin integrasi numerik 60 FPS.
                Manipulasi parameter fisika dan amati konsekuensi teoretisnya secara real-time.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Physics Engine
            </span>
          </FadeIn>
        </div>

        {/* Playground Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Simulation Viewport (Canvas + HUD) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden border bg-card shadow-xl">
              {/* Canvas Viewport */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-gradient-to-b from-background via-card to-background">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block cursor-crosshair"
                />

                {/* Live HUD Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl border bg-card/90 backdrop-blur-md text-[11px] font-mono shadow-sm">
                    <span className="text-muted-foreground">Waktu (t): </span>
                    <span className="font-bold text-foreground">{time.toFixed(2)}s</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl border bg-card/90 backdrop-blur-md text-[11px] font-mono shadow-sm">
                    <span className="text-muted-foreground">Jarak (x): </span>
                    <span className="font-bold text-foreground">{telemetry.x.toFixed(1)}m</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl border bg-card/90 backdrop-blur-md text-[11px] font-mono shadow-sm">
                    <span className="text-muted-foreground">Tinggi (y): </span>
                    <span className="font-bold text-foreground">{telemetry.y.toFixed(1)}m</span>
                  </div>
                </div>

                {/* Environment Badge Overlay */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-card/90 backdrop-blur-md text-xs font-semibold shadow-sm">
                    <span>{ENVIRONMENTS[envKey].icon}</span>
                    <span className="text-foreground">{ENVIRONMENTS[envKey].name}</span>
                    <span className="text-muted-foreground font-mono">({g} m/s²)</span>
                  </div>
                </div>

                {/* Vectors Legend Indicator */}
                {showVectors && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 px-3 py-1.5 rounded-xl border bg-card/90 backdrop-blur-md text-[10px] font-mono pointer-events-none">
                    <span className="flex items-center gap-1 text-sky-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-sky-500" /> Vektor Kecepatan (v)
                    </span>
                    <span className="flex items-center gap-1 text-rose-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Gravitasi (g)
                    </span>
                  </div>
                )}
              </div>

              {/* Viewport Action Controls Bar */}
              <div className="p-4 bg-muted/40 border-t flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {!isRunning ? (
                    <button
                      onClick={handleLaunch}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
                      style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(180 70% 38%))" }}
                    >
                      <Play size={14} fill="currentColor" />
                      {isFinished ? "Luncurkan Lagi" : "Luncurkan Proyektil"}
                    </button>
                  ) : (
                    <button
                      onClick={handlePause}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all"
                    >
                      <Pause size={14} fill="currentColor" />
                      Jeda
                    </button>
                  )}

                  <button
                    onClick={resetSim}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border bg-card hover:bg-muted transition-colors text-foreground"
                    title="Reset Posisi Awal"
                  >
                    <RotateCcw size={13} />
                    Reset
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowVectors(!showVectors)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      showVectors ? "bg-primary/10 border-primary/30 text-primary" : "bg-card text-muted-foreground"
                    }`}
                  >
                    <Eye size={13} />
                    Vektor Gaya
                  </button>

                  <button
                    onClick={() => setSlowMo(!slowMo)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      slowMo ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400" : "bg-card text-muted-foreground"
                    }`}
                  >
                    Slow Motion (0.4x)
                  </button>
                </div>
              </div>
            </div>

            {/* Pedagogical Misconception Callout Box */}
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl border bg-card/80 backdrop-blur-sm shadow-sm flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[hsl(180_70%_38%/0.12)] flex items-center justify-center text-xl flex-shrink-0">
                💡
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[hsl(180_70%_38%/0.1)] text-[hsl(180_70%_32%)] dark:text-[hsl(180_70%_55%)] border border-[hsl(180_70%_38%/0.2)]">
                    {insight.highlight}
                  </span>
                  <h4 className="text-xs font-bold text-foreground">{insight.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.text}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Controls & Telemetry Dashboard */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 rounded-3xl border bg-card shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b pb-3">
                <Compass size={16} className="text-primary" />
                Parameter Eksperimen
              </h3>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                    <Gauge size={13} /> Kecepatan Awal (v₀)
                  </span>
                  <span className="font-mono font-bold text-foreground">{speed} m/s</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-[hsl(180_70%_38%)] cursor-pointer"
                />
              </div>

              {/* Angle Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                    <Compass size={13} /> Sudut Elevasi (θ)
                  </span>
                  <span className="font-mono font-bold text-foreground">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-[hsl(180_70%_38%)] cursor-pointer"
                />
              </div>

              {/* Celestial Environment Selection */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                  <Globe2 size={13} /> Gravitasi Benda Langit (g)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(ENVIRONMENTS).map(([key, env]) => (
                    <button
                      key={key}
                      onClick={() => setEnvKey(key)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        envKey === key
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-muted/40 hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="text-base">{env.icon}</span>
                      <div className="text-left">
                        <div className="leading-tight">{env.name}</div>
                        <div className="text-[10px] opacity-75 font-mono">{env.g} m/s²</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mass Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                    <Scale size={13} /> Massa Benda (m)
                  </span>
                  <span className="font-mono font-bold text-foreground">{mass} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-[hsl(180_70%_38%)] cursor-pointer"
                />
              </div>

              {/* Air Resistance Toggle */}
              <div className="pt-2 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind size={15} className="text-muted-foreground" />
                  <div>
                    <div className="text-xs font-bold text-foreground">Hambatan Udara</div>
                    <div className="text-[10px] text-muted-foreground">Aerodynamic Drag Effect</div>
                  </div>
                </div>
                <button
                  onClick={() => setAirResistance(!airResistance)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    airResistance ? "bg-[hsl(180_70%_38%)]" : "bg-muted"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      airResistance ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Live Telemetry Summary Card */}
            <div className="p-5 rounded-3xl border bg-card/90 shadow-md space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-500" />
                Hasil Prediksi Teoretis (Vakum)
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-[10px] text-muted-foreground font-medium">Tinggi Max</div>
                  <div className="text-sm font-mono font-extrabold text-foreground">{theoreticalMaxH.toFixed(1)}m</div>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-[10px] text-muted-foreground font-medium">Jarak Terjauh</div>
                  <div className="text-sm font-mono font-extrabold text-foreground">{theoreticalRange.toFixed(1)}m</div>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                  <div className="text-[10px] text-muted-foreground font-medium">Total Waktu</div>
                  <div className="text-sm font-mono font-extrabold text-foreground">{theoreticalFlightTime.toFixed(1)}s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
