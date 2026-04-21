import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import { students } from "@/data/mock";
import { RiskBadge } from "@/components/shared/Badges";
import { Progress } from "@/components/ui/progress";

const StudentDetail = () => {
  const { id } = useParams();
  const s = students.find((x) => x.id === id);
  if (!s) return <div>Student not found</div>;

  return (
    <>
      <Link to="/students" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
        <ChevronLeft className="h-4 w-4" /> Back to students
      </Link>
      <Card className="shadow-elev-sm mb-4">
        <CardContent className="p-5 flex items-center gap-4">
          <Avatar className="h-14 w-14"><AvatarFallback className="bg-primary/10 text-primary text-base">{s.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{s.name}</h2>
            <p className="text-sm text-muted-foreground">{s.email} · {s.country}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.program} · {s.cohort}</p>
          </div>
          <RiskBadge risk={s.risk} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Academic progress</CardTitle></CardHeader><CardContent><div className="kpi-number">{s.progress}%</div><Progress value={s.progress} className="h-1.5 mt-2" /></CardContent></Card>
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">GPA</CardTitle></CardHeader><CardContent><div className="kpi-number">{s.gpa.toFixed(2)}</div><p className="text-xs text-muted-foreground mt-1">Top 35% in cohort</p></CardContent></Card>
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Simulation score</CardTitle></CardHeader><CardContent><div className="kpi-number text-success">{Math.round(70 + Math.random() * 25)}</div><p className="text-xs text-muted-foreground mt-1">Avg across 3 simulations</p></CardContent></Card>
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Engagement</CardTitle></CardHeader><CardContent><div className="kpi-number">{Math.round(60 + Math.random() * 30)}%</div><p className="text-xs text-muted-foreground mt-1">last 7 days</p></CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Recent grades</CardTitle></CardHeader><CardContent className="text-sm space-y-2">{["Strategy Case — A","Lean Canvas Quiz — B+","Team Project — A-","Midterm — B"].map((g)=><div key={g} className="flex justify-between border-b border-border pb-2 last:border-0"><span>{g.split(" — ")[0]}</span><span className="font-medium tabular-nums">{g.split(" — ")[1]}</span></div>)}</CardContent></Card>
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Mentor feedback</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground space-y-3"><p>"Strong analytical thinker — needs to push more on stakeholder communication."</p><p className="text-xs">— Wanjiru Mwangi, mentor</p></CardContent></Card>
      </div>
    </>
  );
};

export default StudentDetail;
