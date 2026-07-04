import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { KPICard } from "../../components/Cards/KPICard";
import { Activity, TrendingUp, BarChart2 } from "lucide-react";

const mockScatterData = [
  { temp: 20, humidity: 40, wind: 5 },
  { temp: 22, humidity: 45, wind: 6 },
  { temp: 25, humidity: 50, wind: 8 },
  { temp: 28, humidity: 55, wind: 10 },
  { temp: 30, humidity: 60, wind: 12 },
  { temp: 32, humidity: 65, wind: 14 },
];

export function Analytics() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Analytics</h1>
        <p className="text-muted-foreground">Advanced correlation and historical data analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Data Points" value="1.2M" unit="" trend={5.2} icon={<BarChart2 />} />
        <KPICard title="Model Accuracy" value="98.5" unit="%" trend={0.5} icon={<Activity />} />
        <KPICard title="Efficiency Gain" value="+4.2" unit="%" trend={1.1} icon={<TrendingUp />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Temp vs Humidity Correlation</h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" dataKey="temp" name="Temperature" unit="°C" stroke="#94a3b8" />
                <YAxis type="number" dataKey="humidity" name="Humidity" unit="%" stroke="#94a3b8" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px" }}
                />
                <Legend />
                <Scatter name="Observations" data={mockScatterData} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Wind Speed vs Generation</h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" dataKey="wind" name="Wind Speed" unit="m/s" stroke="#94a3b8" />
                <YAxis type="number" dataKey="temp" name="Generation" unit="MW" stroke="#94a3b8" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px" }}
                />
                <Legend />
                <Scatter name="Power Output" data={mockScatterData} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
