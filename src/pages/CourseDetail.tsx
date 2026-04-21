import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/data/mock";
import { ChevronLeft, BookOpen, Video, FileText, ClipboardCheck, FlaskConical, Sparkles, Eye, Plus } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  if (!course) return <div>Course not found</div>;

  return (
    <>
      <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
        <ChevronLeft className="h-4 w-4" /> Back to courses
      </Link>
      <PageHeader
        title={course.title}
        subtitle={`Faculty: ${course.faculty} · ${course.modules} modules`}
        actions={
          <>
            <Button size="sm" variant="outline"><Eye className="h-4 w-4" /> Preview</Button>
            <Button size="sm" className="bg-gradient-primary">Save course</Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left — module tree */}
        <Card className="lg:col-span-3 shadow-elev-sm">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm">Structure</CardTitle>
            <Button size="sm" variant="ghost" className="h-7"><Plus className="h-3.5 w-3.5" /></Button>
          </CardHeader>
          <CardContent className="text-sm space-y-1 pb-4">
            {Array.from({ length: course.modules }).map((_, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5 font-medium">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  Module {i + 1}
                </div>
                <div className="ml-5 space-y-0.5">
                  <div className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted/50 cursor-pointer">
                    <Video className="h-3 w-3 text-info" /> Lecture
                  </div>
                  <div className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-3 w-3 text-warning" /> Reading
                  </div>
                  <div className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted/50 cursor-pointer">
                    <ClipboardCheck className="h-3 w-3 text-accent" /> Quiz
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Center — lesson editor */}
        <Card className="lg:col-span-6 shadow-elev-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Lesson editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Lesson title</label>
              <Input defaultValue="Introduction to strategic frameworks" className="mt-1" />
            </div>
            <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
              <Video className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Upload video lecture</p>
              <p className="text-xs text-muted-foreground">MP4 up to 2GB · or paste a URL</p>
              <Button size="sm" variant="outline" className="mt-3">Choose file</Button>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Lesson content</label>
              <Textarea
                defaultValue="In this lesson we cover Porter's Five Forces, the Resource-Based View, and Blue Ocean strategy through African case studies including Safaricom's M-Pesa launch and Naspers' Tencent investment."
                rows={8}
                className="mt-1"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline"><FileText className="h-3 w-3 mr-1" /> Add reading</Badge>
              <Badge variant="outline"><ClipboardCheck className="h-3 w-3 mr-1" /> Add quiz</Badge>
              <Badge variant="outline"><FlaskConical className="h-3 w-3 mr-1" /> Add simulation</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Right — AI assistant + preview */}
        <Card className="lg:col-span-3 shadow-elev-sm overflow-hidden">
          <CardHeader className="bg-gradient-primary text-primary-foreground pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-primary-foreground">
              <Sparkles className="h-4 w-4 text-accent" /> AI content assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-4">
            <Button size="sm" variant="outline" className="w-full justify-start"><Sparkles className="h-3.5 w-3.5" /> Generate quiz</Button>
            <Button size="sm" variant="outline" className="w-full justify-start"><Sparkles className="h-3.5 w-3.5" /> Suggest readings</Button>
            <Button size="sm" variant="outline" className="w-full justify-start"><Sparkles className="h-3.5 w-3.5" /> Create assignment</Button>
            <Button size="sm" variant="outline" className="w-full justify-start"><Sparkles className="h-3.5 w-3.5" /> Improve clarity</Button>
            <div className="mt-3 rounded-md bg-accent-soft p-3 text-xs">
              <p className="font-medium text-accent-foreground">Tip</p>
              <p className="mt-0.5 text-muted-foreground">Use the chat assistant in the top bar to discuss curriculum strategy with the AI.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CourseDetail;
