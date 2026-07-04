import { KPICard } from "../../components/Cards/KPICard";
import { Thermometer, Droplets, Wind, Compass, Gauge, Sun } from "lucide-react";
import { ThreeScene } from "../../components/ThreeScene/ThreeScene";

export function Dashboard() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Real-time monitoring of wind and weather systems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Temperature" value="24.5" unit="°C" trend={2.3} icon={<Thermometer />} />
        <KPICard title="Humidity" value="45" unit="%" trend={-1.5} icon={<Droplets />} />
        <KPICard title="Wind Speed" value="12.4" unit="m/s" trend={5.2} icon={<Wind />} />
        <KPICard title="Wind Direction" value="NW" unit="315°" icon={<Compass />} />
        <KPICard title="Pressure" value="1012" unit="hPa" trend={0.1} icon={<Gauge />} />
        <KPICard title="Solar Radiation" value="850" unit="W/m²" trend={12.4} icon={<Sun />} />
      </div>

      <div className="flex-1 min-h-[500px] glass rounded-3xl overflow-hidden relative border-white/5">
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>
        
        {/* Overlay content on top of 3D scene */}
        <div className="absolute inset-x-8 top-8 z-10 flex justify-between pointer-events-none">
          <div className="glass p-4 rounded-xl pointer-events-auto">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Output</h3>
            <div className="text-3xl font-mono font-bold text-emerald">2.4 <span className="text-lg">MW</span></div>
          </div>
          
          <div className="glass p-4 rounded-xl pointer-events-auto">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Efficiency</h3>
            <div className="text-3xl font-mono font-bold text-primary">94.2 <span className="text-lg">%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
