import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, FlaskConical, Users, Trophy, Pause, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/useStore";
import { NewSimulationDialog } from "@/components/forms/EntityDialogs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const Simulations = () => {
  const simulations = useStore((s) => s.simulations);
  const updateSimulation = useStore((s) => s.updateSimulation);
  const addSimulation = useStore((s) => s.addSimulation);
  const [monitorId, setMonitorId] = useState<string | null>(null);
  const monitor = simulations.find((s) => s.id === monitorId);

  // Builder state
  const [title, setTitle] = useState("");
  const [scenario, setScenario] = useState("");
  const [difficulty, setDifficulty] = useState<"beginner"|"intermediate"|"advanced">("intermediate");
  const [duration, setDuration] = useState(3);
  const [vol, setVol] = useState(60);
  const [cost, setCost] = useState(40);
  const [risk, setRisk] = useState(75);

  const groups = {
    active: simulations.filter((s) => s.status === "active"),
    scheduled: simulations.filter((s) => s.status === "scheduled"),
    completed: simulations.filter((s) => s.status === "completed"),
  };

  const launch = () => {
    if (!title.trim()) return toast.error("Title required");
    addSimulation({ title, scenario, difficulty, status: "active" });
    toast.success(`Simulation "${title}" launched (vol ${vol}, cost ${cost}, risk ${risk}, ${duration}h)`);
    setTitle(""); setScenario("");
  };

  const saveDraft = () => {
    if (!title.trim()) return toast.error("Title required");
    addSimulation({ title, scenario, difficulty, status: "scheduled" });
    toast.success(`Draft "${title}" saved`);
    setTitle(""); setScenario("");
  };

  const renderList = (list: typeof simulations) =>
    list.map((s) => (
      <Card key={s.id} className="shadow-elev-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent-foreground"><FlaskConical className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.scenario}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="capitalize">{s.difficulty}</Badge>
                  <Badge variant="secondary"><Users className="h-3 w-3 mr-1" />{s.participants}</Badge>
                  {s.avgScore > 0 && <Badge variant="outline"><Trophy className="h-3 w-3 mr-1" />avg {s.avgScore}</Badge>}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Button size="sm" variant="outline" onClick={() => setMonitorId(s.id)}>Monitor</Button>
              {s.status === "active" && (
                <Button size="sm" variant="ghost" onClick={() => { updateSimulation(s.id, { status: "scheduled" }); toast.success("Paused"); }}>
                  <Pause className="h-3 w-3" /> Pause
                </Button>
              )}
              {s.status === "scheduled" && (
                <Button size="sm" variant="ghost" onClick={() => { updateSimulation(s.id, { status: "active" }); toast.success("Resumed"); }}>
                  <Play className="h-3 w-3" /> Resume
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    ));

  return (
    <>
      <PageHeader
        title="Simulations Control"
        subtitle="Real-world business scenarios at scale"
        actions={<NewSimulationDialog trigger={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> New simulation</Button>} />}
      />
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active <Badge variant="secondary" className="ml-2">{groups.active.length}</Badge></TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled <Badge variant="secondary" className="ml-2">{groups.scheduled.length}</Badge></TabsTrigger>
          <TabsTrigger value="completed">Completed <Badge variant="secondary" className="ml-2">{groups.completed.length}</Badge></TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4 space-y-3">{renderList(groups.active)}</TabsContent>
        <TabsContent value="scheduled" className="mt-4 space-y-3">{renderList(groups.scheduled)}</TabsContent>
        <TabsContent value="completed" className="mt-4 space-y-3">{renderList(groups.completed)}</TabsContent>

        <TabsContent value="builder" className="mt-4">
          <Card className="shadow-elev-sm">
            <CardHeader><CardTitle className="text-base">Simulation builder</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div><label className="text-xs font-medium text-muted-foreground">Scenario title</label><Input className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Cross-border M&A" /></div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Difficulty</label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as any)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="beginner">Beginner</SelectItem><SelectItem value="intermediate">Intermediate</SelectItem><SelectItem value="advanced">Advanced</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Scenario description</label>
                <Textarea className="mt-1" rows={3} value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder="Describe the business scenario…" />
              </div>
              <div><label className="text-xs font-medium text-muted-foreground">Duration (hours)</label><Input className="mt-1" type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value || "1"))} /></div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-medium text-muted-foreground">Variables</label>
                <div><div className="flex justify-between text-xs"><span>Market volatility</span><span className="tabular-nums">{vol}</span></div><Slider value={[vol]} onValueChange={(v) => setVol(v[0])} className="mt-2" /></div>
                <div><div className="flex justify-between text-xs"><span>Cost pressure</span><span className="tabular-nums">{cost}</span></div><Slider value={[cost]} onValueChange={(v) => setCost(v[0])} className="mt-2" /></div>
                <div><div className="flex justify-between text-xs"><span>Risk exposure</span><span className="tabular-nums">{risk}</span></div><Slider value={[risk]} onValueChange={(v) => setRisk(v[0])} className="mt-2" /></div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2"><Button variant="outline" onClick={saveDraft}>Save draft</Button><Button className="bg-gradient-primary" onClick={launch}>Launch simulation</Button></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!monitor} onOpenChange={(o) => !o && setMonitorId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{monitor?.title}</DialogTitle></DialogHeader>
          {monitor && (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">{monitor.scenario}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md bg-muted/50 p-3"><p className="text-[10px] uppercase text-muted-foreground">Participants</p><p className="kpi-number text-xl">{monitor.participants}</p></div>
                <div className="rounded-md bg-muted/50 p-3"><p className="text-[10px] uppercase text-muted-foreground">Avg score</p><p className="kpi-number text-xl">{monitor.avgScore || "—"}</p></div>
                <div className="rounded-md bg-muted/50 p-3"><p className="text-[10px] uppercase text-muted-foreground">Status</p><p className="text-sm font-semibold capitalize mt-1">{monitor.status}</p></div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <Button variant="outline" onClick={() => { updateSimulation(monitor.id, { status: "completed" }); toast.success("Simulation ended"); setMonitorId(null); }}>End simulation</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Simulations;
