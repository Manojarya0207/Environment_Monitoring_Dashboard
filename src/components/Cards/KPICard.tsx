import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: number; // positive or negative percentage
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  isLoading?: boolean;
}

export function KPICard({ title, value, unit, trend, icon, className, onClick, isActive, isLoading }: KPICardProps) {
  if (isLoading) {
    return (
      <div className={cn("glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden", className)}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 bg-primary/20" />
          <Skeleton className="h-6 w-6 rounded-md bg-primary/20" />
        </div>
        <div className="flex items-end gap-2 mt-2">
          <Skeleton className="h-10 w-28 bg-primary/20" />
          {unit && <Skeleton className="h-4 w-8 mb-1 bg-primary/20" />}
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-auto">
            <Skeleton className="h-4 w-16 bg-primary/20" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300", 
        onClick && "cursor-pointer",
        isActive && "ring-2 ring-primary bg-primary/10",
        className
      )}
    >
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all",
        isActive ? "bg-primary/20" : "group-hover:bg-primary/15"
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
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={cn(
            "text-xs font-medium",
            trend >= 0 ? "text-emerald-500" : "text-red-500"
          )}>
            {Math.abs(trend)}% vs last hr
          </span>
        </div>
      )}
    </div>
  );
}
