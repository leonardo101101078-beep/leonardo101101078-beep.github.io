import type { Item, Status } from '../types';

export function daysBetween(dateStr: string, today: string): number {
  const a = new Date(today);
  const b = new Date(dateStr);
  return Math.floor((a.getTime() - b.getTime()) / 86400000);
}

export function getDaysLeft(item: Item, today: string): number {
  const elapsed = daysBetween(item.lastRestockedAt, today);
  return item.cycleDays - elapsed;
}

export function getStatus(item: Item, today: string): Status {
  const left = getDaysLeft(item, today);
  if (left <= item.shippingDays) return 'red';
  if (left <= item.shippingDays + 7) return 'yellow';
  return 'green';
}

export function sortByStatus(items: Item[], today: string): Item[] {
  const order: Record<Status, number> = { red: 0, yellow: 1, green: 2 };
  return [...items].sort(
    (a, b) => order[getStatus(a, today)] - order[getStatus(b, today)]
  );
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function subtractDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
