import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import { useStore } from "@/store/useStore";
import { NewFacultyDialog } from "@/components/forms/EntityDialogs";
import { downloadCSV } from "@/lib/exporters";
import { useNavigate } from "react-router-dom";

const Faculty = () => {
  const faculty = useStore((s) => s.faculty);
  const navigate = useNavigate();
  const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <>
      <PageHeader
        title="Faculty Management"
        subtitle="Faculty directory, workload and assignments"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => downloadCSV("faculty.csv", faculty)}>Export CSV</Button>
            <NewFacultyDialog trigger={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> Add faculty</Button>} />
          </>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Directory</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Programs</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/10 text-primary">{f.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                        <div><p className="text-sm font-medium">{f.name}</p><p className="text-xs text-muted-foreground">{f.title}</p></div>
                      </div>
                    </TableCell>
                    <TableCell><div className="flex flex-wrap gap-1">{f.expertise.map((e)=><Badge key={e} variant="outline" className="text-[10px]">{e}</Badge>)}</div></TableCell>
                    <TableCell className="tabular-nums text-sm">{f.programs}</TableCell>
                    <TableCell className="tabular-nums text-sm">{f.courses}</TableCell>
                    <TableCell><div className="w-28"><Progress value={f.workload} className="h-1.5" /><span className="text-[10px] text-muted-foreground tabular-nums">{f.workload}%</span></div></TableCell>
                    <TableCell><div className="flex items-center gap-1 text-sm tabular-nums"><Star className="h-3 w-3 fill-accent text-accent" />{f.rating}</div></TableCell>
                    <TableCell><Button size="sm" variant="ghost" onClick={() => navigate(`/faculty/${slug(f.name)}`)}>View</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-elev-sm">
          <CardHeader><CardTitle className="text-base">Workload heatmap</CardTitle></CardHeader>
          <CardContent className="space-y-2.5">
            {faculty.map((f) => {
              const color = f.workload > 80 ? "bg-destructive" : f.workload > 60 ? "bg-warning" : "bg-success";
              return (
                <div key={f.id}>
                  <div className="flex justify-between text-xs mb-1"><span className="truncate">{f.name}</span><span className="tabular-nums text-muted-foreground">{f.workload}%</span></div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden"><div className={`h-full ${color}`} style={{width: `${f.workload}%`}}/></div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Faculty;
