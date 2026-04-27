import { useParams, Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { programs, courses, cohorts, faculty } from "@/data/mock";
import { CurriculumBuilder } from "@/components/programs/CurriculumBuilder";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { StatusBadge } from "@/components/shared/Badges";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storePrograms = useStore((s) => s.programs);
  const toggleProgramStatus = useStore((s) => s.toggleProgramStatus);
  const program = storePrograms.find((p) => p.id === id) || programs.find((p) => p.id === id);
  if (!program) return <div>Program not found</div>;

  const programCourses = courses.filter((c) => c.programId === program.id);
  const programCohorts = cohorts.filter((c) => c.programId === program.id);

  return (
    <>
      <Link to="/programs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
        <ChevronLeft className="h-4 w-4" /> Back to programs
      </Link>
      <PageHeader
        title={program.title}
        subtitle={program.description}
        actions={
          <>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={program.status} />
              <Switch
                checked={program.status === "active"}
                onCheckedChange={() => { toggleProgramStatus(program.id); toast.success(`Program ${program.status === "active" ? "deactivated" : "activated"}`); }}
              />
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate(`/programs/${program.id}/edit`)}>Edit program</Button>
          </>
        }
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum Builder</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Assignment</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Mapping</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-elev-sm">
            <CardHeader><CardTitle className="text-base">Program description</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              <div>
                <h4 className="text-sm font-medium mb-2">Learning outcomes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {program.outcomes.map((o) => <Badge key={o} variant="secondary">{o}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Skills mapping</h4>
                <div className="flex flex-wrap gap-1.5">
                  {program.skills.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-elev-sm">
            <CardHeader><CardTitle className="text-base">At a glance</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Duration" value={program.duration} />
              <Row label="Cohorts" value={program.cohorts} />
              <Row label="Enrolled" value={program.enrolled} />
              <Row label="Completion" value={`${program.completion}%`} />
              <Progress value={program.completion} className="h-1.5" />
              <Row label="Certification" value="ABC Executive Cert." />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="mt-4">
          <CurriculumBuilder />
        </TabsContent>

        <TabsContent value="faculty" className="mt-4">
          <Card className="shadow-elev-sm">
            <CardHeader><CardTitle className="text-base">Faculty assignments</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {faculty.slice(0, 5).map((f) => (
                <div key={f.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.title} · {f.expertise.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32">
                      <div className="flex justify-between text-[10px] text-muted-foreground"><span>Workload</span><span>{f.workload}%</span></div>
                      <Progress value={f.workload} className="h-1" />
                    </div>
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Reassigning ${f.name}`)}>Reassign</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="mt-4 grid gap-3 md:grid-cols-2">
          {programCohorts.length === 0 && (
            <Card className="md:col-span-2"><CardContent className="p-6 text-sm text-muted-foreground">No cohorts assigned yet.</CardContent></Card>
          )}
          {programCohorts.map((c) => (
            <Card key={c.id} className="shadow-elev-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{c.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.startDate} → {c.endDate}</p>
                  </div>
                  <Badge variant="outline">{c.students} students</Badge>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Progress</span><span className="tabular-nums">{c.progress}%</span></div>
                  <Progress value={c.progress} className="h-1.5 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Completion rate</CardTitle></CardHeader><CardContent><div className="kpi-number text-success">{program.completion}%</div><p className="text-xs text-muted-foreground mt-1">+2.3% vs last cohort</p></CardContent></Card>
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Drop-off points</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><div className="flex justify-between"><span>Module 3</span><span className="text-warning">-8%</span></div><div className="flex justify-between"><span>Module 7</span><span className="text-destructive">-12%</span></div><div className="flex justify-between"><span>Final project</span><span className="text-warning">-5%</span></div></CardContent></Card>
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Engagement trend</CardTitle></CardHeader><CardContent><div className="kpi-number">{Math.round(70 + Math.random() * 20)}%</div><p className="text-xs text-muted-foreground mt-1">avg weekly active</p></CardContent></Card>
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Faculty effectiveness</CardTitle></CardHeader><CardContent><div className="kpi-number text-accent">4.7 / 5</div><p className="text-xs text-muted-foreground mt-1">based on {programCourses.length} courses</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

const Row = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between border-b border-border pb-2 last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium tabular-nums">{value}</span>
  </div>
);

export default ProgramDetail;
