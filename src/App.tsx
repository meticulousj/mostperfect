import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppNav from "@/components/AppNav";
import GlobalSearch from "@/components/GlobalSearch";
import Index from "./pages/Index.tsx";
import CourseOverview from "./pages/CourseOverview.tsx";
import ChapterReader from "./pages/ChapterReader.tsx";
import ProgressDashboard from "./pages/ProgressDashboard.tsx";
import KeyConcepts from "./pages/KeyConcepts.tsx";
import AuthorsNote from "./pages/AuthorsNote.tsx";
import Workbooks from "./pages/Workbooks.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";
import CloudSyncProvider from "@/components/CloudSyncProvider";
import WelcomeTour from "@/components/WelcomeTour";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CloudSyncProvider>
          <AppNav />
          <GlobalSearch />
          <WelcomeTour />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/course" element={<CourseOverview />} />
            <Route path="/read/:chapterId" element={<ChapterReader />} />
            <Route path="/progress" element={<ProgressDashboard />} />
            <Route path="/concepts" element={<KeyConcepts />} />
            <Route path="/authors-note" element={<AuthorsNote />} />
            <Route path="/workbooks" element={<Workbooks />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CloudSyncProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
