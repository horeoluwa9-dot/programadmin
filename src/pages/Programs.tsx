import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Clock, TrendingUp, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/shared/Badges";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/store/useStore";
import { NewProgramDialog } from "@/components/forms/EntityDialogs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadCSV } from "@/lib/exporters";

const Programs = () => {
  const programs = useStore((s) => s.programs);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () => programs.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
    ),
    [programs, q, cat]
  );

  const cats = Array.from(new Set(programs.map((p) => p.category)));

  return (
    <>
      <PageHeader
        title="Programs"
        subtitle="Manage academic programs across the institution"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => downloadCSV("programs.csv", filtered)}>Export CSV</Button>
            <NewProgramDialog
              trigger={
                <Button size="sm" className="bg-gradient-primary">
                  <Plus className="h-4 w-4" /> New program
                </Button>
              }
            />
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search programs…" className="h-9 pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="h-9 w-44"><Filter className="h-3.5 w-3.5 mr-1" /><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {cats.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <Link to={`/programs/${p.id}`} key={p.id}>
            <Card className="h-full shadow-elev-sm transition-all hover:shadow-elev-md hover:border-accent/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.category}</p>
                    <h3 className="mt-1 text-base font-semibold leading-snug">{p.title}</h3>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3 text-xs">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />Duration</div>
                    <div className="mt-0.5 font-medium tabular-nums">{p.duration}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" />Cohorts</div>
                    <div className="mt-0.5 font-medium tabular-nums">{p.cohorts}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground"><TrendingUp className="h-3 w-3" />Enrolled</div>
                    <div className="mt-0.5 font-medium tabular-nums">{p.enrolled}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Completion</span>
                    <span className="font-medium tabular-nums text-foreground">{p.completion}%</span>
                  </div>
                  <Progress value={p.completion} className="mt-1 h-1.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <Card className="md:col-span-2 xl:col-span-3"><CardContent className="p-8 text-center text-sm text-muted-foreground">No programs match your filters.</CardContent></Card>
        )}
      </div>
    </>
  );
};

export default Programs;
