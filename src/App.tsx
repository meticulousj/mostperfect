import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppNav from "@/components/AppNav";
import Index from "./pages/Index.tsx";
import CourseOverview from "./pages/CourseOverview.tsx";
import ChapterReader from "./pages/ChapterReader.tsx";
import ProgressDashboard from "./pages/ProgressDashboard.tsx";
import KeyConcepts from "./pages/KeyConcepts.tsx";
import AuthorsNote from "./pages/AuthorsNote.tsx";
import Workbooks from "./pages/Workbooks.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course" element={<CourseOverview />} />
          <Route path="/read/:chapterId" element={<ChapterReader />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/concepts" element={<KeyConcepts />} />
          <Route path="/authors-note" element={<AuthorsNote />} />
          <Route path="/workbooks" element={<Workbooks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
