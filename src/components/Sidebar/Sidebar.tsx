import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CloudSun, 
  Wind, 
  Battery, 
  Sun, 
  BarChart3, 
  FileText, 
  Settings 
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Weather", path: "/weather", icon: CloudSun },
  { name: "Wind", path: "/wind", icon: Wind },
  { name: "Power", path: "/power", icon: Battery },
  { name: "Solar", path: "/solar", icon: Sun },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="glass w-64 h-screen fixed left-0 top-0 border-r border-border flex flex-col z-40 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <Wind className="text-primary w-8 h-8" />
        <span className="text-xl font-bold text-foreground">WindSphere AI</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              OP
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Operator</p>
              <p className="text-xs text-muted-foreground">Active Shift</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
