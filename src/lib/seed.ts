import type { Item } from '../types';
import { todayStr, subtractDays } from './status';

export function getSeedItems(): Item[] {
  const today = todayStr();
  return [
    {
      id: crypto.randomUUID(),
      name: '衛生紙',
      cycleDays: 28,
      shippingDays: 3,
      lastRestockedAt: subtractDays(today, 10), // daysLeft=18 → 🟢
    },
    {
      id: crypto.randomUUID(),
      name: '洗髮精',
      cycleDays: 30,
      shippingDays: 2,
      lastRestockedAt: subtractDays(today, 22), // daysLeft=8 → 🟡
    },
    {
      id: crypto.randomUUID(),
      name: '貓砂',
      cycleDays: 21,
      shippingDays: 2,
      lastRestockedAt: subtractDays(today, 19), // daysLeft=2 → 🔴
    },
  ];
}
