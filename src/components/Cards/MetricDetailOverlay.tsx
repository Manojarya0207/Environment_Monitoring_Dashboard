import React, { useState, useEffect } from "react";
import { 
  X, 
  ArrowUp, 
  ArrowDown, 
  Activity
} from "lucide-react";

interface MetricDetailOverlayProps {
  metric: string;
  onClose: () => void;
}

interface MetricConfig {
  value: string;
  numValue: number;
  unit: string;
  min: number;
  max: number;
  high: string;
  low: string;
  status: string;
  statusType: 'success' | 'warning' | 'info' | 'error' | 'neutral';
  color: string; // Tailwind colors
  glowColor: string; // hex or rgba for ambient glows
  description: string;
}

const getMetricConfig = (metric: string): MetricConfig => {
  const m = metric.toLowerCase();
  
  if (m.includes("temperature")) {
    return {
      value: "24.5",
      numValue: 24.5,
      unit: "°C",
      min: 0,
      max: 50,
      high: "28.2°C",
      low: "19.8°C",
      status: "Normal",
      statusType: "success",
      color: "amber",
      glowColor: "rgba(245, 158, 11, 0.15)",
      description: "Air temperature indicates the thermal energy of the atmosphere."
    };
  }
  if (m.includes("humidity")) {
    return {
      value: "45",
      numValue: 45,
      unit: "%",
      min: 0,
      max: 100,
      high: "62%",
      low: "38%",
      status: "Optimal",
      statusType: "info",
      color: "sky",
      glowColor: "rgba(14, 165, 233, 0.15)",
      description: "Relative humidity measures water vapor levels in the air."
    };
  }
  if (m.includes("solar")) {
    return {
      value: "850",
      numValue: 850,
      unit: "W/m²",
      min: 0,
      max: 1200,
      high: "980 W/m²",
      low: "0 W/m²",
      status: "High Output",
      statusType: "warning",
      color: "yellow",
      glowColor: "rgba(234, 179, 8, 0.15)",
      description: "Solar radiation is the solar power received per unit area."
    };
  }
  if (m.includes("pressure")) {
    return {
      value: "101.2",
      numValue: 101.2,
      unit: "kPa",
      min: 95,
      max: 105,
      high: "102.1 kPa",
      low: "100.8 kPa",
      status: "Stable",
      statusType: "success",
      color: "emerald",
      glowColor: "rgba(16, 185, 129, 0.15)",
      description: "Atmospheric pressure is the force exerted by the weight of air."
    };
  }
  if (m.includes("quality") || m.includes("pm2.5")) {
    return {
      value: "22",
      numValue: 22,
      unit: "ppm",
      min: 0,
      max: 150,
      high: "45 ppm",
      low: "12 ppm",
      status: "Excellent",
      statusType: "success",
      color: "emerald",
      glowColor: "rgba(16, 185, 129, 0.15)",
      description: "PM2.5 particulate levels determine overall ambient air health."
    };
  }
  if (m.includes("speed")) {
    return {
      value: "12.4",
      numValue: 12.4,
      unit: "m/s",
      min: 0,
      max: 40,
      high: "22.5 m/s",
      low: "1.2 m/s",
      status: "Breezy",
      statusType: "info",
      color: "cyan",
      glowColor: "rgba(6, 182, 212, 0.15)",
      description: "Wind speed measures the rate of air movement horizontally."
    };
  }
  if (m.includes("direction")) {
    return {
      value: "NW",
      numValue: 315,
      unit: "°",
      min: 0,
      max: 360,
      high: "N (360°)",
      low: "W (270°)",
      status: "Steady",
      statusType: "neutral",
      color: "violet",
      glowColor: "rgba(139, 92, 246, 0.15)",
      description: "Compass direction indicating where wind originates."
    };
  }
  if (m.includes("rainfall")) {
    return {
      value: "12",
      numValue: 12,
      unit: "mm",
      min: 0,
      max: 100,
      high: "28 mm",
      low: "0 mm",
      status: "Moderate",
      statusType: "info",
      color: "blue",
      glowColor: "rgba(59, 130, 246, 0.15)",
      description: "Cumulative liquid precipitation measured over time."
    };
  }
  if (m.includes("uv")) {
    return {
      value: "6",
      numValue: 6,
      unit: "",
      min: 0,
      max: 11,
      high: "8 (Very High)",
      low: "0 (Low)",
      status: "Moderate Risk",
      statusType: "warning",
      color: "orange",
      glowColor: "rgba(249, 115, 22, 0.2)",
      description: "UV Index measures sunburn-producing ultraviolet radiation."
    };
  }
  if (m.includes("battery")) {
    return {
      value: "98",
      numValue: 98,
      unit: "%",
      min: 0,
      max: 100,
      high: "100%",
      low: "92%",
      status: "Good",
      statusType: "success",
      color: "emerald",
      glowColor: "rgba(16, 185, 129, 0.15)",
      description: "Main charge levels for backup power storage."
    };
  }
  
  return {
    value: "N/A",
    numValue: 0,
    unit: "",
    min: 0,
    max: 100,
    high: "N/A",
    low: "N/A",
    status: "Unknown",
    statusType: "neutral",
    color: "slate",
    glowColor: "rgba(148, 163, 184, 0.1)",
    description: "System environment metric."
  };
};

