import { useState, ReactNode } from "react";
import { FormDialog, FormField } from "./FormDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

export function NewProgramDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Leadership");
  const [duration, setDuration] = useState("12 weeks");
  const [description, setDescription] = useState("");
  const addProgram = useStore((s) => s.addProgram);

  const submit = () => {
    if (!title.trim()) return toast.error("Program title is required");
    addProgram({ title, category, duration, description, status: "draft" });
    toast.success(`Program "${title}" created as draft`);
    setOpen(false);
    setTitle(""); setDescription("");
  };

  return (
    <FormDialog
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      title="New program"
      description="Create a new academic program. You can structure modules and assign faculty after."
      onSubmit={submit}
      submitLabel="Create program"
    >
      <FormField label="Title" required>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. ESG Leadership for African Boards" />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Category">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Leadership","Entrepreneurship","Finance","Technology","Operations","Marketing"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Duration">
          <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 12 weeks" />
        </FormField>
      </div>
      <FormField label="Description" hint="Shown to applicants and on the catalog page.">
        <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short summary of the program…" />
      </FormField>
    </FormDialog>
  );
}

export function NewCourseDialog({ trigger, programId }: { trigger: ReactNode; programId?: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [pId, setPId] = useState(programId ?? "");
  const [modules, setModules] = useState(6);
  const [faculty, setFaculty] = useState("");
  const [description, setDescription] = useState("");
  const programs = useStore((s) => s.programs);
  const facultyList = useStore((s) => s.faculty);
  const addCourse = useStore((s) => s.addCourse);

  const submit = () => {
    if (!title.trim() || !pId) return toast.error("Title and program required");
    addCourse({ title, programId: pId, modules, faculty: faculty || "Unassigned", status: "draft", description });
    toast.success(`Course "${title}" created`);
    setOpen(false); setTitle(""); setDescription("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="New course" onSubmit={submit} submitLabel="Create course">
      <FormField label="Course title" required>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Risk Frameworks for African Banks" />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Program" required>
          <Select value={pId} onValueChange={setPId}>
            <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
            <SelectContent>{programs.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
        <FormField label="Lead faculty">
          <Select value={faculty} onValueChange={setFaculty}>
            <SelectTrigger><SelectValue placeholder="Select faculty" /></SelectTrigger>
            <SelectContent>{facultyList.map((f) => <SelectItem key={f.id} value={f.name}>{f.name}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="Modules">
        <Input type="number" min={1} max={20} value={modules} onChange={(e) => setModules(parseInt(e.target.value || "1"))} />
      </FormField>
      <FormField label="Description">
        <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormField>
    </FormDialog>
  );
}

export function NewCohortDialog({ trigger, programId }: { trigger: ReactNode; programId?: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pId, setPId] = useState(programId ?? "");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [students, setStudents] = useState(50);
  const programs = useStore((s) => s.programs);
  const addCohort = useStore((s) => s.addCohort);

  const submit = () => {
    if (!name.trim() || !pId) return toast.error("Name and program are required");
    addCohort({ name, programId: pId, startDate: start || "2025-04-01", endDate: end || "2025-07-01", students });
    toast.success(`Cohort "${name}" created`);
    setOpen(false); setName("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="Create cohort" onSubmit={submit} submitLabel="Create cohort">
      <FormField label="Cohort name" required>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Lagos '25 Cohort B" />
      </FormField>
      <FormField label="Program" required>
        <Select value={pId} onValueChange={setPId}>
          <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
          <SelectContent>{programs.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Start date"><Input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></FormField>
        <FormField label="End date"><Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></FormField>
        <FormField label="Capacity"><Input type="number" value={students} onChange={(e) => setStudents(parseInt(e.target.value || "0"))} /></FormField>
      </div>
    </FormDialog>
  );
}

export function NewStudentDialog({ trigger, cohortId }: { trigger: ReactNode; cohortId?: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [coId, setCoId] = useState(cohortId ?? "");
  const cohorts = useStore((s) => s.cohorts);
  const programs = useStore((s) => s.programs);
  const addStudent = useStore((s) => s.addStudent);

  const submit = () => {
    if (!name.trim() || !email.trim() || !coId) return toast.error("Name, email and cohort required");
    const cohort = cohorts.find((c) => c.id === coId)!;
    const program = programs.find((p) => p.id === cohort.programId)!;
    addStudent({ name, email, country, cohort: cohort.name, program: program.title });
    toast.success(`${name} added to ${cohort.name}`);
    setOpen(false); setName(""); setEmail("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="Add student" onSubmit={submit} submitLabel="Add student">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Full name" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
        <FormField label="Email" required><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></FormField>
        <FormField label="Country">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["Nigeria","Kenya","South Africa","Egypt","Ghana","Rwanda","Senegal","Morocco","Ethiopia","Tanzania"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
        <FormField label="Cohort" required>
          <Select value={coId} onValueChange={setCoId}>
            <SelectTrigger><SelectValue placeholder="Select cohort" /></SelectTrigger>
            <SelectContent>{cohorts.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
      </div>
    </FormDialog>
  );
}

export function NewFacultyDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("Senior Lecturer");
  const [expertise, setExpertise] = useState("");
  const addFaculty = useStore((s) => s.addFaculty);

  const submit = () => {
    if (!name.trim() || !email.trim()) return toast.error("Name and email required");
    addFaculty({ name, email, title, expertise: expertise.split(",").map((e) => e.trim()).filter(Boolean) });
    toast.success(`${name} added to faculty`);
    setOpen(false); setName(""); setEmail(""); setExpertise("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="Add faculty" onSubmit={submit} submitLabel="Add faculty">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Full name" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
        <FormField label="Email" required><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></FormField>
        <FormField label="Title">
          <Select value={title} onValueChange={setTitle}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["Professor","Associate Professor","Senior Lecturer","Lecturer","Industry Faculty"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
        <FormField label="Expertise" hint="Comma separated (e.g. Strategy, AI)">
          <Input value={expertise} onChange={(e) => setExpertise(e.target.value)} placeholder="Strategy, Innovation" />
        </FormField>
      </div>
    </FormDialog>
  );
}

export function InviteMentorDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("Banking");
  const [note, setNote] = useState("");
  const addMentor = useStore((s) => s.addMentor);

  const submit = () => {
    if (!name.trim() || !email.trim()) return toast.error("Name and email required");
    addMentor({ name, email, industry });
    toast.success(`Invitation sent to ${email}`);
    setOpen(false); setName(""); setEmail(""); setNote("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="Invite mentor" onSubmit={submit} submitLabel="Send invitation">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Full name" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
        <FormField label="Email" required><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></FormField>
        <FormField label="Industry">
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["Banking","Fintech","Consulting","Manufacturing","Agribusiness","Energy","Healthcare","Tech"].map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="Personal note" hint="Included in the invitation email">
        <Textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Hi! We'd love to have you mentor our…" />
      </FormField>
    </FormDialog>
  );
}

export function NewAssessmentDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState<"quiz" | "assignment" | "project" | "exam">("assignment");
  const [dueDate, setDueDate] = useState("");
  const [total, setTotal] = useState(60);
  const courses = useStore((s) => s.courses);
  const addAssessment = useStore((s) => s.addAssessment);

  const submit = () => {
    if (!title.trim() || !course) return toast.error("Title and course required");
    addAssessment({ title, course, type, dueDate: dueDate || "2025-04-01", totalStudents: total });
    toast.success(`Assessment "${title}" created`);
    setOpen(false); setTitle("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="New assessment" onSubmit={submit} submitLabel="Create assessment">
      <FormField label="Title" required><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Final case study" /></FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Course" required>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
            <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.title}>{c.title}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
        <FormField label="Type">
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["quiz","assignment","project","exam"].map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
        <FormField label="Due date"><Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></FormField>
        <FormField label="Students enrolled"><Input type="number" value={total} onChange={(e) => setTotal(parseInt(e.target.value || "0"))} /></FormField>
      </div>
    </FormDialog>
  );
}

export function NewSimulationDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [scenario, setScenario] = useState("");
  const [difficulty, setDifficulty] = useState<"beginner"|"intermediate"|"advanced">("intermediate");
  const [status, setStatus] = useState<"active"|"scheduled"|"completed">("scheduled");
  const addSimulation = useStore((s) => s.addSimulation);

  const submit = () => {
    if (!title.trim() || !scenario.trim()) return toast.error("Title and scenario required");
    addSimulation({ title, scenario, difficulty, status });
    toast.success(status === "active" ? `Simulation "${title}" launched` : `Simulation "${title}" saved as ${status}`);
    setOpen(false); setTitle(""); setScenario("");
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title="New simulation" onSubmit={submit} submitLabel={status === "active" ? "Launch" : "Save"}>
      <FormField label="Title" required><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Cross-border M&A" /></FormField>
      <FormField label="Scenario" required>
        <Textarea rows={3} value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder="Describe the business scenario students will navigate…" />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Difficulty">
          <Select value={difficulty} onValueChange={(v) => setDifficulty(v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["beginner","intermediate","advanced"].map((d) => <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
        <FormField label="Status">
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["scheduled","active"].map((d) => <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>)}</SelectContent>
          </Select>
        </FormField>
      </div>
    </FormDialog>
  );
}

export function AssignMentorDialog({ trigger, mentorName }: { trigger: ReactNode; mentorName: string }) {
  const [open, setOpen] = useState(false);
  const [cohortId, setCohortId] = useState("");
  const cohorts = useStore((s) => s.cohorts);

  const submit = () => {
    if (!cohortId) return toast.error("Pick a cohort");
    const c = cohorts.find((x) => x.id === cohortId);
    toast.success(`${mentorName} assigned to ${c?.name}`);
    setOpen(false);
  };

  return (
    <FormDialog trigger={trigger} open={open} onOpenChange={setOpen} title={`Assign ${mentorName}`} onSubmit={submit} submitLabel="Assign mentor">
      <FormField label="Cohort" required>
        <Select value={cohortId} onValueChange={setCohortId}>
          <SelectTrigger><SelectValue placeholder="Select cohort" /></SelectTrigger>
          <SelectContent>{cohorts.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
    </FormDialog>
  );
}

export function ConfirmDialog({
  trigger, open, onOpenChange, title, description, confirmLabel = "Confirm", destructive, onConfirm,
}: {
  trigger?: ReactNode; open?: boolean; onOpenChange?: (b: boolean) => void;
  title: string; description?: string; confirmLabel?: string; destructive?: boolean;
  onConfirm: () => void;
}) {
  return (
    <FormDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      submitLabel={confirmLabel}
      onSubmit={() => { onConfirm(); onOpenChange?.(false); }}
      size="sm"
    >
      {destructive && (
        <p className="text-sm text-destructive bg-destructive-soft rounded-md p-3 border border-destructive/20">
          This action cannot be undone.
        </p>
      )}
    </FormDialog>
  );
}
