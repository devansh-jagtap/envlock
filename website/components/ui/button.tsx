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
    const {
      className: _className,
      variant: _variant,
      rel,
      target,
      ...anchorProps
    } = props;
    const resolvedRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

    return <a {...anchorProps} target={target} rel={resolvedRel} className={resolvedClassName} />;
  }

  const { className: _className, variant: _variant, ...buttonProps } = props;
  return <button {...buttonProps} className={resolvedClassName} />;
}
