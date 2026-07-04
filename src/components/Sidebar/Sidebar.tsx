import { NavLink } from "react-router-dom";
import {
  LayoutDashboard
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
];

export function Sidebar() {
  return (
    <aside className="glass w-64 h-screen fixed left-0 top-0 border-r border-border flex flex-col z-40 hidden md:flex">
      <div className="p-6 flex items-center gap-3">

        <span className="text-xl font-bold text-foreground">Environment Monitoring System</span>
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
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>


    </aside>
  );
}
