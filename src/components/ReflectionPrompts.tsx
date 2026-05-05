import { useEffect, useRef, useState } from "react";
import { PenLine, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getPromptsForChapter, useReflections } from "@/hooks/useReflections";

interface ReflectionPromptsProps {
  chapterId: string;
}

const ReflectionPrompts = ({ chapterId }: ReflectionPromptsProps) => {
  const prompts = getPromptsForChapter(chapterId, 3);
  const { getReflection, setReflection } = useReflections();

  return (
    <section className="mt-12 rounded-lg border bg-card p-6 sm:p-8">
      <header className="mb-6 flex items-center gap-2">
        <PenLine className="h-4 w-4 text-primary" />
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Reflection Prompts
        </h2>
      </header>
      <p className="mb-6 text-sm text-muted-foreground">
        Sit with these questions. Your responses save automatically and stay private on this device.
      </p>
      <div className="space-y-6">
        {prompts.map((prompt, idx) => (
          <PromptField
            key={idx}
            storageKey={`${chapterId}::${idx}`}
            prompt={prompt}
            value={getReflection(`${chapterId}::${idx}`)}
            onChange={(v) => setReflection(`${chapterId}::${idx}`, v)}
          />
        ))}
      </div>
    </section>
  );
};

interface PromptFieldProps {
  storageKey: string;
  prompt: string;
  value: string;
  onChange: (value: string) => void;
}

const PromptField = ({ prompt, value, onChange }: PromptFieldProps) => {
  const [local, setLocal] = useState(value);
  const [savedFlash, setSavedFlash] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleChange = (next: string) => {
    setLocal(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      onChange(next);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 1200);
    }, 400);
  };

  return (
    <div>
      <label className="mb-2 flex items-start justify-between gap-3">
        <span className="font-serif text-base leading-snug text-foreground">
          {prompt}
        </span>
        {savedFlash && (
          <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Check className="h-3 w-3" /> Saved
          </span>
        )}
      </label>
      <Textarea
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your reflection..."
        className="min-h-[110px] resize-y bg-background"
      />
    </div>
  );
};

export default ReflectionPrompts;
