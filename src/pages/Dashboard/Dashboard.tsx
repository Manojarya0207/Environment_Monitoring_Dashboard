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
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Weather Monitoring Station</h1>
        <p className="text-muted-foreground">Real-time data access for environmental sensors and power supply.</p>
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
