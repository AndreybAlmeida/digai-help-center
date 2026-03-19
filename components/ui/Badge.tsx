import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "violet" | "emerald" | "amber" | "rose" | "cyan" | "slate";
  className?: string;
}

const variantStyles = {
  default: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  rose: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
