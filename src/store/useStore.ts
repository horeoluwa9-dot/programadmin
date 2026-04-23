// In-memory CRUD store (Zustand) for ABC dashboard.
// Lets every "Create / Edit / Delete / Toggle" CTA actually mutate UI state.
import { create } from "zustand";
import {
  programs as seedPrograms,
  courses as seedCourses,
  cohorts as seedCohorts,
  faculty as seedFaculty,
  mentors as seedMentors,
  students as seedStudents,
  assessments as seedAssessments,
  simulations as seedSimulations,
  announcements as seedAnnouncements,
  type Program,
  type Course,
  type Cohort,
  type Faculty,
  type Mentor,
  type Student,
  type Assessment,
  type Simulation,
  type Announcement,
  type Status,
} from "@/data/mock";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  severity: "info" | "warning" | "critical" | "success";
  type: "alert" | "submission" | "enrollment" | "simulation" | "faculty" | "system";
}

export interface Message {
  id: string;
  from: string;
  fromRole: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  read: boolean;
}

interface State {
  programs: Program[];
  courses: Course[];
  cohorts: Cohort[];
  faculty: Faculty[];
  mentors: Mentor[];
  students: Student[];
  assessments: Assessment[];
  simulations: Simulation[];
  announcements: Announcement[];
  notifications: Notification[];
  messages: Message[];
  // Programs
  addProgram: (p: Omit<Program, "id" | "cohorts" | "enrolled" | "completion" | "outcomes" | "skills">) => Program;
  updateProgram: (id: string, patch: Partial<Program>) => void;
  removeProgram: (id: string) => void;
  toggleProgramStatus: (id: string) => void;
  // Courses
  addCourse: (c: Omit<Course, "id">) => Course;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  removeCourse: (id: string) => void;
  // Cohorts
  addCohort: (c: Omit<Cohort, "id" | "progress" | "atRisk">) => Cohort;
  updateCohort: (id: string, patch: Partial<Cohort>) => void;
  removeCohort: (id: string) => void;
  // Faculty
  addFaculty: (f: Omit<Faculty, "id" | "programs" | "courses" | "workload" | "rating" | "expertise"> & { expertise?: string[] }) => Faculty;
  removeFaculty: (id: string) => void;
  // Mentors
  addMentor: (m: Omit<Mentor, "id" | "cohorts" | "students" | "availability">) => Mentor;
  removeMentor: (id: string) => void;
  // Students
  addStudent: (s: Omit<Student, "id" | "progress" | "gpa" | "risk">) => Student;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  // Assessments
  addAssessment: (a: Omit<Assessment, "id" | "submissions" | "graded">) => Assessment;
  removeAssessment: (id: string) => void;
  // Simulations
  addSimulation: (s: Omit<Simulation, "id" | "participants" | "avgScore">) => Simulation;
  updateSimulation: (id: string, patch: Partial<Simulation>) => void;
  removeSimulation: (id: string) => void;
  // Announcements
  addAnnouncement: (a: Omit<Announcement, "id">) => Announcement;
  removeAnnouncement: (id: string) => void;
  // Notifications + messages
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  markMessageRead: (id: string) => void;
  removeMessage: (id: string) => void;
}

const id = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const seedNotifications: Notification[] = [
  { id: "n1", title: "Accra cohort engagement drop", description: "Engagement dropped 32% over 4 days. Recommend mentor outreach.", time: "5m ago", read: false, severity: "critical", type: "alert" },
  { id: "n2", title: "12 new enrollments", description: "Entrepreneurship Lab — March cohort.", time: "22m ago", read: false, severity: "success", type: "enrollment" },
  { id: "n3", title: "Faculty workload high", description: "Ms. Zanele Dlamini at 88% capacity.", time: "1h ago", read: false, severity: "warning", type: "faculty" },
  { id: "n4", title: "Simulation completed", description: "Founder's Dilemma — 198 participants, avg 86.", time: "3h ago", read: true, severity: "info", type: "simulation" },
  { id: "n5", title: "28 assignments submitted", description: "Lagos '25 Cohort A — Strategy Case.", time: "5h ago", read: true, severity: "info", type: "submission" },
  { id: "n6", title: "System backup completed", description: "Daily snapshot stored in eu-west-1.", time: "8h ago", read: true, severity: "info", type: "system" },
];

const seedMessages: Message[] = [
  { id: "msg1", from: "Dr. Amara Okafor", fromRole: "Faculty · Strategy", subject: "Cohort Lagos '25 mid-term review", preview: "Wanted to share my notes on the strategy case…", body: "Hi Adaeze,\n\nWanted to share my notes on the Dangote Cement strategy case. Most of the cohort understood the core market entry trade-offs, but a few struggled with the regulatory layer. Could we set 30 min next week?\n\nBest,\nAmara", time: "12m ago", read: false },
  { id: "msg2", from: "Wanjiru Mwangi", fromRole: "Mentor · Fintech", subject: "Pairing for Accra cohort", preview: "Happy to take 4 more students from the at-risk list…", body: "Hi Adaeze, happy to take on 4 more at-risk students from the Accra cohort. Send me the list when convenient.\n\n— Wanjiru", time: "1h ago", read: false },
  { id: "msg3", from: "Prof. Olusegun Bello", fromRole: "Faculty · Finance", subject: "Valuation project deadline", preview: "Requesting a 5-day extension on the MTN project…", body: "Adaeze, requesting a 5-day extension on the MTN valuation project — many students are travelling for AfCFTA week. Thanks.", time: "Yesterday", read: true },
  { id: "msg4", from: "Sipho Nkosi", fromRole: "Faculty · Cloud", subject: "AWS credits for cohort", preview: "We've secured $5k in credits for each Cape Town student…", body: "Great news — AWS gave us $5k credits per student in Cape Town. Forwarding the activation links shortly.", time: "2 days ago", read: true },
];

