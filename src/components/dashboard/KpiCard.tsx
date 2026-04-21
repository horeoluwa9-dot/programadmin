import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: ReactNode;
  delta?: { value: number; suffix?: string };
  icon?: LucideIcon;
  accent?: "primary" | "accent" | "success" | "warning" | "destructive" | "info";
  hint?: string;
}

const accentMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent-soft text-accent-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  destructive: "bg-destructive-soft text-destructive",
  info: "bg-info-soft text-info",
};

export function KpiCard({ label, value, delta, icon: Icon, accent = "primary", hint }: KpiCardProps) {
  const positive = delta && delta.value >= 0;
  return (
    <Card className="shadow-elev-sm hover:shadow-elev-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <div className="mt-1.5 kpi-number">{value}</div>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          {Icon && (
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md", accentMap[accent])}>
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
        </div>
        {delta && (
          <div className="mt-3 flex items-center gap-1 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium",
                positive ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive",
              )}
            >
              {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(delta.value)}{delta.suffix ?? "%"}
            </span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
