// Centralized mock data for ABC Program Admin Dashboard.
// Realistic African business school context — used across every module.

export type Status = "active" | "draft" | "archived";
export type RiskLevel = "low" | "medium" | "high";

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  cohorts: number;
  enrolled: number;
  completion: number;
  status: Status;
  outcomes: string[];
  skills: string[];
}

export interface Course {
  id: string;
  title: string;
  programId: string;
  modules: number;
  faculty: string;
  status: Status;
  description: string;
}

export interface Cohort {
  id: string;
  name: string;
  programId: string;
  startDate: string;
  endDate: string;
  students: number;
  progress: number;
  atRisk: number;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  title: string;
  expertise: string[];
  programs: number;
  courses: number;
  workload: number; // 0-100
  rating: number;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  industry: string;
  cohorts: number;
  students: number;
  availability: number; // 0-100
}

export interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  cohort: string;
  progress: number;
  gpa: number;
  risk: RiskLevel;
  country: string;
}

export interface Assessment {
  id: string;
  title: string;
  course: string;
  type: "quiz" | "assignment" | "project" | "exam";
  dueDate: string;
  submissions: number;
  totalStudents: number;
  graded: number;
}

export interface Simulation {
  id: string;
  title: string;
  scenario: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "active" | "scheduled" | "completed";
  participants: number;
  avgScore: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  sentAt: string;
  status: "sent" | "scheduled" | "draft";
}

export const programs: Program[] = [
  {
    id: "p-leadership",
    title: "Leadership Excellence Program",
    category: "Leadership",
    description: "A 12-week executive leadership program preparing managers for C-suite responsibilities across African markets.",
    duration: "12 weeks",
    cohorts: 4,
    enrolled: 312,
    completion: 87,
    status: "active",
    outcomes: ["Strategic thinking", "Team leadership", "Stakeholder communication", "Change management"],
    skills: ["Decision-making", "Negotiation", "Public speaking", "Cross-cultural management"],
  },
  {
    id: "p-entrepreneurship",
    title: "Entrepreneurship Lab",
    category: "Entrepreneurship",
    description: "Hands-on venture-building program for early-stage African founders, from idea to seed funding.",
    duration: "16 weeks",
    cohorts: 6,
    enrolled: 428,
    completion: 74,
    status: "active",
    outcomes: ["Validated MVP", "Pitch deck", "Financial model", "Go-to-market plan"],
    skills: ["Customer discovery", "Lean canvas", "Fundraising", "Unit economics"],
  },
  {
    id: "p-finance",
    title: "Strategic Finance for Executives",
    category: "Finance",
    description: "Advanced corporate finance and capital strategy for executives operating in African capital markets.",
    duration: "10 weeks",
    cohorts: 3,
    enrolled: 198,
    completion: 91,
    status: "active",
    outcomes: ["Capital allocation", "Valuation modeling", "Risk frameworks"],
    skills: ["DCF modeling", "Treasury", "M&A analysis", "FX risk"],
  },
  {
    id: "p-digital",
    title: "Digital Transformation",
    category: "Technology",
    description: "Drive digital change across legacy organizations with frameworks tailored to African enterprises.",
    duration: "14 weeks",
    cohorts: 5,
    enrolled: 356,
    completion: 82,
    status: "active",
    outcomes: ["Digital roadmap", "Tech operating model", "AI adoption playbook"],
    skills: ["Cloud strategy", "Data literacy", "Agile leadership", "AI governance"],
  },
  {
    id: "p-agribusiness",
    title: "Agribusiness Management",
    category: "Operations",
    description: "Modern agribusiness management for sub-Saharan supply chains and export operations.",
    duration: "12 weeks",
    cohorts: 2,
    enrolled: 142,
    completion: 79,
    status: "active",
    outcomes: ["Supply chain optimization", "Export readiness", "Sustainability"],
    skills: ["Logistics", "Compliance", "Cooperative management"],
  },
  {
    id: "p-women",
    title: "Women in Leadership",
    category: "Leadership",
    description: "Sponsored leadership accelerator for high-potential women across the continent.",
    duration: "8 weeks",
    cohorts: 3,
    enrolled: 218,
    completion: 93,
    status: "active",
    outcomes: ["Executive presence", "Sponsorship network", "Career roadmap"],
    skills: ["Influence", "Negotiation", "Personal branding"],
  },
  {
    id: "p-fintech",
    title: "Fintech Innovation Lab",
    category: "Technology",
    description: "Build fintech products for the African market — mobile money, lending, and payments.",
    duration: "14 weeks",
    cohorts: 1,
    enrolled: 64,
    completion: 0,
    status: "draft",
    outcomes: ["Working prototype", "Regulatory map", "Pilot partnership"],
    skills: ["Product management", "Compliance", "API integration"],
  },
];

