import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Search, Plus } from "lucide-react";
import { RiskBadge } from "@/components/shared/Badges";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { NewStudentDialog } from "@/components/forms/EntityDialogs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadCSV } from "@/lib/exporters";

const Students = () => {
  const students = useStore((s) => s.students);
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState("all");

  const filtered = useMemo(
    () => students.filter((s) =>
      (risk === "all" || s.risk === risk) &&
      (s.name.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase()) || s.cohort.toLowerCase().includes(q.toLowerCase()))
    ),
    [students, q, risk]
  );

  return (
    <>
      <PageHeader
        title="Students"
        subtitle="Student directory across all programs and cohorts"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => downloadCSV("students.csv", filtered)}>Export CSV</Button>
            <NewStudentDialog trigger={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> Add student</Button>} />
          </>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students…" className="h-9 pl-9" />
        </div>
        <Select value={risk} onValueChange={setRisk}>
          <SelectTrigger className="h-9 w-40"><SelectValue placeholder="Filter by risk" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All risk levels</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card className="shadow-elev-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Cohort</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id} className="cursor-pointer">
                  <TableCell>
                    <Link to={`/students/${s.id}`} className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">{s.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                      <div><p className="text-sm font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.email}</p></div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{s.program}</TableCell>
                  <TableCell className="text-sm">{s.cohort}</TableCell>
                  <TableCell className="text-sm">{s.country}</TableCell>
                  <TableCell><div className="flex items-center gap-2 w-28"><Progress value={s.progress} className="h-1.5" /><span className="text-[11px] tabular-nums">{s.progress}%</span></div></TableCell>
                  <TableCell className="text-sm tabular-nums">{s.gpa.toFixed(2)}</TableCell>
                  <TableCell><RiskBadge risk={s.risk} /></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">No students match your filters.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Students;
