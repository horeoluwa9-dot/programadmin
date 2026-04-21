import { engagementHeatmap } from "@/data/mock";
import { cn } from "@/lib/utils";

export function EngagementHeatmap() {
  const all = engagementHeatmap.flatMap((d) => d.values.map((v) => v.value));
  const max = Math.max(...all);
  const colorFor = (v: number) => {
    const t = v / max;
    if (t < 0.25) return "bg-muted";
    if (t < 0.5) return "bg-accent/30";
    if (t < 0.75) return "bg-accent/60";
    return "bg-accent";
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 pl-10 text-[10px] text-muted-foreground">
        {engagementHeatmap[0].values.map((v) => (
          <div key={v.hour} className="w-7 text-center">{v.hour}h</div>
        ))}
      </div>
      {engagementHeatmap.map((row) => (
        <div key={row.day} className="flex items-center gap-1.5">
          <div className="w-9 shrink-0 text-xs font-medium text-muted-foreground">{row.day}</div>
          {row.values.map((v) => (
            <div
              key={v.hour}
              title={`${row.day} ${v.hour}:00 — ${v.value}% engagement`}
              className={cn("h-7 w-7 rounded transition", colorFor(v.value))}
            />
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2 pl-10 pt-2 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="h-2.5 w-2.5 rounded bg-muted" />
        <div className="h-2.5 w-2.5 rounded bg-accent/30" />
        <div className="h-2.5 w-2.5 rounded bg-accent/60" />
        <div className="h-2.5 w-2.5 rounded bg-accent" />
        <span>More</span>
      </div>
    </div>
  );
}
