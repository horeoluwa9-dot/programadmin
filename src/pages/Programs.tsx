import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Clock, TrendingUp } from "lucide-react";
import { programs } from "@/data/mock";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/shared/Badges";
import { Progress } from "@/components/ui/progress";

const Programs = () => {
  return (
    <>
      <PageHeader
        title="Programs"
        subtitle="Manage academic programs across the institution"
        actions={
          <Button size="sm" className="bg-gradient-primary">
            <Plus className="h-4 w-4" /> New program
          </Button>
        }
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search programs…" className="h-9 pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((p) => (
          <Link to={`/programs/${p.id}`} key={p.id}>
            <Card className="h-full shadow-elev-sm transition-all hover:shadow-elev-md hover:border-accent/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.category}</p>
                    <h3 className="mt-1 text-base font-semibold leading-snug">{p.title}</h3>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3 text-xs">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />Duration</div>
                    <div className="mt-0.5 font-medium tabular-nums">{p.duration}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" />Cohorts</div>
                    <div className="mt-0.5 font-medium tabular-nums">{p.cohorts}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground"><TrendingUp className="h-3 w-3" />Enrolled</div>
                    <div className="mt-0.5 font-medium tabular-nums">{p.enrolled}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Completion</span>
                    <span className="font-medium tabular-nums text-foreground">{p.completion}%</span>
                  </div>
                  <Progress value={p.completion} className="mt-1 h-1.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Programs;