export const useStore = create<State>((set) => ({
  programs: [...seedPrograms],
  courses: [...seedCourses],
  cohorts: [...seedCohorts],
  faculty: [...seedFaculty],
  mentors: [...seedMentors],
  students: [...seedStudents],
  assessments: [...seedAssessments],
  simulations: [...seedSimulations],
  announcements: [...seedAnnouncements],
  notifications: seedNotifications,
  messages: seedMessages,

  addProgram: (p) => {
    const program: Program = { id: id("p"), cohorts: 0, enrolled: 0, completion: 0, outcomes: [], skills: [], ...p };
    set((s) => ({ programs: [program, ...s.programs] }));
    return program;
  },
  updateProgram: (id, patch) => set((s) => ({ programs: s.programs.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
  removeProgram: (id) => set((s) => ({ programs: s.programs.filter((p) => p.id !== id) })),
  toggleProgramStatus: (id) => set((s) => ({
    programs: s.programs.map((p) => p.id === id ? { ...p, status: (p.status === "active" ? "draft" : "active") as Status } : p),
  })),

  addCourse: (c) => {
    const course: Course = { id: id("c"), ...c };
    set((s) => ({ courses: [course, ...s.courses] }));
    return course;
  },
  updateCourse: (id, patch) => set((s) => ({ courses: s.courses.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
  removeCourse: (id) => set((s) => ({ courses: s.courses.filter((c) => c.id !== id) })),

  addCohort: (c) => {
    const cohort: Cohort = { id: id("co"), progress: 0, atRisk: 0, ...c };
    set((s) => ({ cohorts: [cohort, ...s.cohorts] }));
    return cohort;
  },
  updateCohort: (id, patch) => set((s) => ({ cohorts: s.cohorts.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
  removeCohort: (id) => set((s) => ({ cohorts: s.cohorts.filter((c) => c.id !== id) })),

  addFaculty: (f) => {
    const fac: Faculty = { id: id("f"), expertise: f.expertise ?? [], programs: 0, courses: 0, workload: 30, rating: 4.5, ...f };
    set((s) => ({ faculty: [fac, ...s.faculty] }));
    return fac;
  },
  removeFaculty: (id) => set((s) => ({ faculty: s.faculty.filter((f) => f.id !== id) })),

  addMentor: (m) => {
    const mentor: Mentor = { id: id("m"), cohorts: 0, students: 0, availability: 80, ...m };
    set((s) => ({ mentors: [mentor, ...s.mentors] }));
    return mentor;
  },
  removeMentor: (id) => set((s) => ({ mentors: s.mentors.filter((m) => m.id !== id) })),

  addStudent: (st) => {
    const stu: Student = { id: id("s"), progress: 0, gpa: 3.0, risk: "low", ...st };
    set((s) => ({ students: [stu, ...s.students] }));
    return stu;
  },
  updateStudent: (id, patch) => set((s) => ({ students: s.students.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
  removeStudent: (id) => set((s) => ({ students: s.students.filter((x) => x.id !== id) })),

  addAssessment: (a) => {
    const ass: Assessment = { id: id("a"), submissions: 0, graded: 0, ...a };
    set((s) => ({ assessments: [ass, ...s.assessments] }));
    return ass;
  },
  removeAssessment: (id) => set((s) => ({ assessments: s.assessments.filter((a) => a.id !== id) })),

  addSimulation: (sim) => {
    const s: Simulation = { id: id("sim"), participants: 0, avgScore: 0, ...sim };
    set((st) => ({ simulations: [s, ...st.simulations] }));
    return s;
  },
  updateSimulation: (id, patch) => set((s) => ({ simulations: s.simulations.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
  removeSimulation: (id) => set((s) => ({ simulations: s.simulations.filter((x) => x.id !== id) })),

  addAnnouncement: (a) => {
    const an: Announcement = { id: id("an"), ...a };
    set((s) => ({ announcements: [an, ...s.announcements] }));
    return an;
  },
  removeAnnouncement: (id) => set((s) => ({ announcements: s.announcements.filter((a) => a.id !== id) })),

  markNotificationRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
  markAllNotificationsRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  removeNotification: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
  markMessageRead: (id) => set((s) => ({ messages: s.messages.map((m) => m.id === id ? { ...m, read: true } : m) })),
  removeMessage: (id) => set((s) => ({ messages: s.messages.filter((m) => m.id !== id) })),
}));
