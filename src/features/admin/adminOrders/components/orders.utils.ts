export const categoryLabel = (cat: string) =>
  cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
