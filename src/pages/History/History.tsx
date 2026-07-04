import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
  Thermometer,
  Droplets,
  Sun,
  Gauge,
  Wind,
  Compass,
  CloudRain,
  SunDim,
  Battery,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { WeatherParticles } from "../../components/Effects/WeatherParticles";

// List of metrics mirroring dashboard cards
const METRICS = [
  { id: "air-temperature", name: "Air Temperature", unit: "°C", icon: Thermometer, color: "#f59e0b", min: 15, max: 35 },
  { id: "relative-humidity", name: "Relative Humidity", unit: "%", icon: Droplets, color: "#0ea5e9", min: 30, max: 80 },
  { id: "solar-radiation", name: "Solar Radiation", unit: "W/m²", icon: Sun, color: "#eab308", min: 0, max: 1000 },
  { id: "atmospheric-pressure", name: "Atmospheric Pressure", unit: "kPa", icon: Gauge, color: "#10b981", min: 98, max: 104 },
  { id: "air-quality", name: "Air Quality (PM2.5)", unit: "ppm", icon: Activity, color: "#10b981", min: 5, max: 75 },
  { id: "wind-speed", name: "Wind Speed", unit: "m/s", icon: Wind, color: "#06b6d4", min: 0, max: 25 },
  { id: "wind-direction", name: "Wind Direction", unit: "°", icon: Compass, color: "#8b5cf6", min: 0, max: 360 },
  { id: "rainfall", name: "Rainfall", unit: "mm", icon: CloudRain, color: "#3b82f6", min: 0, max: 50 },
  { id: "uv-index", name: "UV Index", unit: "", icon: SunDim, color: "#f59e0b", min: 0, max: 11 },
  { id: "battery-level", name: "Battery Level", unit: "%", icon: Battery, color: "#10b981", min: 80, max: 100 }
];

interface HistoricalRecord {
  date: string;
  metricId: string;
  metricName: string;
  value: number;
  unit: string;
  status: string;
}

// Helper to generate mock historical data for the last 30 days
const generateMockData = (): HistoricalRecord[] => {
  const data: HistoricalRecord[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    
    // Generate values for each metric for this day
    METRICS.forEach(metric => {
      // Create a wave pattern with some random variation
      const dayFactor = Math.sin(i / 3) * 0.4 + 0.6; // oscillates
      const randomFactor = Math.random() * 0.2 + 0.9; // random noise
      let value = metric.min + (metric.max - metric.min) * dayFactor * randomFactor;
      
      // Keep value in range
      value = Math.max(metric.min, Math.min(metric.max, value));
      
      // Round to 1 decimal place or integer
      const formattedValue = metric.id === "uv-index" ? Math.round(value) : parseFloat(value.toFixed(1));
      
      // Status message mapping
      let status = "Normal";
      if (metric.id === "air-quality" && formattedValue > 50) status = "Moderate";
      else if (metric.id === "air-temperature" && formattedValue > 30) status = "High Temp";
      else if (metric.id === "relative-humidity" && formattedValue > 70) status = "Humid";
      
      data.push({
        date: dateString,
        metricId: metric.id,
        metricName: metric.name,
        value: formattedValue,
        unit: metric.unit,
        status
      });
    });
  }
  return data;
};

const MOCK_DATA = generateMockData();

