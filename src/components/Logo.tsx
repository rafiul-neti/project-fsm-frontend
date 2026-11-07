import { cn } from "@/lib/utils";

type LogoProps = {
  /** Height of the logo mark in px. The wordmark and spacing scale with it. */
  size?: number;
  /** "full" = mark + name, "mark" = icon only, "wordmark" = name only. */
  variant?: "full" | "mark" | "wordmark";
  /** Use on a primary-colored background (for example the auth brand panel). */
  inverted?: boolean;
  /** Brand name shown as the wordmark and used for the accessible label. */
  name?: string;
  className?: string;
};

export function Logo({
  size = 40,
  variant = "full",
  inverted = false,
  name = "Fieldly",
  className,
}: LogoProps) {
  const showMark = variant !== "wordmark";
  const showWordmark = variant !== "mark";

  return (
    <span
      role="img"
      aria-label={name}
      className={cn("inline-flex items-center", className)}
      style={{ gap: size * 0.28 }}
    >
      {showMark && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 items-center justify-center",
            inverted
              ? "bg-primary-foreground text-primary"
              : "bg-primary text-primary-foreground",
          )}
          style={{ width: size, height: size, borderRadius: size * 0.28 }}
        >
          <svg
            width={size * 0.6}
            height={size * 0.6}
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>{name}</title>
            <path
              d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8.6 10.2l2.4 2.4 4.4-4.8"
              stroke="var(--highlight, #F59E0B)"
              strokeWidth="2"
            />
          </svg>
        </span>
      )}

      {showWordmark && (
        <span
          aria-hidden="true"
          className={cn(
            "font-heading font-extrabold leading-none tracking-tight",
            inverted ? "text-primary-foreground" : "text-foreground",
          )}
          style={{ fontSize: size * 0.55 }}
        >
          {name}
        </span>
      )}
    </span>
  );
}

export default Logo;