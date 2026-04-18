export function formatDate(value: string | Date): string {
  const parsed = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return parsed.toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
