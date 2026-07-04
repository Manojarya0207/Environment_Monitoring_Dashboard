import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { KPICard } from "../../components/Cards/KPICard";
import { Sun, SunDim, Zap } from "lucide-react";

const mockSolarData = [
  { time: "06:00", radiation: 50 },
  { time: "09:00", radiation: 400 },
  { time: "12:00", radiation: 850 },
  { time: "15:00", radiation: 600 },
  { time: "18:00", radiation: 150 },
  { time: "21:00", radiation: 0 },
];

export function Solar() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Solar Radiation</h1>
        <p className="text-muted-foreground">Photovoltaic performance and irradiance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Current Radiation" value="850" unit="W/m²" trend={12.4} icon={<Sun />} />
        <KPICard title="Peak Radiation" value="920" unit="W/m²" trend={2.1} icon={<SunDim />} />
        <KPICard title="Total Energy" value="4.2" unit="MWh" trend={-0.5} icon={<Zap />} />
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col gap-6 h-96">
        <h2 className="text-xl font-semibold">Daily Irradiance Profile</h2>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockSolarData}>
              <defs>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px" }}
                itemStyle={{ color: "#f8fafc" }}
              />
              <Area type="monotone" dataKey="radiation" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSolar)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
