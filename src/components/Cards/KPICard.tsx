import { useState, type ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
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

export function KPICard({ 
  title, 
  value, 
  unit, 
  trend, 
  icon, 
  className, 
  onClick, 
  isActive, 
  isLoading,
}: KPICardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Limit rotation to 6 degrees max
    const rotateX = -(y / (box.height / 2)) * 6;
    const rotateY = (x / (box.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (isLoading) {
    return (
      <div className={cn("glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden premium-shadow", className)}>
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
    <motion.div 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease" : "box-shadow 0.3s ease",
      }}
      className={cn(
        "glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group premium-shadow", 
        "hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 ease-out",
        onClick && "cursor-pointer select-none",
        isActive && "ring-2 ring-primary/60 bg-primary/10 dark:bg-primary/20",
        className
      )}
    >
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-all duration-500",
        isActive ? "bg-primary/25 scale-110" : "group-hover:bg-primary/15 group-hover:scale-105"
      )} />

      <div className="flex items-center justify-between z-10">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex items-center gap-2">
          {icon && <div className="text-muted-foreground/60 transition-transform duration-300 group-hover:scale-110">{icon}</div>}
        </div>
      </div>

      <div className="flex items-end gap-2 z-10 mt-2">
        <h3 className="text-3xl font-mono font-bold tracking-tight text-foreground">{value}</h3>
        {unit && <span className="text-sm text-muted-foreground mb-1">{unit}</span>}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-auto z-10">
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
    </motion.div>
  );
}
