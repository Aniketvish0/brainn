import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
}

export function BackgroundGrid({ className }: BackgroundGridProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]",
        className
      )}
    />
  );
} 