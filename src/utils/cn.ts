/** Lightweight className merger — avoids pulling in clsx for simple usage */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