export const courses: Course[] = [
  { id: "c1", title: "Strategic Decision Making", programId: "p-leadership", modules: 8, faculty: "Dr. Amara Okafor", status: "active", description: "Frameworks for high-stakes executive decisions." },
  { id: "c2", title: "Team Dynamics & Culture", programId: "p-leadership", modules: 6, faculty: "Prof. Tendai Moyo", status: "active", description: "Build resilient, high-performing teams." },
  { id: "c3", title: "Customer Discovery", programId: "p-entrepreneurship", modules: 7, faculty: "Dr. Kwame Asante", status: "active", description: "Find and validate your first 10 customers." },
  { id: "c4", title: "Fundraising Fundamentals", programId: "p-entrepreneurship", modules: 9, faculty: "Ms. Zanele Dlamini", status: "active", description: "From friends-and-family to Series A." },
  { id: "c5", title: "Corporate Valuation", programId: "p-finance", modules: 10, faculty: "Prof. Olusegun Bello", status: "active", description: "DCF, comparables, and African market premiums." },
  { id: "c6", title: "Treasury Management", programId: "p-finance", modules: 8, faculty: "Dr. Fatima El-Sayed", status: "active", description: "FX, liquidity, and capital structure." },
  { id: "c7", title: "Cloud Strategy", programId: "p-digital", modules: 7, faculty: "Mr. Sipho Nkosi", status: "active", description: "Migration, cost, and sovereignty." },
  { id: "c8", title: "AI for Executives", programId: "p-digital", modules: 6, faculty: "Dr. Amara Okafor", status: "active", description: "Strategic adoption and governance." },
  { id: "c9", title: "Supply Chain Optimization", programId: "p-agribusiness", modules: 8, faculty: "Prof. Tendai Moyo", status: "active", description: "End-to-end agri logistics." },
  { id: "c10", title: "Executive Presence", programId: "p-women", modules: 5, faculty: "Ms. Zanele Dlamini", status: "active", description: "Voice, body, and boardroom impact." },
];

export const cohorts: Cohort[] = [
  { id: "co1", name: "Lagos '25 Cohort A", programId: "p-leadership", startDate: "2025-01-15", endDate: "2025-04-09", students: 78, progress: 64, atRisk: 5 },
  { id: "co2", name: "Nairobi '25 Cohort A", programId: "p-leadership", startDate: "2025-02-01", endDate: "2025-04-26", students: 82, progress: 52, atRisk: 7 },
  { id: "co3", name: "Cairo '25 Cohort B", programId: "p-finance", startDate: "2025-01-10", endDate: "2025-03-21", students: 64, progress: 71, atRisk: 3 },
  { id: "co4", name: "Accra '25 Cohort A", programId: "p-entrepreneurship", startDate: "2025-02-10", endDate: "2025-06-02", students: 88, progress: 38, atRisk: 12 },
  { id: "co5", name: "Cape Town '25 Cohort A", programId: "p-digital", startDate: "2025-01-20", endDate: "2025-04-28", students: 71, progress: 58, atRisk: 6 },
  { id: "co6", name: "Kigali '25 Cohort A", programId: "p-women", startDate: "2025-03-01", endDate: "2025-04-26", students: 54, progress: 22, atRisk: 2 },
  { id: "co7", name: "Johannesburg '24 Cohort C", programId: "p-leadership", startDate: "2024-10-01", endDate: "2024-12-22", students: 75, progress: 100, atRisk: 0 },
  { id: "co8", name: "Dakar '25 Cohort A", programId: "p-agribusiness", startDate: "2025-02-15", endDate: "2025-05-10", students: 62, progress: 41, atRisk: 8 },
];