export function HistoryPage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const thirtyDaysAgoStr = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(thirtyDaysAgoStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [selectedMetricId, setSelectedMetricId] = useState("air-temperature");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered data based on Date, Metric, and Search query
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((item) => {
      const matchDate = item.date >= startDate && item.date <= endDate;
      const matchMetric = item.metricId === selectedMetricId;
      const matchSearch = item.metricName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.status.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDate && matchMetric && matchSearch;
    });
  }, [startDate, endDate, selectedMetricId, searchQuery]);

  // Statistics calculations
  const stats = useMemo(() => {
    if (filteredData.length === 0) return { min: 0, max: 0, avg: 0, count: 0 };
    const values = filteredData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    return {
      min: parseFloat(min.toFixed(1)),
      max: parseFloat(max.toFixed(1)),
      avg: parseFloat(avg.toFixed(1)),
      count: filteredData.length
    };
  }, [filteredData]);

  // Recharts structured data
  const chartData = useMemo(() => {
    return [...filteredData].sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredData]);

  const activeMetric = useMemo(() => {
    return METRICS.find(m => m.id === selectedMetricId) || METRICS[0];
  }, [selectedMetricId]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleExportCSV = () => {
    const headers = ["Date", "Metric", "Value", "Unit", "Status"];
    const csvRows = [headers.join(",")];

    filteredData.forEach((item) => {
      const row = [
        item.date,
        `"${item.metricName}"`,
        item.value,
        `"${item.unit}"`,
        `"${item.status}"`
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sensor_history_${selectedMetricId}_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setStartDate(thirtyDaysAgoStr);
    setEndDate(todayStr);
    setSelectedMetricId("air-temperature");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const MetricIcon = activeMetric.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 pb-24 min-h-full flex flex-col gap-8 relative overflow-hidden md:pl-72 animate-fade-in"
    >
      <WeatherParticles />

      {/* Header section */}
      <div className="z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Sensor History
          </h1>
          <p className="text-muted-foreground text-sm">
            Analyze historical sensor trends and filter data by date and metric types.
          </p>
        </div>
        
        <button
          onClick={handleExportCSV}
          disabled={filteredData.length === 0}
          className="glass px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border-white/10 hover:bg-white/10 active:scale-95 transition-all text-foreground cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      {/* Filter panel */}
      <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-end z-10">
        <div className="w-full md:w-auto flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary" /> Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="glass w-full px-3 py-2 rounded-xl text-sm border-white/10 text-slate-800 dark:text-white bg-white/80 dark:bg-slate-900 focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary" /> End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="glass w-full px-3 py-2 rounded-xl text-sm border-white/10 text-slate-800 dark:text-white bg-white/80 dark:bg-slate-900 focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* Metric Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
              <Filter className="w-3 h-3 text-primary" /> Sensor Metric
            </label>
            <select
              value={selectedMetricId}
              onChange={(e) => {
                setSelectedMetricId(e.target.value);
                setCurrentPage(1);
              }}
              className="glass w-full px-3 py-2 rounded-xl text-sm border-white/10 text-slate-800 dark:text-white bg-white/80 dark:bg-slate-900 focus:outline-none focus:border-primary/50"
            >
              {METRICS.map((metric) => (
                <option key={metric.id} value={metric.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                  {metric.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleResetFilters}
            className="glass w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Overview stats & chart */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 z-10">
          
          {/* Stats overview cards */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Avg Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between h-32">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Average Reading</span>
                <h3 className="text-3xl font-extrabold mt-1 text-foreground">
                  {stats.avg}
                  <span className="text-sm font-semibold text-muted-foreground ml-1">{activeMetric.unit}</span>
                </h3>
              </div>
              <div className="flex items-center justify-between text-xs text-primary/70 font-medium">
                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Trend Baseline</span>
                <MetricIcon className="w-5 h-5 opacity-60" style={{ color: activeMetric.color }} />
              </div>
            </div>

            {/* Max Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between h-32">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Maximum peak</span>
                <h3 className="text-3xl font-extrabold mt-1 text-foreground">
                  {stats.max}
                  <span className="text-sm font-semibold text-muted-foreground ml-1">{activeMetric.unit}</span>
                </h3>
              </div>
              <div className="text-xs text-emerald font-medium">
                Highest recorded value
              </div>
            </div>

            {/* Min Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between h-32">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Minimum dip</span>
                <h3 className="text-3xl font-extrabold mt-1 text-foreground">
                  {stats.min}
                  <span className="text-sm font-semibold text-muted-foreground ml-1">{activeMetric.unit}</span>
                </h3>
              </div>
              <div className="text-xs text-sky font-medium">
                Lowest recorded value
              </div>
            </div>
          </div>

          {/* Chart Panel */}
          <div className="lg:col-span-3 glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-md font-semibold text-foreground flex items-center gap-2">
                <MetricIcon className="w-4 h-4" style={{ color: activeMetric.color }} />
                {activeMetric.name} Timeline
              </h3>
              <p className="text-xs text-muted-foreground">Graphical trends for selected period.</p>
            </div>
            
            <div className="w-full h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeMetric.color} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={activeMetric.color} stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.4)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.4)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(15, 23, 42, 0.9)", 
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      color: "#fff"
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={activeMetric.color} 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass p-12 rounded-2xl border border-white/10 text-center z-10">
          <p className="text-muted-foreground text-sm">No historical records match your filter criteria.</p>
        </div>
      )}

      {/* Raw log table */}
      {filteredData.length > 0 && (
        <div className="glass rounded-2xl border border-white/10 overflow-hidden z-10">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-foreground">Detailed Historical Log</h3>
              <p className="text-xs text-muted-foreground">List of all telemetry ticks matching filters.</p>
            </div>
            <span className="text-xs bg-white/5 px-2.5 py-1 rounded-full font-mono text-muted-foreground">
              {filteredData.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white/2 border-b border-white/5 text-muted-foreground text-xs uppercase font-semibold">
                  <th className="p-4 pl-6">Timestamp / Date</th>
                  <th className="p-4">Sensor Parameter</th>
                  <th className="p-4">Reading</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedData.map((item, index) => {
                  const MIcon = activeMetric.icon;
                  return (
                    <tr key={index} className="hover:bg-white/2 transition-colors">
                      <td className="p-4 pl-6 font-mono text-xs">{item.date} 12:00 PM</td>
                      <td className="p-4 flex items-center gap-2">
                        <MIcon className="w-4 h-4" style={{ color: activeMetric.color }} />
                        <span className="font-medium text-foreground">{item.metricName}</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-foreground">
                        {item.value} {item.unit}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          item.status === "Normal" || item.status === "Optimal"
                            ? "bg-emerald/10 text-emerald border-emerald/20"
                            : "bg-amber/10 text-amber border-amber/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === "Normal" || item.status === "Optimal"
                              ? "bg-emerald"
                              : "bg-amber"
                          }`} />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="glass p-2 rounded-lg border-white/10 hover:bg-white/5 disabled:opacity-50 text-foreground cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="glass p-2 rounded-lg border-white/10 hover:bg-white/5 disabled:opacity-50 text-foreground cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
