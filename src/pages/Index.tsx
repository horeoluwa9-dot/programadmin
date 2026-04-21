import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  UserCog,
  FlaskConical,
  TrendingUp,
  AlertTriangle,
  Plus,
  Megaphone,
  FileBarChart,
  UserPlus,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { kpis, enrollmentTrend, completionTrend, facultyWorkload } from "@/data/mock";
import { EngagementHeatmap } from "@/components/dashboard/EngagementHeatmap";
import { SystemAlerts } from "@/components/dashboard/SystemAlerts";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

const Index = () => {
  return (
    <>
      <PageHeader
        title="Welcome, Adaeze"
        subtitle="Africa Business College — institutional overview"
        actions={
          <>
            <Button variant="outline" size="sm">
              <FileBarChart className="h-4 w-4" /> Generate report
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="h-4 w-4" /> New program
            </Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Active Programs" value={kpis.activePrograms} delta={{ value: 1, suffix: "" }} icon={GraduationCap} accent="primary" />
        <KpiCard label="Enrolled Students" value={kpis.enrolledStudents.toLocaleString()} delta={{ value: 5.2 }} icon={Users} accent="info" />
        <KpiCard label="Faculty Assigned" value={kpis.facultyAssigned} delta={{ value: 0 }} icon={UserCog} accent="accent" />
        <KpiCard label="Active Simulations" value={kpis.activeSimulations} delta={{ value: 1, suffix: "" }} icon={FlaskConical} accent="info" />
        <KpiCard label="Completion Rate" value={`${kpis.completionRate}%`} delta={{ value: 1.4 }} icon={TrendingUp} accent="success" />
        <KpiCard label="At-Risk Students" value={kpis.atRiskStudents} delta={{ value: -3 }} icon={AlertTriangle} accent="destructive" />
      </div>

      {/* Charts row */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elev-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Enrollment growth</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={enrollmentTrend} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="enroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="students" stroke="hsl(var(--accent))" strokeWidth={2.5} fill="url(#enroll)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-elev-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completion trend</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={completionTrend} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} domain={[70, 90]} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap + Faculty workload */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="shadow-elev-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Engagement heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <EngagementHeatmap />
          </CardContent>
        </Card>
        <Card className="shadow-elev-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Faculty workload distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={facultyWorkload} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="workload" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions + alerts + AI + activity */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="shadow-elev-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {[
              { label: "New Program", icon: GraduationCap },
              { label: "Create Cohort", icon: Users },
              { label: "Assign Faculty", icon: UserPlus },
              { label: "Launch Simulation", icon: FlaskConical },
              { label: "Send Announcement", icon: Megaphone },
              { label: "Generate Report", icon: FileBarChart },
            ].map((a) => (
              <Button key={a.label} variant="outline" className="h-auto flex-col gap-1.5 py-3">
                <a.icon className="h-4 w-4" />
                <span className="text-xs">{a.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
        <SystemAlerts />
        <AIInsights />
      </div>

      <div className="mt-4">
        <ActivityFeed />
      </div>
    </>
  );
};

export default Index;
