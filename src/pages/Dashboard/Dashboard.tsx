import { useState, useEffect } from "react";
import { KPICard } from "../../components/Cards/KPICard";
import { MetricDetailOverlay } from "../../components/Cards/MetricDetailOverlay";
import {
  Thermometer,
  Droplets,
  Sun,
  Gauge,
  Wind,
  Compass,
  CloudRain,
  SunDim,
  Battery,
  Activity
} from "lucide-react";

export function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric === selectedMetric ? null : metric);
  };

  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
    <div className="relative overflow-hidden rounded-3xl border border-sky-100/50 bg-gradient-to-r from-sky-50/60 via-white to-emerald-50/30 p-8 min-h-[160px] flex items-center shadow-[0_4px_20px_-4px_rgba(14,165,233,0.05)] dark:border-slate-800 dark:from-slate-900/90 dark:via-slate-950/60 dark:to-emerald-950/10">
      {/* CSS Animations */}
      <style>{`
        @keyframes turbine-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cloud-float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-3px) translateX(5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .animate-spin-slow {
          animation: turbine-spin 12s linear infinite;
        }
        .animate-spin-medium {
          animation: turbine-spin 9s linear infinite;
        }
        .animate-spin-fast {
          animation: turbine-spin 6s linear infinite;
        }
        .animate-float-cloud {
          animation: cloud-float 8s ease-in-out infinite;
        }
        .animate-float-cloud-slow {
          animation: cloud-float 12s ease-in-out infinite;
        }
      `}</style>

      {/* Text Info */}
      <div className="z-10 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-800 dark:text-slate-100">
          Weather Monitoring Station
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
          Real-time data access for environmental sensors and power supply.
        </p>
      </div>

      {/* Animated Landscape SVG Graphic */}
      <div className="absolute right-0 bottom-0 top-0 w-full md:w-[60%] lg:w-[50%] pointer-events-none select-none z-0 hidden sm:block">
        <svg
          viewBox="0 0 500 150"
          className="w-full h-full object-cover object-right-bottom"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="hill-grad-back" x1="250" y1="90" x2="250" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hill-grad-front" x1="350" y1="110" x2="350" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="solar-grad" x1="390" y1="90" x2="450" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            {/* Dark mode gradients */}
            <linearGradient id="hill-grad-back-dark" x1="250" y1="90" x2="250" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#064e3b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hill-grad-front-dark" x1="350" y1="110" x2="350" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Floating Clouds */}
          <g className="animate-float-cloud text-sky-100/70 dark:text-slate-800/40">
            <path
              d="M140,65 a9,9 0 0,1 11,-8 a14,14 0 0,1 23,-3 a11,11 0 0,1 14,12 a7,7 0 0,1 -7,7 L140,73 a7,7 0 0,1 0,-8 z"
              fill="currentColor"
            />
          </g>
          <g className="animate-float-cloud-slow text-sky-100/50 dark:text-slate-800/30">
            <path
              d="M80,45 a8,8 0 0,1 10,-7 a12,12 0 0,1 20,-3 a10,10 0 0,1 12,10 a6,6 0 0,1 -6,6 L80,51 a6,6 0 0,1 0,-6 z"
              fill="currentColor"
            />
          </g>

          {/* Background Hills */}
          <path
            d="M 180,150 Q 280,105 400,125 T 520,110 L 520,150 Z"
            className="fill-[url(#hill-grad-back)] dark:fill-[url(#hill-grad-back-dark)]"
          />

          {/* Foreground Hills */}
          <path
            d="M 220,150 Q 320,115 420,135 T 520,120 L 520,150 Z"
            className="fill-[url(#hill-grad-front)] dark:fill-[url(#hill-grad-front-dark)]"
          />

          {/* Wind Turbines */}
          {/* Turbine 1 (Left - Small/Background) */}
          <g className="text-slate-300 dark:text-slate-700">
            {/* Stand */}
            <path d="M 290,140 L 291.5,100 L 292.5,100 L 294,140 Z" fill="currentColor" />
            {/* Blades */}
            <g
              className="animate-spin-slow"
              style={{ transformOrigin: "292px 100px" }}
            >
              <line x1="292" y1="100" x2="292" y2="80" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="292" y1="100" x2="309.3" y2="110" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="292" y1="100" x2="274.7" y2="110" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="292" cy="100" r="1.5" fill="currentColor" />
            </g>
          </g>

          {/* Turbine 2 (Center - Medium/Midground) */}
          <g className="text-slate-400/80 dark:text-slate-600">
            {/* Stand */}
            <path d="M 315,145 L 317,90 L 319,90 L 321,145 Z" fill="currentColor" />
            {/* Blades */}
            <g
              className="animate-spin-medium"
              style={{ transformOrigin: "318px 90px" }}
            >
              <line x1="318" y1="90" x2="318" y2="62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="318" y1="90" x2="342.2" y2="104" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="318" y1="90" x2="293.8" y2="104" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="318" cy="90" r="2.5" fill="currentColor" />
            </g>
          </g>

          {/* Turbine 3 (Right - Large/Foreground) */}
          <g className="text-slate-400 dark:text-slate-500">
            {/* Stand */}
            <path d="M 345,150 L 347.5,75 L 350.5,75 L 353,150 Z" fill="currentColor" />
            {/* Blades */}
            <g
              className="animate-spin-fast"
              style={{ transformOrigin: "349px 75px" }}
            >
              <line x1="349" y1="75" x2="349" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="349" y1="75" x2="379.3" y2="92.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="349" y1="75" x2="318.7" y2="92.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="349" cy="75" r="3" fill="currentColor" />
            </g>
          </g>

          {/* Solar Panels (Tilted 3D grid) */}
          <g>
            {/* Stands */}
            <line x1="410" y1="120" x2="410" y2="135" stroke="#94a3b8" strokeWidth="2" />
            <line x1="430" y1="117" x2="430" y2="132" stroke="#94a3b8" strokeWidth="2" />
            {/* Panel Face */}
            <polygon
              points="385,115 445,110 455,127 392,133"
              fill="url(#solar-grad)"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Grid details */}
            <line x1="400" y1="113.8" x2="412.5" y2="130" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            <line x1="415" y1="112.5" x2="428.5" y2="128" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            <line x1="430" y1="111.2" x2="444.5" y2="126.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            <line x1="388" y1="124" x2="450" y2="118.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
          </g>

          {/* Flat vector Trees */}
          {/* Tree 1 (Left of turbines) */}
          <g>
            <rect x="250" y="128" width="2" height="15" fill="#854d0e" />
            <circle cx="251" cy="128" r="8" className="fill-emerald-400/90 dark:fill-emerald-600/90" />
            <circle cx="248" cy="125" r="6" className="fill-emerald-300/80 dark:fill-emerald-500/80" />
          </g>
          {/* Tree 2 (Far right) */}
          <g>
            <rect x="475" y="112" width="2.5" height="18" fill="#854d0e" />
            <circle cx="476" cy="110" r="11" className="fill-emerald-500/90 dark:fill-emerald-700/90" />
            <circle cx="479" cy="107" r="9" className="fill-emerald-400/80 dark:fill-emerald-600/80" />
          </g>
          {/* Tree 3 (Right edge) */}
          <g>
            <rect x="488" y="118" width="2" height="15" fill="#854d0e" />
            <circle cx="489" cy="116" r="8" className="fill-emerald-400/95 dark:fill-emerald-600/95" />
            <circle cx="486" cy="114" r="6" className="fill-emerald-300/85 dark:fill-emerald-500/85" />
          </g>
        </svg>
      </div>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard title="Air Temperature" value="24.5" unit="°C" icon={<Thermometer />} onClick={() => handleMetricClick("Air Temperature")} isActive={selectedMetric === "Air Temperature"} isLoading={isLoading} />
        <KPICard title="Relative Humidity" value="45" unit="%" icon={<Droplets />} onClick={() => handleMetricClick("Relative Humidity")} isActive={selectedMetric === "Relative Humidity"} isLoading={isLoading} />
        <KPICard title="Solar Radiation" value="850" unit="W/m²" icon={<Sun />} onClick={() => handleMetricClick("Solar Radiation")} isActive={selectedMetric === "Solar Radiation"} isLoading={isLoading} />
        <KPICard title="Atmospheric Pressure" value="101.2" unit="kPa" icon={<Gauge />} onClick={() => handleMetricClick("Atmospheric Pressure")} isActive={selectedMetric === "Atmospheric Pressure"} isLoading={isLoading} />
        <KPICard title="Air Quality (PM2.5)" value="22" unit="ppm" icon={<Activity />} onClick={() => handleMetricClick("Air Quality (PM2.5)")} isActive={selectedMetric === "Air Quality (PM2.5)"} isLoading={isLoading} />

        <KPICard title="Wind Speed" value="12.4" unit="m/s" icon={<Wind />} onClick={() => handleMetricClick("Wind Speed")} isActive={selectedMetric === "Wind Speed"} isLoading={isLoading} />
        <KPICard title="Wind Direction" value="NW" unit="" icon={<Compass />} onClick={() => handleMetricClick("Wind Direction")} isActive={selectedMetric === "Wind Direction"} isLoading={isLoading} />
        <KPICard title="Rainfall" value="12" unit="mm" icon={<CloudRain />} onClick={() => handleMetricClick("Rainfall")} isActive={selectedMetric === "Rainfall"} isLoading={isLoading} />
        <KPICard title="UV Index" value="6" unit="" icon={<SunDim />} onClick={() => handleMetricClick("UV Index")} isActive={selectedMetric === "UV Index"} isLoading={isLoading} />
        <KPICard title="Battery Level" value="98" unit="%" icon={<Battery />} onClick={() => handleMetricClick("Battery Level")} isActive={selectedMetric === "Battery Level"} isLoading={isLoading} />
      </div>

      {selectedMetric ? (
        <MetricDetailOverlay
          metric={selectedMetric}
          onClose={() => setSelectedMetric(null)}
        />
      ) : (
        <div className="flex-1 glass rounded-3xl overflow-hidden p-8 border-white/5 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
          <Wind className="w-24 h-24 text-primary opacity-20 mb-4" />
          <h2 className="text-2xl font-bold mb-2">System Status: Active</h2>
          <p className="text-muted-foreground max-w-lg">
            The Weather Monitoring Station is operating normally. All sensors are reporting real-time data within expected operating ranges. The 75W Solar Panel is currently charging the 12V/40AH battery.
          </p>
        </div>
      )}
    </div>
  );
}
