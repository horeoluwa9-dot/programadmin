import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, ClipboardCheck, FileText, FlaskConical, BookOpen, Check, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { NewAssessmentDialog } from "@/components/forms/EntityDialogs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { downloadCSV } from "@/lib/exporters";

const typeIcon: Record<string, any> = { quiz: ClipboardCheck, assignment: FileText, project: FlaskConical, exam: BookOpen };

const Assessments = () => {
  const assessments = useStore((s) => s.assessments);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = assessments.find((a) => a.id === openId);

  return (
    <>
      <PageHeader
        title="Assessments"
        subtitle="Quizzes, assignments, projects and exams across all courses"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => downloadCSV("assessments.csv", assessments)}>Export CSV</Button>
            <NewAssessmentDialog trigger={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> New assessment</Button>} />
          </>
        }
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
                    <TableCell><Button size="sm" variant="outline" onClick={() => setOpenId(a.id)}>Open</Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{open?.title}</DialogTitle></DialogHeader>
          {open && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Course" value={open.course} />
                <Stat label="Type" value={open.type} />
                <Stat label="Due date" value={open.dueDate} />
                <Stat label="Submissions" value={`${open.submissions} / ${open.totalStudents}`} />
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="font-medium mb-2">Grading queue</p>
                <div className="space-y-1.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border last:border-0 pb-1.5">
                      <span>Submission #{1042 + i}</span>
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="outline" className="h-7" onClick={() => toast.success("Approved")}><Check className="h-3 w-3" /> Approve</Button>
                        <Button size="sm" variant="outline" className="h-7" onClick={() => toast.error("Rejected")}><X className="h-3 w-3" /> Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md bg-muted/50 p-2.5">
    <p className="text-[10px] uppercase text-muted-foreground tracking-wide">{label}</p>
    <p className="text-sm font-medium capitalize">{value}</p>
  </div>
);

export default Assessments;
