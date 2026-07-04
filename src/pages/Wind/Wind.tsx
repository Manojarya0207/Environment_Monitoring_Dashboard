import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { KPICard } from "../../components/Cards/KPICard";
import { Wind as WindIcon, Zap, Activity } from "lucide-react";
import { ThreeScene } from "../../components/ThreeScene/ThreeScene";

const mockPowerCurveData = [
  { windSpeed: 0, power: 0 },
  { windSpeed: 2, power: 0 },
  { windSpeed: 4, power: 100 },
  { windSpeed: 6, power: 400 },
  { windSpeed: 8, power: 1000 },
  { windSpeed: 10, power: 1800 },
  { windSpeed: 12, power: 2500 }, // Rated speed
  { windSpeed: 14, power: 2500 },
  { windSpeed: 16, power: 2500 },
  { windSpeed: 20, power: 2500 },
  { windSpeed: 25, power: 0 }, // Cut-out speed
];

export function Wind() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Wind Generation</h1>
        <p className="text-muted-foreground">Turbine performance and wind characteristics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Rotor Speed" value="14.2" unit="rpm" trend={0.5} icon={<Activity />} />
        <KPICard title="Power Output" value="2.1" unit="MW" trend={5.2} icon={<Zap />} />
        <KPICard title="Wind Speed" value="11.4" unit="m/s" trend={-1.1} icon={<WindIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3D Turbine Viewer */}
        <div className="lg:col-span-2 glass rounded-3xl overflow-hidden relative border-white/5 min-h-[400px]">
          <ThreeScene />
          <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full border-primary/30">
            <span className="text-xs font-medium text-primary">Turbine T-01 Active</span>
          </div>
        </div>

        {/* Power Curve */}
        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Power Curve (MW vs m/s)</h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPowerCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="windSpeed" stroke="#94a3b8" label={{ value: 'm/s', position: 'insideBottomRight', fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px" }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Line type="monotone" dataKey="power" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
