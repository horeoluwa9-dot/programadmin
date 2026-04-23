import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";
import { NewCohortDialog } from "@/components/forms/EntityDialogs";
import { downloadCSV } from "@/lib/exporters";

const Cohorts = () => {
  const cohorts = useStore((s) => s.cohorts);
  const programs = useStore((s) => s.programs);
  return (
    <>
      <PageHeader
        title="Cohorts"
        subtitle="Active learner cohorts across the institution"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => downloadCSV("cohorts.csv", cohorts)}>Export CSV</Button>
            <NewCohortDialog trigger={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> Create cohort</Button>} />
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cohorts.map((c) => {
          const program = programs.find((p) => p.id === c.programId);
          return (
            <Link to={`/cohorts/${c.id}`} key={c.id}>
              <Card className="h-full shadow-elev-sm transition-all hover:shadow-elev-md hover:border-accent/50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold leading-snug">{c.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{program?.title}</p>
                    </div>
                    {c.atRisk > 0 && (
                      <Badge variant="outline" className="bg-destructive-soft text-destructive border-destructive/20">
                        <AlertTriangle className="h-3 w-3 mr-1" /> {c.atRisk} at risk
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.students} students</span>
                    <span className="tabular-nums">{c.startDate} → {c.endDate}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-muted-foreground"><span>Progress</span><span className="font-medium tabular-nums text-foreground">{c.progress}%</span></div>
                    <Progress value={c.progress} className="mt-1 h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Cohorts;