export const faculty: Faculty[] = [
  { id: "f1", name: "Dr. Amara Okafor", email: "amara.okafor@abc.edu", title: "Professor of Strategy", expertise: ["Strategy", "AI"], programs: 3, courses: 5, workload: 82, rating: 4.8 },
  { id: "f2", name: "Prof. Tendai Moyo", email: "tendai.moyo@abc.edu", title: "Professor of Operations", expertise: ["Operations", "Supply Chain"], programs: 2, courses: 4, workload: 71, rating: 4.6 },
  { id: "f3", name: "Dr. Kwame Asante", email: "kwame.asante@abc.edu", title: "Senior Lecturer", expertise: ["Entrepreneurship"], programs: 1, courses: 3, workload: 58, rating: 4.9 },
  { id: "f4", name: "Ms. Zanele Dlamini", email: "zanele.dlamini@abc.edu", title: "Industry Faculty", expertise: ["Finance", "Leadership"], programs: 3, courses: 4, workload: 88, rating: 4.7 },
  { id: "f5", name: "Prof. Olusegun Bello", email: "olusegun.bello@abc.edu", title: "Professor of Finance", expertise: ["Valuation", "M&A"], programs: 1, courses: 3, workload: 64, rating: 4.5 },
  { id: "f6", name: "Dr. Fatima El-Sayed", email: "fatima.elsayed@abc.edu", title: "Associate Professor", expertise: ["Treasury", "FX"], programs: 1, courses: 2, workload: 42, rating: 4.7 },
  { id: "f7", name: "Mr. Sipho Nkosi", email: "sipho.nkosi@abc.edu", title: "Industry Faculty", expertise: ["Cloud", "Tech"], programs: 1, courses: 2, workload: 51, rating: 4.4 },
];

export const mentors: Mentor[] = [
  { id: "m1", name: "Chinedu Adebayo", email: "chinedu@mentors.abc.edu", industry: "Banking", cohorts: 3, students: 28, availability: 60 },
  { id: "m2", name: "Wanjiru Mwangi", email: "wanjiru@mentors.abc.edu", industry: "Fintech", cohorts: 2, students: 18, availability: 75 },
  { id: "m3", name: "Lerato Khumalo", email: "lerato@mentors.abc.edu", industry: "Consulting", cohorts: 4, students: 36, availability: 30 },
  { id: "m4", name: "Yusuf Bahir", email: "yusuf@mentors.abc.edu", industry: "Manufacturing", cohorts: 2, students: 22, availability: 80 },
  { id: "m5", name: "Aminata Diallo", email: "aminata@mentors.abc.edu", industry: "Agribusiness", cohorts: 1, students: 12, availability: 90 },
  { id: "m6", name: "Thabo Mbeki Jr.", email: "thabo@mentors.abc.edu", industry: "Energy", cohorts: 3, students: 24, availability: 45 },
];

const firstNames = ["Amara","Kwame","Fatima","Sipho","Zanele","Tendai","Olusegun","Chinedu","Wanjiru","Lerato","Yusuf","Aminata","Thabo","Ngozi","Kofi","Ayanda","Tariq","Bola","Esi","Mariam"];
const lastNames = ["Okafor","Asante","El-Sayed","Nkosi","Dlamini","Moyo","Bello","Adebayo","Mwangi","Khumalo","Bahir","Diallo","Mbeki","Eze","Mensah","Zulu","Hassan","Adeyemi","Owusu","Sow"];
const countries = ["Nigeria","Kenya","South Africa","Egypt","Ghana","Rwanda","Senegal","Morocco","Ethiopia","Tanzania"];
const risks: RiskLevel[] = ["low","low","low","low","medium","medium","high"];

