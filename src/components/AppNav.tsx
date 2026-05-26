import { Link, useLocation } from "react-router-dom";
import { BookOpen, LayoutGrid, BarChart3, Lightbulb, PenLine, FileText, Menu, X, Moon, Sun, Search, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { openGlobalSearch } from "@/components/GlobalSearch";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const navItems = [
  { to: "/", label: "Home", icon: BookOpen },
  { to: "/course", label: "Course", icon: LayoutGrid },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/concepts", label: "Key Concepts", icon: Lightbulb },
  { to: "/authors-note", label: "Author's Note", icon: PenLine },
  { to: "/workbooks", label: "Workbooks", icon: FileText },
];

const AppNav = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
  };

  const authControl = user ? (
    <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 text-muted-foreground hover:text-accent-foreground">
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  ) : (
    <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-accent-foreground">
      <Link to="/auth">
        <LogIn className="h-4 w-4" />
        Sign in
      </Link>
    </Button>
  );


  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const themeToggle = (
    <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground">
      <Sun className="h-4 w-4" aria-hidden="true" />
      <Switch
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4" aria-hidden="true" />
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Most Perfect
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={openGlobalSearch} className="gap-1.5 text-muted-foreground hover:text-accent-foreground">
            <Search className="h-4 w-4" />
            Search
          </Button>
          {authControl}
          {themeToggle}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-muted-foreground sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t px-4 pb-4 sm:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                location.pathname === to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              openGlobalSearch();
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          <div className="mt-2 border-t pt-3">
            {user ? (
              <button
                onClick={() => { setMobileOpen(false); handleSignOut(); }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            )}
          </div>
          <div className="mt-2 border-t pt-3">{themeToggle}</div>
        </div>
      )}
    </nav>
  );
};

export default AppNav;
