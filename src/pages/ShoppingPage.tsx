import { useState } from 'react';
import type { Item, Status } from '../types';
import { getStatus, getDaysLeft, sortByStatus, todayStr } from '../lib/status';
import { StatusPill } from '../components/StatusPill';

interface Props {
  items: Item[];
}

const GROUP_LABELS: Record<Status, string> = {
  red: '🔴 立刻買',
  yellow: '🟡 本週買',
  green: '🟢 還充足',
};

export function ShoppingPage({ items }: Props) {
  const [showGreen, setShowGreen] = useState(false);
  const today = todayStr();
  const sorted = sortByStatus(items, today);

  const groups: Record<Status, Item[]> = { red: [], yellow: [], green: [] };
  sorted.forEach(item => groups[getStatus(item, today)].push(item));

  function daysText(item: Item) {
    const left = getDaysLeft(item, today);
    if (left <= 0) return `已超過 ${Math.abs(left)} 天`;
    return `剩 ${left} 天`;
  }

  if (items.length === 0) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <p>還沒有物品喔！<br/>先去主頁新增吧 🐹</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      {(['red', 'yellow'] as Status[]).map(status => {
        if (groups[status].length === 0) return null;
        return (
          <div key={status} className="shopping-group">
            <div className="shopping-group__title">{GROUP_LABELS[status]}</div>
            {groups[status].map(item => (
              <div key={item.id} className="shopping-row">
                <div>
                  <div className="shopping-row__name">{item.name}</div>
                  <div className="shopping-row__meta">{daysText(item)}・週期 {item.cycleDays} 天</div>
                </div>
                <StatusPill status={status} />
              </div>
            ))}
          </div>
        );
      })}

      {groups.green.length > 0 && (
        <div className="shopping-group">
          <button className="toggle-green-btn" onClick={() => setShowGreen(v => !v)}>
            {showGreen ? '▲' : '▼'} {GROUP_LABELS.green}（{groups.green.length} 項）
          </button>
          {showGreen && groups.green.map(item => (
            <div key={item.id} className="shopping-row green-row">
              <div>
                <div className="shopping-row__name">{item.name}</div>
                <div className="shopping-row__meta">{daysText(item)}・週期 {item.cycleDays} 天</div>
              </div>
              <StatusPill status="green" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
