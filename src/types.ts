export interface Item {
  id: string;
  name: string;
  cycleDays: number;
  shippingDays: number;
  lastRestockedAt: string; // "YYYY-MM-DD"
}

export type Status = 'green' | 'yellow' | 'red';

export type View = 'home' | 'shopping';
