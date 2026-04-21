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
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/cohorts" element={<Cohorts />} />
            <Route path="/cohorts/:id" element={<CohortDetail />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/permissions" element={<Permissions />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
