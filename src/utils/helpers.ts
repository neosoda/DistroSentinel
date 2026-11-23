export function fuzzyScore(hay: string, needle: string): number {
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
  hay = normalize(hay);
  needle = normalize(needle).trim();
  if (!needle) return 1;

  let h = 0, n = 0, score = 0, streak = 0;
  while (h < hay.length && n < needle.length) {
    if (hay[h] === needle[n]) {
      n++; 
      streak++;
      score += 10 + streak * 2; // contiguous boost
    } else {
      streak = 0;
      score -= 1; // tiny penalty
    }
    h++;
  }
  if (n < needle.length) return 0;
  // Bonus if starts early
  const first = hay.indexOf(needle[0]);
  if (first >= 0) score += Math.max(0, 20 - first);
  return Math.max(1, score);
}

export function debounce<T extends (...args: never[]) => unknown>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function escapeHtml(s: string | null | undefined): string {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m] as string));
}