// 2D Premium Vector Visualizations
const Metric2DVisualization: React.FC<{ metric: string; config: MetricConfig }> = ({ metric, config }) => {
  const m = metric.toLowerCase();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => (p + 1) % 360);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.max(0, Math.min(100, 
    ((config.numValue - config.min) / (config.max - config.min)) * 100
  ));

  // Render individual 2D charts/designs based on metric type
  if (m.includes("temperature")) {
    const tempColor = config.numValue > 30 ? "#ef4444" : config.numValue < 15 ? "#3b82f6" : "#f59e0b";
    const mercuryHeight = (progressPercent / 100) * 120;
    
    // Animate rising heat lines
    const wave1 = Math.sin((pulse * Math.PI) / 30) * 2;
    const wave2 = Math.cos((pulse * Math.PI) / 30) * 2;
    const wave3 = Math.sin((pulse * Math.PI) / 25) * 2.5;

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 120 220" className="h-80">
          <defs>
            <linearGradient id="temp-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          
          {/* Animated Heat Waves rising next to tube */}
          <path d={`M 32,${100 - (pulse % 40)} Q ${32 + wave1},${85 - (pulse % 40)} 32,${70 - (pulse % 40)}`} fill="none" stroke={tempColor} strokeWidth="1.5" strokeLinecap="round" opacity={(40 - (pulse % 40)) / 40} />
          <path d={`M 88,${120 - ((pulse + 20) % 40)} Q ${88 + wave2},${105 - ((pulse + 20) % 40)} 88,${90 - ((pulse + 20) % 40)}`} fill="none" stroke={tempColor} strokeWidth="1.5" strokeLinecap="round" opacity={(40 - ((pulse + 20) % 40)) / 40} />
          <path d={`M 60,${45 - (pulse % 25)} Q ${60 + wave3},${35 - (pulse % 25)} 60,${25 - (pulse % 25)}`} fill="none" stroke={tempColor} strokeWidth="1.5" strokeLinecap="round" opacity={(25 - (pulse % 25)) / 25} />

          {/* Glass tube backing */}
          <rect x="54" y="30" width="12" height="140" rx="6" fill="rgba(148, 163, 184, 0.15)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
          <circle cx="60" cy="175" r="18" fill="rgba(148, 163, 184, 0.15)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
          {/* Temperature fluid */}
          <rect x="56" y={170 - mercuryHeight} width="8" height={mercuryHeight} rx="4" fill="url(#temp-grad)" />
          <circle cx="60" cy="175" r="14" fill={tempColor} />
          {/* Tick marks */}
          {[30, 54, 78, 102, 126, 150].map((y, idx) => (
            <line key={idx} x1="70" y1={y} x2="78" y2={y} stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1.5" />
          ))}
        </svg>
        <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-4">{config.value}°C</span>
      </div>
    );
  }

  if (m.includes("humidity")) {
    const waveOffset = Math.sin((pulse * Math.PI) / 180) * 4;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 120 120" className="w-64 h-64">
          <defs>
            <clipPath id="drop-clip">
              <path d="M60,10 C60,10 95,55 95,78 C95,97.3 79.3,113 60,113 C40.7,113 25,97.3 25,78 C25,55 60,10 60,10 Z" />
            </clipPath>
          </defs>
          {/* Outer glow droplet path */}
          <path 
            d="M60,10 C60,10 95,55 95,78 C95,97.3 79.3,113 60,113 C40.7,113 25,97.3 25,78 C25,55 60,10 60,10 Z" 
            fill="rgba(148, 163, 184, 0.15)" 
            stroke="#0ea5e9" 
            strokeWidth="3" 
          />
          {/* Filled Wave clip */}
          <g clipPath="url(#drop-clip)">
            {/* Water Wave fill */}
            <path 
              d={`M-10,${110 - (progressPercent * 0.9) + waveOffset} Q25,${100 - (progressPercent * 0.9) - waveOffset} 60,${110 - (progressPercent * 0.9) + waveOffset} T130,${110 - (progressPercent * 0.9)} L130,120 L-10,120 Z`} 
              fill="#0284c7" 
              opacity="0.85" 
            />
            <path 
              d={`M-10,${115 - (progressPercent * 0.9) - waveOffset} Q25,${105 - (progressPercent * 0.9) + waveOffset} 60,${115 - (progressPercent * 0.9) - waveOffset} T130,${115 - (progressPercent * 0.9)} L130,120 L-10,120 Z`} 
              fill="#38bdf8" 
              opacity="0.5" 
            />
          </g>
        </svg>
        <span className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mt-4">{config.value}%</span>
      </div>
    );
  }

  if (m.includes("solar")) {
    const sunAngle = pulse * 0.5;
    const rayLength = 32 + Math.sin(pulse * 0.1) * 3;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 100" className="w-60 h-60">
          <g transform={`rotate(${sunAngle} 50 50)`}>
            <circle cx="50" cy="50" r="16" fill="#eab308" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angleDeg = i * 45;
              const rad = (angleDeg * Math.PI) / 180;
              const x1 = 50 + Math.cos(rad) * 22;
              const y1 = 50 + Math.sin(rad) * 22;
              const x2 = 50 + Math.cos(rad) * rayLength;
              const y2 = 50 + Math.sin(rad) * rayLength;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
              );
            })}
          </g>
          {/* Inner solar overlay grids */}
          <circle cx="50" cy="50" r="8" fill="#fef08a" opacity="0.3" className="animate-ping" />
        </svg>
        <span className="text-3xl font-extrabold text-yellow-600 dark:text-yellow-500 mt-4">{config.value} W/m²</span>
      </div>
    );
  }

  if (m.includes("pressure")) {
    const minP = 95;
    const maxP = 105;
    const normalized = Math.min(Math.max((config.numValue - minP) / (maxP - minP), 0), 1);
    // Add micro needle vibration to simulate wind gusts or pressure changes
    const needleAngle = -120 + (normalized * 240) + Math.sin(pulse * 0.25) * 1.2;
    // Radial pulsing rings behind dial
    const rippleRadius = 50 + Math.sin(pulse * 0.05) * 4;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 120 120" className="w-64 h-64">
          {/* Pulsing Outer Glow */}
          <circle cx="60" cy="60" r={rippleRadius} fill="none" stroke="#10b981" strokeWidth="1" opacity={0.25} />
          {/* Dial outline */}
          <circle cx="60" cy="60" r="50" fill="currentColor" className="text-black/5 dark:text-slate-900/60" stroke="#10b981" strokeWidth="3" />
          <path d="M22,85 A45,45 0 1,1 98,85" fill="none" stroke="currentColor" className="text-black/10 dark:text-white/10" strokeWidth="6" strokeLinecap="round" />
          <path d="M22,85 A45,45 0 1,1 98,85" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${progressPercent * 2.2} 250`} strokeLinecap="round" />
          {/* Dial center */}
          <circle cx="60" cy="60" r="6" fill="currentColor" className="text-slate-800 dark:text-slate-200" />
          {/* Needle */}
          <g transform={`rotate(${needleAngle} 60 60)`}>
            <line x1="60" y1="60" x2="60" y2="25" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>
        <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-4">{config.value} kPa</span>
      </div>
    );
  }

  if (m.includes("quality") || m.includes("pm2.5")) {
    const particles = Array.from({ length: 25 }).map((_, i) => ({
      cx: 15 + Math.abs(Math.sin(i * 99)) * 70 + Math.sin(pulse * 0.05 + i) * 5,
      cy: 15 + Math.abs(Math.cos(i * 123)) * 70 + Math.cos(pulse * 0.05 + i) * 5,
      r: 1.5 + Math.abs(Math.sin(i * 15)) * 3.5,
    }));
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 100" className="w-60 h-60">
          <circle cx="50" cy="50" r="45" fill="rgba(148, 163, 184, 0.1)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
          {particles.map((p, idx) => (
            <circle 
              key={idx} 
              cx={p.cx} 
              cy={p.cy} 
              r={p.r} 
              fill={config.numValue < 35 ? "#10b981" : config.numValue < 75 ? "#f59e0b" : "#ef4444"} 
              opacity="0.75" 
            />
          ))}
        </svg>
        <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-4">{config.value} ppm</span>
      </div>
    );
  }

  if (m.includes("speed")) {
    const spinAngle = pulse * (config.numValue * 0.5);
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 100" className="w-60 h-60">
          {/* Turbine Pole */}
          <line x1="50" y1="50" x2="50" y2="90" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="4" />
          <line x1="42" y1="90" x2="58" y2="90" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="3" />
          {/* Blades group */}
          <g transform={`rotate(${spinAngle} 50 50)`}>
            <circle cx="50" cy="50" r="5" fill="currentColor" className="text-slate-600 dark:text-slate-400" />
            {[0, 120, 240].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 50 50)`}>
                <path d="M48.5,15 Q50,12 51.5,15 L51,50 L49,50 Z" fill="rgba(241, 245, 249, 0.9)" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.5" />
              </g>
            ))}
          </g>
        </svg>
        <span className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-4">{config.value} m/s</span>
      </div>
    );
  }

  if (m.includes("direction")) {
    // Add needle swing to directional compass to represent fluttering wind direction
    const swingAngle = Math.sin(pulse * 0.09) * 3.5;
    const deg = config.numValue + swingAngle;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 100" className="w-60 h-60">
          {/* Compass Face */}
          <circle cx="50" cy="50" r="45" fill="currentColor" className="text-black/5 dark:text-slate-900/60" stroke="#8b5cf6" strokeWidth="2.5" />
          {/* Cardinal Directions */}
          <text x="50" y="20" fill="#8b5cf6" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
          <text x="82" y="53" fill="currentColor" className="text-slate-700 dark:text-slate-400" fontSize="8" fontWeight="bold" textAnchor="middle">E</text>
          <text x="50" y="86" fill="currentColor" className="text-slate-700 dark:text-slate-400" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
          <text x="18" y="53" fill="currentColor" className="text-slate-700 dark:text-slate-400" fontSize="8" fontWeight="bold" textAnchor="middle">W</text>
          {/* Directional needle */}
          <g transform={`rotate(${deg} 50 50)`}>
            <polygon points="50,15 56,50 44,50" fill="#ef4444" />
            <polygon points="50,85 56,50 44,50" fill="currentColor" className="text-slate-400 dark:text-slate-600" />
            <circle cx="50" cy="50" r="4" fill="currentColor" className="text-slate-900 dark:text-slate-100" />
          </g>
        </svg>
        <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 mt-4">{config.value} ({config.numValue}°)</span>
      </div>
    );
  }

  if (m.includes("rainfall")) {
    const rainDrops = Array.from({ length: 8 }).map((_, i) => ({
      x: 20 + i * 8,
      y: 35 + ((pulse * 1.8 + i * 25) % 40),
    }));
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 100" className="w-60 h-60">
          {/* Cloud representation */}
          <path d="M20,40 a10,10 0 0,1 15,-5 a15,15 0 0,1 28,-3 a11,11 0 0,1 15,11 a8,8 0 0,1 -8,8 L20,51 a8,8 0 0,1 0,-11 z" fill="currentColor" className="text-slate-500 dark:text-slate-400" />
          {/* Falling raindrops */}
          {rainDrops.map((drop, idx) => (
            <line key={idx} x1={drop.x} y1={drop.y} x2={drop.x} y2={drop.y + 6} stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          {/* Water Collection Beaker */}
          <path d="M 25,85 L 75,85 L 70,65 L 30,65 Z" fill="none" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="2.5" />
          {/* Water Level */}
          <path d={`M 27.5,83 L 72.5,83 L 71,${83 - (progressPercent * 0.15)} L 29,${83 - (progressPercent * 0.15)} Z`} fill="#2563eb" opacity="0.8" />
        </svg>
        <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-4">{config.value} mm</span>
      </div>
    );
  }

  if (m.includes("uv")) {
    const uvArcPulse = 8 + Math.sin(pulse * 0.1) * 2;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 100" className="w-60 h-60">
          {/* Pulsing UV border */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-black/5 dark:text-white/10" strokeWidth={uvArcPulse} />
          {/* UV arc meter */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#f97316" 
            strokeWidth={uvArcPulse} 
            strokeDasharray={`${progressPercent * 2.5} 250`} 
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="28" fill="currentColor" className="text-white dark:text-slate-900" />
          <text x="50" y="56" fill="#f97316" fontSize="18" fontWeight="black" textAnchor="middle">{config.value}</text>
        </svg>
        <span className="text-2xl font-extrabold text-orange-600 dark:text-orange-500 mt-4">{config.status}</span>
      </div>
    );
  }

  if (m.includes("battery")) {
    const chargeColor = config.numValue > 50 ? "#10b981" : config.numValue > 20 ? "#eab308" : "#ef4444";
    const fillWidth = progressPercent * 0.54;
    // Generate floating bubbles rising up inside battery core
    const bubbles = Array.from({ length: 4 }).map((_, i) => ({
      x: 22 + ((i * 12 + (pulse * 0.2)) % fillWidth),
      y: 16 + Math.sin(pulse * 0.05 + i) * 6 + ((pulse + i * 25) % 18),
    }));

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-transparent">
        <svg viewBox="0 0 100 60" className="w-80 h-52">
          {/* Battery Outer shell */}
          <rect x="15" y="10" width="60" height="40" rx="6" fill="none" stroke="currentColor" className="text-slate-600 dark:text-slate-400" strokeWidth="4" />
          {/* Anode Terminal */}
          <rect x="75" y="22" width="6" height="16" rx="2" fill="currentColor" className="text-slate-600 dark:text-slate-400" />
          {/* Battery inner fill */}
          <rect x="18" y="13" width={fillWidth} height="34" rx="3" fill={chargeColor} className="transition-all duration-1000" />
          {/* Rising bubbles */}
          {bubbles.map((b, idx) => (
            <circle key={idx} cx={b.x} cy={b.y} r="1.5" fill="#ffffff" opacity="0.6" />
          ))}
          {/* Lightning charge symbol with pulse scale */}
          {config.numValue > 90 && (
            <path d="M48,18 L38,32 L46,32 L42,42 L52,28 L44,28 Z" fill="#ffffff" opacity={0.6 + Math.sin(pulse * 0.15) * 0.3} />
          )}
        </svg>
        <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-4">{config.value}%</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-transparent">
      <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{config.value} {config.unit}</span>
    </div>
  );
};

export function MetricDetailOverlay({ metric, onClose }: MetricDetailOverlayProps) {
  const config = getMetricConfig(metric);

  // Calculate percentage fill for the gauge
  const progressPercent = Math.max(0, Math.min(100, 
    ((config.numValue - config.min) / (config.max - config.min)) * 100
  ));

  // Determine status color pills
  const getStatusStyle = () => {
    switch (config.statusType) {
      case "success":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "warning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "info":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "error":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  const themeGlow = {
    boxShadow: `0 10px 30px -10px ${config.glowColor}, inset 0 1px 0 0 rgba(255,255,255,0.05)`,
  };

  return (
    <div 
      className="flex-1 glass rounded-3xl overflow-hidden p-8 border border-white/10 relative flex flex-col gap-8 animate-in fade-in zoom-in duration-300 backdrop-blur-2xl"
      style={themeGlow}
    >
      {/* Background ambient radial glow */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full filter blur-[100px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: config.glowColor.replace(/[^,]+(?=\))/, '0.4') }}
      />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header section */}
      <div className="z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Sensor Live Data</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          {metric} Details
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 z-10">
        
        {/* Left Side: Premium Metric Hero Stat & Gauge */}
        <div className="flex flex-col justify-between gap-6">
          
          {/* Main Hero Card */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 dark:from-slate-950/40 dark:to-slate-950/20 border border-white/5 rounded-2xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden shadow-inner group hover:border-white/10 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1">Current Measurement</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">{config.value}</span>
                  <span className="text-2xl font-medium text-muted-foreground">{config.unit}</span>
                </div>
              </div>
              
              <div className={`px-2.5 py-1 rounded-full border text-[11px] font-bold flex items-center gap-1 shadow-sm ${getStatusStyle()}`}>
                <Activity className="w-3.5 h-3.5" />
                {config.status}
              </div>
            </div>

            {/* Premium Gauge Meter */}
            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1.5">
                <span>MIN: {config.min}{config.unit}</span>
                <span>MAX: {config.max}{config.unit}</span>
              </div>
              <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r`}
                  style={{ 
                    width: `${progressPercent}%`,
                    backgroundImage: `linear-gradient(to right, var(--color-${config.color}), var(--color-${config.color}-alert, var(--color-${config.color})))`
                  }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-[9px] font-bold text-muted-foreground">Range Utilization: {progressPercent.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* High/Low Grid Card */}
          <div className="grid grid-cols-2 gap-4">
            {/* 24h High */}
            <div className="bg-white/5 dark:bg-slate-950/20 border border-white/5 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-white/10 transition-all duration-300 group">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">24h Peak</span>
                <span className="text-lg font-extrabold tracking-tight">{config.high}</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                <ArrowUp className="w-4 h-4" />
              </div>
            </div>

            {/* 24h Low */}
            <div className="bg-white/5 dark:bg-slate-950/20 border border-white/5 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-white/10 transition-all duration-300 group">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">24h Dip</span>
                <span className="text-lg font-extrabold tracking-tight">{config.low}</span>
              </div>
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Clean White 2D Visualizer Area (Removed outer container border/shadow/bg and made responsive/adaptive) */}
        <div className="flex flex-col min-h-[460px] justify-center items-center relative overflow-hidden flex-1 animate-in fade-in duration-300">
          <Metric2DVisualization metric={metric} config={config} />
        </div>

      </div>
    </div>
  );
}
