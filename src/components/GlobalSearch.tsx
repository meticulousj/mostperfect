import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchChapters } from "@/data/bookContent";

const OPEN_SEARCH_EVENT = "most-perfect:open-search";

export const openGlobalSearch = () => {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
};

const resultLabel = {
  title: "Title",
  description: "Summary",
  section: "Section",
  content: "Passage",
};

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchChapters(query), [query]);
  const hasSearchableQuery = query.trim().length >= 2;

  useEffect(() => {
    const handleOpenSearch = () => setOpen(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false} className="rounded-md border bg-popover">
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search chapters, concepts, and passages..."
          autoFocus
        />
        <CommandList className="max-h-[420px]">
          {!hasSearchableQuery ? (
            <div className="px-4 py-8 text-center">
              <Search className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">Search the guide</p>
              <p className="mt-1 text-xs text-muted-foreground">Type at least two characters to find a chapter or passage.</p>
            </div>
          ) : results.length === 0 ? (
            <CommandEmpty>No matching chapters found.</CommandEmpty>
          ) : (
            <CommandGroup heading={`${results.length} result${results.length === 1 ? "" : "s"}`}>
              {results.map(({ chapter, sectionLabel, matchType, snippet }) => (
                <CommandItem
                  key={chapter.id}
                  value={chapter.id}
                  onSelect={() => {
                    setOpen(false);
                    navigate(`/read/${chapter.id}`);
                  }}
                  className="items-start gap-3 px-3 py-3"
                >
                  <BookOpen className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="font-serif text-sm font-semibold leading-snug text-foreground">
                        {typeof chapter.number === "number" ? `Chapter ${chapter.number}: ` : `${chapter.number}: `}
                        {chapter.title}
                      </p>
                      <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase text-accent-foreground">
                        {resultLabel[matchType]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{sectionLabel}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{snippet}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default GlobalSearch;