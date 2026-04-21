import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Status, RiskLevel } from "@/data/mock";

export function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    active: "bg-success-soft text-success border-success/20",
    draft: "bg-muted text-muted-foreground border-border",
    archived: "bg-secondary text-secondary-foreground border-border",
  };
  return <Badge variant="outline" className={cn("font-medium capitalize", map[status])}>{status}</Badge>;
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const map: Record<RiskLevel, string> = {
    low: "bg-success-soft text-success border-success/20",
    medium: "bg-warning-soft text-warning border-warning/20",
    high: "bg-destructive-soft text-destructive border-destructive/20",
  };
  return <Badge variant="outline" className={cn("font-medium capitalize", map[risk])}>{risk} risk</Badge>;
}
