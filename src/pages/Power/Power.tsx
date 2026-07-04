import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { KPICard } from "../../components/Cards/KPICard";
import { Battery, BatteryCharging, Zap, ArrowRightLeft } from "lucide-react";

const mockEnergyData = [
  { day: "Mon", energy: 120 },
  { day: "Tue", energy: 150 },
  { day: "Wed", energy: 180 },
  { day: "Thu", energy: 140 },
  { day: "Fri", energy: 200 },
  { day: "Sat", energy: 220 },
  { day: "Sun", energy: 190 },
];

export function Power() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Power Analytics</h1>
        <p className="text-muted-foreground">Energy generation, storage, and grid distribution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Current Power" value="4.5" unit="MW" trend={2.1} icon={<Zap />} />
        <KPICard title="Today's Energy" value="18.2" unit="MWh" trend={5.4} icon={<Battery />} />
        <KPICard title="Battery Level" value="85" unit="%" trend={-1.2} icon={<BatteryCharging />} />
        <KPICard title="Grid Export" value="2.1" unit="MW" trend={0.5} icon={<ArrowRightLeft />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Weekly Energy Generation (MWh)</h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockEnergyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px" }}
                  itemStyle={{ color: "#f8fafc" }}
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                />
                <Bar dataKey="energy" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">System Efficiency</h2>
          <div className="flex-1 flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-64 h-64 transform -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#10b981" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - 0.94)} 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-mono">94%</span>
              <span className="text-sm text-muted-foreground">Overall</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
