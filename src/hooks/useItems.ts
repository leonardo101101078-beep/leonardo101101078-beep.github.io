import { useState, useEffect } from 'react';
import type { Item } from '../types';
import { getSeedItems } from '../lib/seed';
import { todayStr } from '../lib/status';

const STORAGE_KEY = 'hamstock-items';

function load(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Item[];
  } catch {
    // corrupted storage — start fresh
  }
  const seed = getSeedItems();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

export function useItems() {
  const [items, setItems] = useState<Item[]>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(item: Omit<Item, 'id'>) {
    setItems(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
  }

  function updateItem(updated: Item) {
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function markRestocked(id: string) {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, lastRestockedAt: todayStr() } : i))
    );
  }

  return { items, addItem, updateItem, removeItem, markRestocked };
}
