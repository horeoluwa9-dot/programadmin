import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mentors } from "@/data/mock";
import { Plus } from "lucide-react";

const Mentors = () => {
  return (
    <>
      <PageHeader
        title="Mentors"
        subtitle="Industry mentors paired with cohorts and students"
        actions={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> Invite mentor</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Mentor directory</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Cohorts</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-accent-soft text-accent-foreground">{m.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                        <div><p className="text-sm font-medium">{m.name}</p><p className="text-xs text-muted-foreground">{m.email}</p></div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{m.industry}</Badge></TableCell>
                    <TableCell className="tabular-nums">{m.cohorts}</TableCell>
                    <TableCell className="tabular-nums">{m.students}</TableCell>
                    <TableCell><div className="w-28"><Progress value={m.availability} className="h-1.5" /></div></TableCell>
                    <TableCell><Button size="sm" variant="outline">Assign</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Availability heatmap</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Mon","Tue","Wed","Thu","Fri"].map((d) => (
              <div key={d}>
                <p className="text-xs font-medium mb-1.5">{d}</p>
                <div className="grid grid-cols-12 gap-0.5">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const v = Math.random();
                    const cls = v > 0.7 ? "bg-success" : v > 0.4 ? "bg-success/50" : v > 0.2 ? "bg-muted" : "bg-destructive/30";
                    return <div key={i} className={`h-4 rounded-sm ${cls}`} />;
                  })}
                </div>
              </div>
            ))}
            <p className="pt-2 text-[10px] text-muted-foreground">8am — 8pm in 1-hour slots</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Mentors;
