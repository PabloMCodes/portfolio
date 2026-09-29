import type { HTMLAttributes } from "react";

export function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["mx-auto w-full max-w-[90rem] px-[var(--page-gutter)]", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
