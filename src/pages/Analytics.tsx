import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { GraduationCap, TrendingUp, AlertTriangle, Award, FileDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from "recharts";
import { enrollmentTrend, completionTrend, programs } from "@/data/mock";
import { aiInsights } from "@/data/mock";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const programPerf = programs.filter((p)=>p.status==="active").map((p) => ({ name: p.title.split(" ")[0], completion: p.completion, enrolled: p.enrolled }));

const Analytics = () => {
  const exportToast = (kind: string) => toast.success(`${kind} export queued`, { description: "We'll notify you when it's ready." });

  return (
    <>
      <PageHeader
        title="Analytics & Reports"
        subtitle="Institutional performance, comparisons, and AI risk analysis"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => exportToast("PDF")}><FileDown className="h-4 w-4" /> Export PDF</Button>
            <Button variant="outline" size="sm" onClick={() => exportToast("Excel")}><FileDown className="h-4 w-4" /> Export Excel</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-4">
        <KpiCard label="Total Enrollments" value="2,536" delta={{ value: 12.4 }} icon={GraduationCap} accent="primary" />
        <KpiCard label="Avg Completion" value="85%" delta={{ value: 1.4 }} icon={TrendingUp} accent="success" />
        <KpiCard label="At-Risk" value="48" delta={{ value: -8.2 }} icon={AlertTriangle} accent="destructive" />
        <KpiCard label="NPS" value="72" delta={{ value: 4 }} icon={Award} accent="accent" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Enrollment by month</CardTitle></CardHeader><CardContent className="pl-0"><ResponsiveContainer width="100%" height={260}><LineChart data={enrollmentTrend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} /><XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} /><YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background:"hsl(var(--popover))", border:"1px solid hsl(var(--border))", borderRadius:8, fontSize:12 }} /><Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2.5} /></LineChart></ResponsiveContainer></CardContent></Card>
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Completion trend</CardTitle></CardHeader><CardContent className="pl-0"><ResponsiveContainer width="100%" height={260}><LineChart data={completionTrend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} /><XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} /><YAxis domain={[70,90]} stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background:"hsl(var(--popover))", border:"1px solid hsl(var(--border))", borderRadius:8, fontSize:12 }} /><Line type="monotone" dataKey="rate" stroke="hsl(var(--success))" strokeWidth={2.5} /></LineChart></ResponsiveContainer></CardContent></Card>
        <Card className="shadow-elev-sm lg:col-span-2"><CardHeader><CardTitle className="text-base">Program performance comparison</CardTitle></CardHeader><CardContent className="pl-0"><ResponsiveContainer width="100%" height={300}><BarChart data={programPerf}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} /><XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} /><YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background:"hsl(var(--popover))", border:"1px solid hsl(var(--border))", borderRadius:8, fontSize:12 }} /><Bar dataKey="completion" fill="hsl(var(--primary))" radius={[4,4,0,0]} maxBarSize={42} /><Bar dataKey="enrolled" fill="hsl(var(--accent))" radius={[4,4,0,0]} maxBarSize={42} /></BarChart></ResponsiveContainer></CardContent></Card>
      </div>

      <Card className="mt-4 shadow-elev-sm overflow-hidden">
        <CardHeader className="bg-gradient-primary text-primary-foreground pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary-foreground"><Sparkles className="h-4 w-4 text-accent" /> AI Risk Analysis Engine</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 pt-4 md:grid-cols-3">
          {aiInsights.map((i)=>(<div key={i.id} className="rounded-md border border-border bg-card p-3"><p className="text-sm font-medium">{i.title}</p><p className="mt-1 text-xs text-muted-foreground leading-relaxed">{i.description}</p><Button size="sm" variant="outline" className="mt-2.5 h-7 text-xs">{i.action}</Button></div>))}
        </CardContent>
      </Card>
    </>
  );
};

export default Analytics;
