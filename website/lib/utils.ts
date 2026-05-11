/**
 * Joins class name tokens while skipping falsy values.
 * Useful for composing Tailwind utility classes conditionally.
 */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
