import { motion } from "framer-motion";

// --- Luck Clover Animated WebP Component ---
function LuckCloverAnimation() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: 140, height: 140 }}
      animate={{
        filter: [
          "drop-shadow(0 0 15px rgba(74,222,128,0.3))",
          "drop-shadow(0 0 35px rgba(74,222,128,0.6))",
          "drop-shadow(0 0 15px rgba(74,222,128,0.3))",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f340/512.webp"
        alt="Animated Luck Clover"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* Outer glow pulse */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// --- Wind Turbine SVG Component ---
function WindTurbine({ x, scale = 1, delay = 0 }: { x: number; scale?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
      className="absolute bottom-0"
      style={{ left: `${x}%`, transform: `scale(${scale})`, transformOrigin: "bottom center" }}
    >
      <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tower */}
        <line x1="30" y1="40" x2="30" y2="120" stroke="rgba(148,163,184,0.6)" strokeWidth="3" />
        <line x1="24" y1="120" x2="36" y2="120" stroke="rgba(148,163,184,0.5)" strokeWidth="2" />

        {/* Hub */}
        <circle cx="30" cy="40" r="3" fill="rgba(203,213,225,0.8)" />

        {/* Blades — rotating group */}
        <motion.g
          style={{ transformOrigin: "30px 40px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3 + delay, repeat: Infinity, ease: "linear" }}
        >
          <line x1="30" y1="40" x2="30" y2="5" stroke="rgba(203,213,225,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="40" x2="58" y2="57" stroke="rgba(203,213,225,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="40" x2="2" y2="57" stroke="rgba(203,213,225,0.7)" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

// --- Floating Energy Particles ---
function EnergyParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 2 + Math.random() * 4,
    color: i % 3 === 0
      ? "rgba(74, 222, 128, 0.8)"
      : i % 3 === 1
        ? "rgba(56, 189, 248, 0.7)"
        : "rgba(250, 204, 21, 0.6)",
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "10%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -300 - Math.random() * 200],
            opacity: [0, 1, 1, 0],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// --- Main GlobalLoader ---
export function GlobalLoader() {

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white">
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Luck Clover Animated WebP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <LuckCloverAnimation />
        </motion.div>
      </div>
    </div>
  );
}
