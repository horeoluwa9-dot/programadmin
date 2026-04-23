import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/shared/Badges";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";
import { NewCourseDialog } from "@/components/forms/EntityDialogs";
import { downloadCSV } from "@/lib/exporters";

const Courses = () => {
  const courses = useStore((s) => s.courses);
  const programs = useStore((s) => s.programs);
  const [q, setQ] = useState("");
  const filtered = useMemo(() => courses.filter((c) => c.title.toLowerCase().includes(q.toLowerCase())), [courses, q]);

  return (
    <>
      <PageHeader
        title="Courses"
        subtitle="Course library across all programs"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => downloadCSV("courses.csv", filtered)}>Export CSV</Button>
            <NewCourseDialog trigger={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4" /> New course</Button>} />
          </>
        }
      />
      <div className="mb-4 flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" className="h-9 pl-9" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => {
          const program = programs.find((p) => p.id === c.programId);
          return (
            <Link to={`/courses/${c.id}`} key={c.id}>
              <Card className="h-full shadow-elev-sm transition-all hover:shadow-elev-md hover:border-accent/50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{program?.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <Badge variant="secondary">{c.modules} modules</Badge>
                    <span className="text-muted-foreground">{c.faculty}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Courses;
