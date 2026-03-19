import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Briefcase,
  CircleHelp,
  Plug,
  Rocket,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Briefcase,
  Plug,
  BarChart3,
  CircleHelp,
  Sparkles,
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
};

interface SidebarProps {
  activeCategory?: string;
}

export default function Sidebar({ activeCategory }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Categorias
      </p>
      <nav className="flex flex-col gap-0.5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || CircleHelp;
          const isActive = activeCategory === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-md", colorMap[cat.color])}>
                <Icon className="size-3.5" />
              </span>
              <span className="truncate">{cat.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
