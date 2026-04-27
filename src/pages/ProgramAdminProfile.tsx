import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { programs as seedPrograms, courses, students } from "@/data/mock";
import { useStore } from "@/store/useStore";
import { downloadCSV } from "@/lib/exporters";
import { toast } from "sonner";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Lock, ShieldCheck, UserCog, Users } from "lucide-react";

const admin = {
  name: "Adaeze Nwosu",
  role: "Program Admin",
  status: "Active",
  email: "adaeze.nwosu@abc.edu",
  phone: "+234 801 555 0192",
  institution: "Africa Business College",
  created: "2024-08-12",
  lastLogin: "Today, 09:42",
};

const logs = [
  ["2025-03-18 09:14", "Program update", "Entrepreneurship Lab", "Updated Customer Discovery schedule", "102.88.44.19", "Success"],
  ["2025-03-18 08:55", "Approval", "Pitch Deck v1", "Approved 18 submissions", "102.88.44.19", "Success"],
  ["2025-03-17 16:21", "Student action", "Accra cohort", "Enrolled 12 students", "197.210.12.4", "Success"],
  ["2025-03-17 11:05", "Security", "Permissions", "Export data permission toggled", "197.210.12.4", "Reviewed"],
];

const trend = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month, i) => ({ month, score: 72 + i * 3, completion: 68 + i * 4 }));
const effectiveness = seedPrograms.slice(0, 5).map((p) => ({ name: p.category, rate: p.completion }));
const permissions = ["View students", "Edit programs", "Create content", "Approve content", "Manage faculty", "View analytics", "Export data", "Manage simulations"];

