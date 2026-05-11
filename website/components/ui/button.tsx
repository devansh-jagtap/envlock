import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";

type CommonButtonProps = {
  className?: string;
  variant?: ButtonVariant;
  children: ReactNode;
};

type NativeButtonProps = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = CommonButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = NativeButtonProps | AnchorButtonProps;

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-primary",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted focus-visible:outline-ring",
};

const baseClassName =
  "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { className, variant = "default" } = props;
  const resolvedClassName = cn(baseClassName, variants[variant], className);

  if ("href" in props) {
    const rel = props.target === "_blank" ? props.rel ?? "noopener noreferrer" : props.rel;
    return <a className={resolvedClassName} {...props} rel={rel} />;
  }

  return <button className={resolvedClassName} {...props} />;
}
