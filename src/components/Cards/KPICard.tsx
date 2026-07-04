import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: number; // positive or negative percentage
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function KPICard({ title, value, unit, trend, icon, className, onClick, isActive }: KPICardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group hover:bg-white/10 transition-all", 
        onClick && "cursor-pointer",
        isActive && "ring-2 ring-primary bg-white/10",
        className
      )}
    >
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all",
        isActive ? "bg-primary/30" : "group-hover:bg-primary/20"
      )} />

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <div className="text-muted-foreground/50">{icon}</div>}
      </div>

      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-mono font-bold tracking-tight text-foreground">{value}</h3>
        {unit && <span className="text-sm text-muted-foreground mb-1">{unit}</span>}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-auto">
          {trend >= 0 ? (
            <ArrowUpRight className="w-4 h-4 text-emerald" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-alert" />
          )}
          <span className={cn(
            "text-xs font-medium",
            trend >= 0 ? "text-emerald" : "text-red-alert"
          )}>
            {Math.abs(trend)}% vs last hr
          </span>
        </div>
      )}
    </div>
  );
}