export default function ProgramAdminProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") || "overview";
  const storePrograms = useStore((s) => s.programs);
  const updateProgram = useStore((s) => s.updateProgram);
  const assigned = useMemo(() => storePrograms.slice(0, 5), [storePrograms]);
  const [modal, setModal] = useState<string | null>(null);
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(permissions.map((p, i) => [p, i !== 7])));

  const setTab = (value: string) => setParams({ tab: value });
  const openModal = (name: string) => setModal(name);
  const closeModal = () => setModal(null);

  return <>
    <PageHeader title="Program Admin Profile" subtitle={`High-authority profile control · ${id}`} actions={<>
      <Button size="sm" variant="outline" onClick={() => openModal("Edit Profile")}>Edit Profile</Button>
      <Button size="sm" variant="outline" onClick={() => openModal("Suspend Admin")}>Suspend Admin</Button>
      <Button size="sm" variant="outline" onClick={() => openModal("Reset Password")}>Reset Password</Button>
      <Button size="sm" className="bg-gradient-primary" onClick={() => openModal("Assign Program")}>Assign to Program</Button>
    </>} />

    <Card className="mb-4 shadow-elev-sm"><CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary/10 text-lg text-primary">AN</AvatarFallback></Avatar>
        <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold">{admin.name}</h2><Badge>{admin.role}</Badge><Badge variant="outline" className="text-success">{admin.status}</Badge></div><p className="text-sm text-muted-foreground">{admin.email} · {admin.phone}</p><p className="text-sm text-muted-foreground">{admin.institution}</p></div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4"><Metric label="Programs" value={assigned.length} /><Metric label="Students" value={students.length * 9} /><Metric label="Courses" value={courses.length} /><Metric label="Score" value="94" /></div>
    </CardContent></Card>

    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="flex h-auto flex-wrap"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="programs">Programs</TabsTrigger><TabsTrigger value="permissions">Permissions</TabsTrigger><TabsTrigger value="activity">Activity Logs</TabsTrigger><TabsTrigger value="performance">Performance</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
      <TabsContent value="overview" className="mt-4 space-y-4">
        <div className="grid gap-3 md:grid-cols-5"><Kpi icon={UserCog} label="Assigned Programs" value={assigned.length} /><Kpi icon={Users} label="Managed Students" value={students.length * 9} /><Kpi icon={Activity} label="Active Courses" value={courses.length} /><Kpi icon={Lock} label="Last Login" value={admin.lastLogin} /><Kpi icon={ShieldCheck} label="Activity Score" value="94/100" /></div>
        <div className="grid gap-4 lg:grid-cols-3"><Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Quick summary</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><Row label="Institution" value={admin.institution}/><Row label="Hierarchy" value="Level 3 · Program Ops"/><Row label="Access scope" value="Programs, courses, cohorts"/><Row label="Created" value={admin.created}/></CardContent></Card><Card className="lg:col-span-2 shadow-elev-sm"><CardHeader><CardTitle className="text-base">Recent activity</CardTitle></CardHeader><CardContent className="space-y-3">{logs.slice(0,4).map((l)=><div key={l[0]} className="border-l-2 border-primary pl-3 text-sm"><p className="font-medium">{l[3]}</p><p className="text-xs text-muted-foreground">{l[0]} · {l[1]}</p></div>)}</CardContent></Card></div>
        <Card className="shadow-elev-sm"><CardHeader><CardTitle className="text-base">Quick actions</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2"><Button onClick={() => openModal("Assign Program")}>Assign Program</Button><Button variant="outline" onClick={() => setTab("programs")}>View Programs</Button><Button variant="outline" onClick={() => setTab("permissions")}>Edit Permissions</Button><Button variant="outline" onClick={() => openModal("Suspend Admin")}>Suspend Account</Button></CardContent></Card>
      </TabsContent>
      <TabsContent value="programs" className="mt-4"><Card className="shadow-elev-sm"><CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">Assigned programs</CardTitle><div className="flex gap-2"><Button size="sm" onClick={() => openModal("Assign Program")}>Assign New Program</Button><Button size="sm" variant="outline" onClick={() => downloadCSV("program-admin-programs.csv", assigned)}>Export Programs</Button><Drawer><DrawerTrigger asChild><Button size="sm" variant="outline">Filter Programs</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Filter programs</DrawerTitle></DrawerHeader><div className="grid gap-3 p-4"><Label>Status</Label><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent></Select><Button onClick={() => toast.success("Filters applied")}>Apply filters</Button></div></DrawerContent></Drawer></div></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Program name</TableHead><TableHead>Institution</TableHead><TableHead>Students</TableHead><TableHead>Status</TableHead><TableHead>Completion</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>{assigned.map((p)=><TableRow key={p.id}><TableCell className="font-medium">{p.title}</TableCell><TableCell>{admin.institution}</TableCell><TableCell>{p.enrolled}</TableCell><TableCell><Badge variant="outline" className="capitalize">{p.status}</Badge></TableCell><TableCell><Progress value={p.completion} className="h-1.5 w-24" /></TableCell><TableCell className="space-x-1"><Button size="sm" variant="ghost" onClick={() => navigate(`/programs/${p.id}`)}>View</Button><Button size="sm" variant="ghost" onClick={() => navigate(`/programs/${p.id}/edit`)}>Edit</Button><Button size="sm" variant="ghost" onClick={() => {updateProgram(p.id,{status:"archived"}); toast.success("Program archived")}}>Archive</Button><Button size="sm" variant="ghost" onClick={() => toast.success("Access removed")}>Remove Access</Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></TabsContent>
      <TabsContent value="permissions" className="mt-4 space-y-4"><Card><CardHeader><CardTitle className="text-base">Role summary</CardTitle></CardHeader><CardContent className="grid gap-2 text-sm md:grid-cols-3"><Row label="Current role" value="Program Admin"/><Row label="Permission level" value="High"/><Row label="Scope" value="Program-level access"/></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Permission matrix</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{permissions.map((p)=><div key={p} className="flex items-center justify-between rounded-md border p-3"><span className="text-sm">{p}</span><Switch checked={enabled[p]} onCheckedChange={(v)=>{setEnabled({...enabled,[p]:v}); toast.success(`${p} ${v ? "enabled" : "disabled"}`)}} /></div>)}</CardContent></Card><div className="flex flex-wrap gap-2"><Button onClick={() => openModal("Promote/Demote Role")}>Promote/Demote Role</Button><Button variant="outline" onClick={() => {setEnabled(Object.fromEntries(permissions.map((p, i) => [p, i !== 7]))); toast.success("Default permissions restored")}}>Reset permissions</Button><Button variant="outline" onClick={() => toast.success("Higher access request submitted")}>Request higher access</Button></div></TabsContent>
      <TabsContent value="activity" className="mt-4"><Card><CardHeader><CardTitle className="text-base">Audit log</CardTitle></CardHeader><CardContent className="space-y-3"><div className="grid gap-2 md:grid-cols-3"><Input type="date"/><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All actions</SelectItem><SelectItem value="security">Security</SelectItem><SelectItem value="approval">Approval</SelectItem></SelectContent></Select><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All severities</SelectItem><SelectItem value="success">Success</SelectItem><SelectItem value="reviewed">Reviewed</SelectItem></SelectContent></Select></div><Table><TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>Action type</TableHead><TableHead>Entity</TableHead><TableHead>Description</TableHead><TableHead>IP</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{logs.map((l,i)=><><TableRow key={l[0]} className="cursor-pointer" onClick={() => setExpandedLog(expandedLog === i ? null : i)}>{l.map((x)=><TableCell key={x}>{x}</TableCell>)}</TableRow>{expandedLog===i&&<TableRow><TableCell colSpan={6} className="bg-muted/40 text-sm">Full audit trail: before state captured, after state validated, metadata signed by ABC audit service.</TableCell></TableRow>}</>)}</TableBody></Table></CardContent></Card></TabsContent>
      <TabsContent value="performance" className="mt-4 space-y-4"><div className="grid gap-3 md:grid-cols-5"><Metric label="Success" value="86%"/><Metric label="Completion" value="84%"/><Metric label="Engagement" value="78%"/><Metric label="Approval" value="92%"/><Metric label="Response" value="1.8h"/></div><div className="grid gap-4 lg:grid-cols-2"><ChartCard title="Performance trend"><LineChart data={trend}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Line dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2}/></LineChart></ChartCard><ChartCard title="Program effectiveness"><BarChart data={effectiveness}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="rate" fill="hsl(var(--accent))"/></BarChart></ChartCard></div></TabsContent>
      <TabsContent value="security" className="mt-4 grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle className="text-base">Security snapshot</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><Row label="Last IP" value="102.88.44.19"/><Row label="Devices" value="3 trusted"/><Row label="Suspicious flags" value="0 open"/><Row label="Login history" value="18 logins / 30 days"/></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Security actions</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2"><Button onClick={() => toast.success("All sessions logged out")}>Force logout all sessions</Button><Button variant="outline" onClick={() => openModal("Reset Password")}>Reset password</Button><div className="flex items-center gap-2 rounded-md border px-3"><span className="text-sm">Enable 2FA</span><Switch onCheckedChange={(v)=>toast.success(`2FA ${v?"enabled":"disabled"}`)}/></div><Button variant="outline" onClick={() => navigate("/alerts/alert-workload-zanele")}>Review security alerts</Button></CardContent></Card></TabsContent>
      <TabsContent value="settings" className="mt-4 grid gap-4 lg:grid-cols-3"><SettingsCard title="Account settings" fields={["Name","Email","Phone","Password"]}/><SettingsCard title="Access settings" fields={["Change role","Transfer ownership","Deactivate account"]}/><Card><CardHeader><CardTitle className="text-base">Data settings</CardTitle></CardHeader><CardContent className="space-y-2"><Button className="w-full" variant="outline" onClick={() => downloadCSV("admin-activity.csv", logs)}>Export personal activity</Button><Button className="w-full" variant="outline" onClick={() => openModal("Delete Account")}>Delete account</Button></CardContent></Card></TabsContent>
    </Tabs>

    <Dialog open={!!modal} onOpenChange={(o)=>!o&&closeModal()}><DialogContent><DialogHeader><DialogTitle>{modal}</DialogTitle></DialogHeader><div className="space-y-3"><Input placeholder="Name / selection" defaultValue={modal === "Edit Profile" ? admin.name : ""}/><Textarea placeholder="Notes or confirmation details" /></div><DialogFooter><Button variant="outline" onClick={closeModal}>Cancel</Button><Button onClick={()=>{toast.success(`${modal} saved`); closeModal();}}>Confirm</Button></DialogFooter></DialogContent></Dialog>
  </>;
}

function Metric({ label, value }: {label:string; value:any}) { return <div className="rounded-md border bg-card p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold tabular-nums">{value}</p></div>; }
function Kpi({ icon: Icon, label, value }: any) { return <Card><CardContent className="p-3"><Icon className="h-4 w-4 text-primary"/><p className="mt-2 text-xs text-muted-foreground">{label}</p><p className="font-semibold tabular-nums">{value}</p></CardContent></Card>; }
function Row({ label, value }: {label:string; value:any}) { return <div className="flex justify-between gap-3 border-b pb-2 last:border-0"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right">{value}</span></div>; }
function ChartCard({ title, children }: any) { return <Card><CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={260}>{children}</ResponsiveContainer></CardContent></Card>; }
function SettingsCard({ title, fields }: {title:string; fields:string[]}) { return <Card><CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader><CardContent className="space-y-2">{fields.map(f=><Button key={f} className="w-full justify-start" variant="outline" onClick={()=>toast.success(`${f} action opened`)}>{f}</Button>)}</CardContent></Card>; }
