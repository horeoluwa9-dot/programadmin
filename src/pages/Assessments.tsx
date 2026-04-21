import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { assessments } from "@/data/mock";
import { Plus, ClipboardCheck, FileText, FlaskConical, BookOpen } from "lucide-react";

const typeIcon: Record<string, any> = { quiz: ClipboardCheck, assignment: FileText, project: FlaskConical, exam: BookOpen };

const Assessments = () => {
  return (
    <>
      <PageHeader
        title="Assessments"
        subtitle="Quizzes, assignments, projects and exams across all courses"
        actions={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> New assessment</Button>}
      />
      <Card className="shadow-elev-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Graded</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((a) => {
                const Icon = typeIcon[a.type];
                const subRate = Math.round((a.submissions / a.totalStudents) * 100);
                const grRate = Math.round((a.graded / Math.max(a.submissions, 1)) * 100);
                return (
                  <TableRow key={a.id}>
                    <TableCell><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{a.title}</span></div></TableCell>
                    <TableCell className="text-sm">{a.course}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{a.type}</Badge></TableCell>
                    <TableCell className="text-sm tabular-nums">{a.dueDate}</TableCell>
                    <TableCell><div className="flex items-center gap-2 w-32"><Progress value={subRate} className="h-1.5" /><span className="text-[11px] tabular-nums">{a.submissions}/{a.totalStudents}</span></div></TableCell>
                    <TableCell><div className="flex items-center gap-2 w-32"><Progress value={grRate} className="h-1.5" /><span className="text-[11px] tabular-nums">{a.graded}/{a.submissions}</span></div></TableCell>
                    <TableCell><Button size="sm" variant="outline">Open</Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Assessments;
