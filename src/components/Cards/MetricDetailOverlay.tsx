import { X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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

  return (
    <div className="flex-1 glass rounded-3xl overflow-hidden p-8 border-white/5 relative flex flex-col gap-8 animate-in fade-in zoom-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Analytics Section */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold mb-2">{metric} Details</h2>
        <p className="text-muted-foreground mb-6">Historical data and real-time visualization for the last 24 hours.</p>
        
        <div className="flex-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(0,0,0,0.4)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(0,0,0,0.4)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#0f172a' }}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
