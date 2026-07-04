import { X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ModelContainer from "../ui/ModelContainer";

interface MetricDetailOverlayProps {
  metric: string;
  onClose: () => void;
}

export function MetricDetailOverlay({ metric, onClose }: MetricDetailOverlayProps) {
  // Generate 24 hours of mock data for the selected metric
  const mockData = Array.from({ length: 24 }).map((_, i) => {
    // Generate some random looking but somewhat continuous data
    const baseValue = metric.toLowerCase().includes("temperature") ? 20
      : metric.toLowerCase().includes("humidity") ? 45
        : 10;

    return {
      time: `${i}:00`,
      value: baseValue + Math.sin(i / 3) * 5 + Math.random() * 2,
    };
  });

  // Determine gradient colors based on metric
  const getGradientColors = () => {
    const m = metric.toLowerCase();
    if (m.includes("temperature")) {
      return { start: "var(--color-amber)", end: "var(--color-red-alert)" };
    }
    if (m.includes("humidity")) {
      return { start: "var(--color-primary-blue)", end: "var(--color-cyan)" };
    }
    if (m.includes("wind")) {
      return { start: "var(--color-cyan)", end: "var(--color-emerald)" };
    }
    if (m.includes("power") || m.includes("energy") || m.includes("battery")) {
      return { start: "var(--color-emerald)", end: "var(--color-cyan)" };
    }
    return { start: "var(--color-primary)", end: "var(--color-accent)" };
  };

  const colors = getGradientColors();

  return (
    <div className="flex-1 glass rounded-3xl overflow-hidden p-8 border-white/5 relative flex flex-col gap-8 animate-in fade-in zoom-in duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div>
        <h2 className="text-2xl font-bold mb-2">{metric} Details</h2>
        <p className="text-muted-foreground mb-6">Historical data and real-time visualization for the last 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Analytics Chart Section */}
        <div className="flex-1 flex flex-col min-h-[300px] bg-black/10 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.start} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={colors.end} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colors.start} />
                  <stop offset="100%" stopColor={colors.end} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,150,0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--color-foreground)' }}
              />
              <Area type="monotone" dataKey="value" stroke="url(#lineColor)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 3D Model Visualization Section */}
        <div className="flex-1 flex flex-col min-h-[300px]">
          <ModelContainer className="w-full h-full rounded-2xl bg-black/20 overflow-hidden" />
        </div>
      </div>
    </div>
  );
}