export const students: Student[] = Array.from({ length: 48 }).map((_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[(i * 3) % lastNames.length];
  const cohort = cohorts[i % cohorts.length];
  const program = programs.find((p) => p.id === cohort.programId)!;
  return {
    id: `s${i + 1}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase().replace("'","" )}@students.abc.edu`,
    program: program.title,
    cohort: cohort.name,
    progress: 20 + ((i * 7) % 80),
    gpa: 2.5 + ((i * 13) % 150) / 100,
    risk: risks[(i * 5) % risks.length],
    country: countries[i % countries.length],
  };
});

export const assessments: Assessment[] = [
  { id: "a1", title: "Strategy Case: Dangote Cement", course: "Strategic Decision Making", type: "assignment", dueDate: "2025-03-12", submissions: 72, totalStudents: 78, graded: 60 },
  { id: "a2", title: "Quiz: Lean Canvas", course: "Customer Discovery", type: "quiz", dueDate: "2025-03-08", submissions: 85, totalStudents: 88, graded: 85 },
  { id: "a3", title: "Valuation Project: MTN", course: "Corporate Valuation", type: "project", dueDate: "2025-03-20", submissions: 48, totalStudents: 64, graded: 32 },
  { id: "a4", title: "Midterm Exam", course: "AI for Executives", type: "exam", dueDate: "2025-03-15", submissions: 65, totalStudents: 71, graded: 65 },
  { id: "a5", title: "Pitch Deck v1", course: "Fundraising Fundamentals", type: "assignment", dueDate: "2025-03-18", submissions: 80, totalStudents: 88, graded: 50 },
  { id: "a6", title: "FX Hedging Quiz", course: "Treasury Management", type: "quiz", dueDate: "2025-03-10", submissions: 60, totalStudents: 64, graded: 60 },
];

export const simulations: Simulation[] = [
  { id: "sim1", title: "Market Entry: East Africa", scenario: "Launch a fintech in Kenya, Uganda, Tanzania", difficulty: "advanced", status: "active", participants: 142, avgScore: 78 },
  { id: "sim2", title: "Cash Flow Crisis", scenario: "Navigate a 90-day liquidity crunch", difficulty: "intermediate", status: "active", participants: 88, avgScore: 71 },
  { id: "sim3", title: "M&A Negotiation", scenario: "Acquire a regional competitor", difficulty: "advanced", status: "scheduled", participants: 0, avgScore: 0 },
  { id: "sim4", title: "Supply Chain Disruption", scenario: "Port closure recovery plan", difficulty: "intermediate", status: "completed", participants: 124, avgScore: 82 },
  { id: "sim5", title: "Founder's Dilemma", scenario: "Equity split with co-founders", difficulty: "beginner", status: "completed", participants: 198, avgScore: 86 },
];

export const announcements: Announcement[] = [
  { id: "an1", title: "Welcome — Spring 2025 Cohorts", body: "We are thrilled to welcome our new spring cohorts across the continent.", audience: "All students", sentAt: "2025-02-01", status: "sent" },
  { id: "an2", title: "Faculty Town Hall — March 8", body: "Quarterly faculty town hall with the Dean.", audience: "All faculty", sentAt: "2025-03-01", status: "sent" },
  { id: "an3", title: "Simulation Launch: Market Entry", body: "Advanced simulation opens Monday for Strategy cohorts.", audience: "Leadership cohorts", sentAt: "2025-03-15", status: "scheduled" },
  { id: "an4", title: "End-of-term Survey", body: "Please complete your end-of-term feedback.", audience: "Lagos '25 Cohort A", sentAt: "", status: "draft" },
];

// Time series for charts
export const enrollmentTrend = [
  { month: "Sep", students: 1840 },
  { month: "Oct", students: 1920 },
  { month: "Nov", students: 2010 },
  { month: "Dec", students: 2105 },
  { month: "Jan", students: 2280 },
  { month: "Feb", students: 2410 },
  { month: "Mar", students: 2536 },
];

export const completionTrend = [
  { month: "Sep", rate: 76 },
  { month: "Oct", rate: 78 },
  { month: "Nov", rate: 80 },
  { month: "Dec", rate: 81 },
  { month: "Jan", rate: 83 },
  { month: "Feb", rate: 84 },
  { month: "Mar", rate: 85 },
];

