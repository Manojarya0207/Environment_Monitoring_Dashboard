import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowDown, Activity, FileText } from "lucide-react";

interface FeatureTourProps {
  onComplete: () => void;
}

export function FeatureTour({ onComplete }: FeatureTourProps) {
  // Steps: 
  // 0: Welcome Intro overlay card
  // 1: Highlight Button 1 (Analytics)
  // 2: Highlight Button 2 (Reports)
  // 3: Success Animation
  const [step, setStep] = useState<number>(0);
  const [coords, setCoords] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<any[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Block scrolling, shortcuts, and navigation
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";
    
    // Keydown handler to disable keyboard navigation (e.g. Tab) and exit shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Tab key to keep focus trapped, and Escape / function keys
      if (e.key === "Tab" || e.key === "Escape") {
        e.preventDefault();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  // Track position of the active button
  const updateTargetCoordinates = () => {
    let targetId = "";
    if (step === 1) targetId = "card-air-temp";
    else if (step === 2) targetId = "card-rel-humidity";

    if (!targetId) {
      setCoords(null);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      setCoords({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
      // Add custom active classes
      element.classList.add("tour-highlighted");
    }
  };

  useEffect(() => {
    updateTargetCoordinates();
    
    // Listen to resize and scroll to keep coordinates updated
    window.addEventListener("resize", updateTargetCoordinates);
    window.addEventListener("scroll", updateTargetCoordinates);

    return () => {
      window.removeEventListener("resize", updateTargetCoordinates);
      window.removeEventListener("scroll", updateTargetCoordinates);
      
      // Cleanup highlights
      ["card-air-temp", "card-rel-humidity"].forEach((id) => {
        document.getElementById(id)?.classList.remove("tour-highlighted");
      });
    };
  }, [step]);

  // Click handlers on target buttons to intercept and advance steps
  useEffect(() => {
    const btn1 = document.getElementById("card-air-temp");
    const btn2 = document.getElementById("card-rel-humidity");

    const handleBtn1Click = (e: MouseEvent) => {
      if (step === 1) {
        e.preventDefault();
        e.stopPropagation();
        setStep(2);
      }
    };

    const handleBtn2Click = (e: MouseEvent) => {
      if (step === 2) {
        e.preventDefault();
        e.stopPropagation();
        setStep(3);
      }
    };

    btn1?.addEventListener("click", handleBtn1Click, { capture: true });
    btn2?.addEventListener("click", handleBtn2Click, { capture: true });

    return () => {
      btn1?.removeEventListener("click", handleBtn1Click, { capture: true });
      btn2?.removeEventListener("click", handleBtn2Click, { capture: true });
    };
  }, [step]);

  // Handle Confetti / Particle animation on Step 3
  useEffect(() => {
    if (step === 3) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Generate particles
      const colors = ["#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
      particles.current = Array.from({ length: 120 }).map(() => ({
        x: canvas.width / 2,
        y: canvas.height / 2 - 50,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.7) * 15 - 5,
        radius: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        gravity: 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      }));

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= 0.012;
          p.rotation += p.rotationSpeed;

          if (p.alpha > 0) {
            active = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
            ctx.restore();
          }
        });

        if (active) {
          animationFrameId.current = requestAnimationFrame(animateParticles);
        }
      };

      animateParticles();

      // Auto-unlock dashboard after success animation
      const unlockTimer = setTimeout(() => {
        localStorage.setItem("onboarding_completed", "true");
        onComplete();
      }, 3500);

      return () => {
        clearTimeout(unlockTimer);
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      };
    }
  }, [step]);

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] pointer-events-none select-none">
      {/* 1. Glassmorphism Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md pointer-events-auto"
      />

      {/* Confetti Canvas */}
      {step === 3 && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[10001]"
        />
      )}

      {/* 2. SVG Spotlight Mask overlay */}
      {coords && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[9999]">
          <defs>
            <mask id="spotlight-mask">
              {/* White fills the mask (keeps backdrop visible) */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black cuts out the spotlight (creates clear window) */}
              <motion.rect
                initial={false}
                animate={{
                  x: coords.x - 8,
                  y: coords.y - 8,
                  width: coords.width + 16,
                  height: coords.height + 16,
                  rx: 16,
                  ry: 16
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                fill="black"
              />
            </mask>
          </defs>
          {/* Cover layer with mask applied */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="transparent"
            mask="url(#spotlight-mask)"
            className="pointer-events-auto"
          />
        </svg>
      )}
      {/* 2.5. Transparent click catcher for the highlighted card */}
      {coords && (
        <div
          onClick={() => {
            let targetId = "";
            if (step === 1) targetId = "card-air-temp";
            else if (step === 2) targetId = "card-rel-humidity";

            if (targetId) {
              const element = document.getElementById(targetId);
              if (element) {
                element.click();
              }
            }
          }}
          style={{
            position: "absolute",
            left: coords.x - 8,
            top: coords.y - 8,
            width: coords.width + 16,
            height: coords.height + 16,
            cursor: "pointer",
            borderRadius: "18px",
          }}
          className="pointer-events-auto z-[10002]"
        />
      )}


      {/* 3. Floating UI Content (Tooltips & Animations) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-[10000]">
        <AnimatePresence mode="wait">
          {/* STEP 0: Welcome Screen */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="glass p-8 rounded-3xl border border-sky-100/50 shadow-2xl max-w-md w-full mx-4 text-center pointer-events-auto flex flex-col items-center bg-white/95 text-slate-800 relative overflow-hidden"
            >
              {/* Ambient Glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-100/20 rounded-full blur-3xl" />

              <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 shadow-md shadow-sky-500/10">
                <Activity className="w-8 h-8 text-sky-500 animate-pulse" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-3 text-slate-900">
                Welcome to System Dashboard
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Let's configure your control center. Complete the quick 2-step setup tour to unlock full dashboard access.
              </p>

              <button
                onClick={() => setStep(1)}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
              >
                Start Onboarding
              </button>
            </motion.div>
          )}

          {/* STEP 1: Tooltip for Button 1 */}
          {step === 1 && coords && (
            <motion.div
              key="step-1-tooltip"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{
                position: "absolute",
                left: coords.x + coords.width / 2 - 160,
                top: coords.y + coords.height + 24,
                width: 320,
              }}
              className="glass p-6 rounded-2xl border border-sky-100/50 shadow-xl pointer-events-auto bg-white/95 text-slate-800 relative"
            >
              {/* Upward pointing arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-sky-100/50" />

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shrink-0 border border-sky-100">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider text-sky-500 font-bold">Step 1 of 2</span>
                  <h3 className="text-sm font-semibold mt-0.5 mb-1 text-slate-900">Air Temperature Card</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click this card to view detailed temperature analytics.
                  </p>
                </div>
              </div>

              {/* Bounce indicator arrow */}
              <div className="mt-4 flex justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="p-1.5 bg-sky-50 text-sky-500 rounded-full border border-sky-100"
                >
                  <ArrowDown className="w-4 h-4 rotate-180" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Tooltip for Button 2 */}
          {step === 2 && coords && (
            <motion.div
              key="step-2-tooltip"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{
                position: "absolute",
                left: coords.x + coords.width / 2 - 160,
                top: coords.y + coords.height + 24,
                width: 320,
              }}
              className="glass p-6 rounded-2xl border border-sky-100/50 shadow-xl pointer-events-auto bg-white/95 text-slate-800 relative"
            >
              {/* Upward pointing arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-sky-100/50" />

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shrink-0 border border-sky-100">
                  <FileText className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider text-sky-500 font-bold">Step 2 of 2</span>
                  <h3 className="text-sm font-semibold mt-0.5 mb-1 text-slate-900">Relative Humidity Card</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click this card to view relative humidity readings.
                  </p>
                </div>
              </div>

              {/* Bounce indicator arrow */}
              <div className="mt-4 flex justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="p-1.5 bg-sky-50 text-sky-500 rounded-full border border-sky-100"
                >
                  <ArrowDown className="w-4 h-4 rotate-180" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Success Animation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="glass p-8 rounded-3xl border border-sky-100/50 shadow-2xl max-w-sm w-full mx-4 text-center bg-white/95 text-slate-800 flex flex-col items-center z-[10002]"
            >
              {/* Animated checkmark circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 10 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20 relative"
              >
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </motion.div>

              <h2 className="text-2xl font-bold tracking-tight mb-2 text-slate-900">Onboarding Completed!</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-1">
                Your Control Center is unlocked.
              </p>
              <p className="text-xs text-slate-400">
                Transitioning to dashboard in a moment...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global CSS Inject for spotlight borders */}
      <style>{`
        .tour-highlighted {
          position: relative !important;
          z-index: 10001 !important;
          pointer-events: auto !important;
        }
        
        #card-air-temp.tour-highlighted::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 18px;
          border: 2px solid #0ea5e9;
          box-shadow: 0 0 12px #0ea5e9, inset 0 0 4px #0ea5e9;
          animation: pulse-border 1.5s infinite ease-in-out;
          pointer-events: none;
        }

        #card-rel-humidity.tour-highlighted::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 18px;
          border: 2px solid #10b981;
          box-shadow: 0 0 12px #10b981, inset 0 0 4px #10b981;
          animation: pulse-border 1.5s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}
