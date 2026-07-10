import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** A neutral loading placeholder. Motion is minimal and respects reduced-motion
 * (the pulse animation is disabled globally under prefers-reduced-motion). */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-surface-muted", className)}
      {...props}
    />
  );
}
