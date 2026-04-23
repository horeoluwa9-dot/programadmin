import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { systemAlerts } from "@/data/mock";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const map = {
  high: { icon: AlertTriangle, cls: "text-destructive bg-destructive-soft" },
  medium: { icon: AlertCircle, cls: "text-warning bg-warning-soft" },
  low: { icon: Info, cls: "text-info bg-info-soft" },
};

export function SystemAlerts() {
  const navigate = useNavigate();
  return (
    <Card className="shadow-elev-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">System alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5 pb-4">
        {systemAlerts.map((a) => {
          const M = map[a.severity];
          const Icon = M.icon;
          return (
            <button
              key={a.id}
              onClick={() => navigate("/notifications")}
              className="flex w-full gap-3 rounded-md border border-border bg-card px-3 py-2.5 text-left transition hover:border-accent hover:bg-accent-soft"
            >
              <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md", M.cls)}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{a.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
