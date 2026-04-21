import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, FlaskConical, Users, Trophy } from "lucide-react";
import { simulations } from "@/data/mock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Simulations = () => {
  const groups = {
    active: simulations.filter((s) => s.status === "active"),
    scheduled: simulations.filter((s) => s.status === "scheduled"),
    completed: simulations.filter((s) => s.status === "completed"),
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
            <Button size="sm" variant="outline">Monitor</Button>
          </div>
        </CardContent>
      </Card>
    ));

  return (
    <>
      <PageHeader
        title="Simulations Control"
        subtitle="Real-world business scenarios at scale"
        actions={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> New simulation</Button>}
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
              <div><label className="text-xs font-medium text-muted-foreground">Scenario title</label><Input className="mt-1" placeholder="e.g. Cross-border M&A" /></div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Scenario type</label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent><SelectItem value="market">Market entry</SelectItem><SelectItem value="finance">Financial crisis</SelectItem><SelectItem value="ma">M&A</SelectItem><SelectItem value="ops">Operations</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Difficulty</label>
                <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                  <SelectContent><SelectItem value="b">Beginner</SelectItem><SelectItem value="i">Intermediate</SelectItem><SelectItem value="a">Advanced</SelectItem></SelectContent>
                </Select>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground">Duration (hours)</label><Input className="mt-1" type="number" defaultValue={3} /></div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-medium text-muted-foreground">Variables</label>
                <div><div className="flex justify-between text-xs"><span>Market volatility</span><span className="tabular-nums">60</span></div><Slider defaultValue={[60]} className="mt-2" /></div>
                <div><div className="flex justify-between text-xs"><span>Cost pressure</span><span className="tabular-nums">40</span></div><Slider defaultValue={[40]} className="mt-2" /></div>
                <div><div className="flex justify-between text-xs"><span>Risk exposure</span><span className="tabular-nums">75</span></div><Slider defaultValue={[75]} className="mt-2" /></div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2"><Button variant="outline">Save draft</Button><Button className="bg-gradient-primary">Launch simulation</Button></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Simulations;
