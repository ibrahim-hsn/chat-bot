import { initials as toInitials, cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-9 w-9 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

/** Initials-based avatar with an optional online dot. Decorative: the name is
 * announced by adjacent text, so the graphic itself is hidden from AT. */
export function Avatar({ name, online, size = "md", className }: AvatarProps) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-primary-soft font-semibold text-primary-strong",
          sizeClasses[size],
        )}
      >
        {toInitials(name)}
      </span>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface",
            online ? "bg-success" : "bg-ink-muted/40",
          )}
        >
          <span className="sr-only">{online ? "Online" : "Offline"}</span>
        </span>
      )}
    </span>
  );
}
