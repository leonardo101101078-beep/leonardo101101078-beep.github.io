import { useRef } from 'react';
import type { Item } from '../types';
import { getStatus, getDaysLeft, todayStr } from '../lib/status';
import { StatusPill } from './StatusPill';

interface Props {
  item: Item;
  onRestock: (id: string) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export function ItemCard({ item, onRestock, onEdit, onDelete }: Props) {
  const today = todayStr();
  const status = getStatus(item, today);
  const daysLeft = getDaysLeft(item, today);
  const pillRef = useRef<HTMLSpanElement>(null);

  function handleRestock() {
    onRestock(item.id);
    const el = pillRef.current;
    if (el) {
      el.classList.remove('pop-anim');
      void el.offsetWidth; // reflow to restart animation
      el.classList.add('pop-anim');
    }
  }

  function metaText() {
    if (daysLeft <= 0) return `⚠️ 已超過 ${Math.abs(daysLeft)} 天`;
    if (daysLeft <= item.shippingDays) return `剩 ${daysLeft} 天・再不下單就斷貨`;
    if (daysLeft <= item.shippingDays + 7) return `剩 ${daysLeft} 天・一週內該下單`;
    return `還可以撐 ${daysLeft} 天`;
  }

  return (
    <div className="item-card">
      <div className="item-card__top">
        <span className="item-card__name">{item.name}</span>
        <span ref={pillRef}>
          <StatusPill status={status} />
        </span>
      </div>
      <div className="item-card__meta">{metaText()}</div>
      <div className="item-card__actions">
        <button className="btn btn-restock" onClick={handleRestock}>
          ✓ 已補貨
        </button>
        <button className="btn btn-icon" onClick={() => onEdit(item)} aria-label="編輯">
          ✏️
        </button>
        <button className="btn btn-icon" onClick={() => onDelete(item.id)} aria-label="刪除">
          🗑
        </button>
      </div>
    </div>
  );
}
