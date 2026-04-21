/**
 * cn — classNames helper with Tailwind conflict resolution.
 * Standard pattern used across the component library.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
