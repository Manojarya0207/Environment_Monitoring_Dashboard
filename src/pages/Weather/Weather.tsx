import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { KPICard } from "../../components/Cards/KPICard";
import { Thermometer, Droplets, CloudRain } from "lucide-react";

const mockWeatherData = [
  { time: "00:00", temp: 22, humidity: 45, pressure: 1010 },
  { time: "04:00", temp: 21, humidity: 48, pressure: 1009 },
  { time: "08:00", temp: 24, humidity: 42, pressure: 1012 },
  { time: "12:00", temp: 28, humidity: 35, pressure: 1015 },
  { time: "16:00", temp: 27, humidity: 38, pressure: 1014 },
  { time: "20:00", temp: 25, humidity: 44, pressure: 1011 },
];

export function Weather() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Weather Monitoring</h1>
        <p className="text-muted-foreground">Detailed meteorological data and forecasting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Avg Temperature" value="24.5" unit="°C" trend={1.2} icon={<Thermometer />} />
        <KPICard title="Avg Humidity" value="42" unit="%" trend={-2.4} icon={<Droplets />} />
        <KPICard title="Total Rainfall" value="12" unit="mm" trend={0} icon={<CloudRain />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Temperature Chart */}
        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Temperature Trend (24h)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeatherData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Chart */}
        <div className="glass p-6 rounded-3xl flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Humidity Trend (24h)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeatherData}>
                <defs>
                  <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px" }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Area type="monotone" dataKey="humidity" stroke="#06b6d4" fillOpacity={1} fill="url(#colorHumidity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
