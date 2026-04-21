import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cohorts, programs, students } from "@/data/mock";
import { ChevronLeft } from "lucide-react";
import { RiskBadge } from "@/components/shared/Badges";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const CohortDetail = () => {
  const { id } = useParams();
  const cohort = cohorts.find((c) => c.id === id);
  if (!cohort) return <div>Cohort not found</div>;
  const program = programs.find((p) => p.id === cohort.programId);
  const members = students.slice(0, 14);

  const progressData = Array.from({ length: 8 }).map((_, i) => ({
    week: `W${i + 1}`,
    completion: Math.min(100, 10 + i * 11 + Math.round(Math.random() * 5)),
  }));

  return (
    <>
      <Link to="/cohorts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
        <ChevronLeft className="h-4 w-4" /> Back to cohorts
      </Link>
      <PageHeader
        title={cohort.name}
        subtitle={`${program?.title} · ${cohort.students} students · ${cohort.startDate} → ${cohort.endDate}`}
        actions={<Button size="sm" variant="outline">Manage cohort</Button>}
      />
      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="collab">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4">
          <Card className="shadow-elev-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">{s.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                          <div><p className="text-sm font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.email}</p></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{s.country}</TableCell>
                      <TableCell><div className="flex items-center gap-2 w-32"><Progress value={s.progress} className="h-1.5" /><span className="text-xs tabular-nums">{s.progress}%</span></div></TableCell>
                      <TableCell className="text-sm tabular-nums">{s.gpa.toFixed(2)}</TableCell>
                      <TableCell><RiskBadge risk={s.risk} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
          <Card className="shadow-elev-sm">
            <CardHeader><CardTitle className="text-base">Cohort completion over time</CardTitle></CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={progressData}>
                  <defs><linearGradient id="cprog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.45} /><stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="completion" stroke="hsl(var(--success))" strokeWidth={2.5} fill="url(#cprog)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <Card className="shadow-elev-sm">
            <CardContent className="p-4 space-y-2">
              {["Strategy Case", "Pitch Deck v1", "FX Hedging Quiz", "Final Project"].map((t, i) => (
                <div key={t} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                  <div><p className="text-sm font-medium">{t}</p><p className="text-xs text-muted-foreground">Due in {3 + i} days · {60 + i * 5}/{cohort.students} submitted</p></div>
                  <Button size="sm" variant="outline">Grade</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collab" className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Group projects</CardTitle></CardHeader><CardContent className="text-sm space-y-2">{["Team Alpha — Market entry","Team Beta — Digital pivot","Team Gamma — Sustainability"].map((t)=>(<div key={t} className="flex justify-between border-b border-border pb-2 last:border-0"><span>{t}</span><Button size="sm" variant="ghost">View</Button></div>))}</CardContent></Card>
          <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Discussion activity</CardTitle></CardHeader><CardContent><div className="kpi-number">182</div><p className="text-xs text-muted-foreground mt-1">posts this week · +24% vs last</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CohortDetail;
