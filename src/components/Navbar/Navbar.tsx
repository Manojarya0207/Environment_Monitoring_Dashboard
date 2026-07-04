import { Search, Bell } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass h-20 w-full fixed top-0 left-0 md:pl-64 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155]" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search dashboards, metrics, reports..."
            className="w-full bg-white border border-[#e2e8f0] rounded-full pl-12 pr-4 py-2.5 text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#cbd5e1] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-foreground">
            {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {time.toLocaleTimeString()}
          </span>
        </div>

        <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border-emerald/20 bg-emerald/10">
          <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="text-xs font-medium text-emerald">System Nominal</span>
        </div>

        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-alert rounded-full" />
        </button>
      </div>
    </header>
  );
}
