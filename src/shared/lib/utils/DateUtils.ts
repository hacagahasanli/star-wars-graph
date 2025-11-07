export function isoToDate(isoString?: string): string {
  if (isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  }

  return "";
}