export const engagementHeatmap = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [8, 10, 12, 14, 16, 18, 20];
  return days.map((d) => ({
    day: d,
    values: hours.map((h) => ({ hour: h, value: Math.round(20 + Math.random() * 80) })),
  }));
})();

export const facultyWorkload = faculty.map((f) => ({ name: f.name.split(" ").slice(-1)[0], workload: f.workload }));

export const activityFeed = [
  { id: 1, type: "enrollment", text: "12 new students enrolled in Entrepreneurship Lab", time: "2 min ago" },
  { id: 2, type: "submission", text: "Lagos '25 Cohort A — 28 assignments submitted", time: "14 min ago" },
  { id: 3, type: "simulation", text: "Market Entry simulation completed by 8 students", time: "1 hr ago" },
  { id: 4, type: "faculty", text: "Dr. Amara Okafor updated Strategic Decision Making", time: "2 hr ago" },
  { id: 5, type: "alert", text: "Accra '25 Cohort A flagged: low engagement (4 days)", time: "3 hr ago" },
  { id: 6, type: "announcement", text: "Faculty Town Hall scheduled for March 8", time: "5 hr ago" },
];

export type SystemAlert = {
  id: string;
  type: "engagement" | "workload" | "academic" | "simulation";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  entityType: "cohort" | "faculty" | "program" | "simulation";
  entityId: string;
  actionType: "navigate" | "modal" | "filteredView";
  route?: string;
  modalReference?: string;
  timestamp: string;
  recommendedAction: string;
};

export const systemAlerts: SystemAlert[] = [
  { id: "alert-engagement-accra", type: "engagement", severity: "high", title: "Accra '25 Cohort A — engagement drop", description: "Engagement down 32% over 4 days. Consider mentor outreach.", entityType: "cohort", entityId: "accra-25-cohort-a", actionType: "navigate", route: "/cohorts/accra-25-cohort-a/analytics", timestamp: "2025-03-18 09:14", recommendedAction: "Assign a mentor and send targeted intervention messages to low-activity students." },
  { id: "alert-workload-zanele", type: "workload", severity: "medium", title: "Ms. Zanele Dlamini overloaded", description: "Workload at 88% — reassign 1 course.", entityType: "faculty", entityId: "zanele-dlamini", actionType: "navigate", route: "/faculty/zanele-dlamini", modalReference: "ReassignCourseModal", timestamp: "2025-03-18 08:42", recommendedAction: "Move one active course to a faculty member below 70% capacity." },
  { id: "alert-assignments-customer-discovery", type: "academic", severity: "medium", title: "12 missing assignments in Customer Discovery", description: "Dakar '25 Cohort A — past 48hrs.", entityType: "program", entityId: "customer-discovery", actionType: "filteredView", route: "/programs/customer-discovery/assignments?status=missing", timestamp: "2025-03-18 07:55", recommendedAction: "Bulk notify students and alert the cohort mentor." },
  { id: "alert-simulation-ma", type: "simulation", severity: "low", title: "Simulation 'M&A Negotiation' starts in 2 days", description: "62 students enrolled.", entityType: "simulation", entityId: "ma-negotiation", actionType: "navigate", route: "/simulations/ma-negotiation", timestamp: "2025-03-18 06:30", recommendedAction: "Review launch settings and notify participants." },
];

export const aiInsights = [
  { id: 1, title: "Boost Accra cohort retention", description: "AI predicts 18% dropout risk if no intervention within 5 days. Suggest pairing with mentor Wanjiru Mwangi.", action: "Assign mentor" },
  { id: 2, title: "Rebalance faculty workload", description: "Ms. Dlamini at 88% load. Reassigning Course C2 to Dr. Asante balances both to ~70%.", action: "Rebalance" },
  { id: 3, title: "Launch Fintech program", description: "Demand signals (waitlist + survey) suggest moving Fintech Lab from draft to active for Q2.", action: "Activate" },
];

export const kpis = {
  activePrograms: programs.filter((p) => p.status === "active").length,
  enrolledStudents: 2536,
  facultyAssigned: faculty.length,
  activeSimulations: simulations.filter((s) => s.status === "active").length,
  completionRate: 85,
  atRiskStudents: students.filter((s) => s.risk === "high").length + 24,
};
