"use client";

import { cn } from "@/lib/utils";

interface TagFilterProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function TagFilter({ options, selected, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-all",
            selected === opt.value
              ? "text-white shadow-sm"
              : "border transition-colors hover:border-digai-800/30"
          )}
          style={
            selected === opt.value
              ? { background: "var(--navy-800)" }
              : { background: "var(--surface)", borderColor: "var(--border)", color: "var(--muted-fg)" }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
