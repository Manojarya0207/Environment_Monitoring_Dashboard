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
      {/* Left side: Date & Time */}
      <div className="hidden md:flex flex-col items-start">
        <span className="text-sm font-medium text-foreground">
          {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {time.toLocaleTimeString()}
        </span>
      </div>

      {/* Right side: Status and Bell */}
      <div className="flex items-center gap-6">
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
