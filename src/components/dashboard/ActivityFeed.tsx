import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityFeed } from "@/data/mock";
import { Megaphone, GraduationCap, FlaskConical, FileCheck, UserCog, AlertTriangle } from "lucide-react";

const iconMap: Record<string, any> = {
  enrollment: GraduationCap,
  submission: FileCheck,
  simulation: FlaskConical,
  faculty: UserCog,
  alert: AlertTriangle,
  announcement: Megaphone,
};

export function ActivityFeed() {
  return (
    <Card className="shadow-elev-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Activity feed</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ol className="relative space-y-4 border-l border-border pl-4">
          {activityFeed.map((a) => {
            const Icon = iconMap[a.type] ?? GraduationCap;
            return (
              <li key={a.id} className="relative">
                <span className="absolute -left-[22px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-card ring-2 ring-border">
                  <Icon className="h-2.5 w-2.5 text-muted-foreground" />
                </span>
                <p className="text-sm leading-snug">{a.text}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</p>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
