import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index.tsx";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Cohorts from "./pages/Cohorts";
import CohortDetail from "./pages/CohortDetail";
import Faculty from "./pages/Faculty";
import Mentors from "./pages/Mentors";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Assessments from "./pages/Assessments";
import Simulations from "./pages/Simulations";
import Analytics from "./pages/Analytics";
import Announcements from "./pages/Announcements";
import Settings from "./pages/Settings";
import Permissions from "./pages/Permissions";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProgramAdminProfile from "./pages/ProgramAdminProfile";
import AlertDetail from "./pages/AlertDetail";
import FacultyDetail from "./pages/FacultyDetail";
import CohortAnalytics from "./pages/CohortAnalytics";
import ProgramAssignments from "./pages/ProgramAssignments";
import SimulationDetail from "./pages/SimulationDetail";
import ProgramEdit from "./pages/ProgramEdit";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/programs/:id/edit" element={<ProgramEdit />} />
            <Route path="/programs/:id/assignments" element={<ProgramAssignments />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/cohorts" element={<Cohorts />} />
            <Route path="/cohorts/:id" element={<CohortDetail />} />
            <Route path="/cohorts/:id/analytics" element={<CohortAnalytics />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/faculty/:id" element={<FacultyDetail />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/simulations/:id" element={<SimulationDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/program-admins/:id" element={<ProgramAdminProfile />} />
            <Route path="/alerts/:id" element={<AlertDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
