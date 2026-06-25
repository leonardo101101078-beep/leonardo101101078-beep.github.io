import { useState, useEffect } from 'react';
import type { Item } from '../types';
import { todayStr } from '../lib/status';

interface Props {
  initial?: Item;
  onSave: (data: Omit<Item, 'id'>) => void;
  onCancel: () => void;
}

export function AddItemForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [cycleDays, setCycleDays] = useState(String(initial?.cycleDays ?? ''));
  const [shippingDays, setShippingDays] = useState(String(initial?.shippingDays ?? ''));
  const [lastRestockedAt, setLastRestockedAt] = useState(initial?.lastRestockedAt ?? todayStr());
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setCycleDays(String(initial.cycleDays));
      setShippingDays(String(initial.shippingDays));
      setLastRestockedAt(initial.lastRestockedAt);
    }
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const c = parseInt(cycleDays);
    const s = parseInt(shippingDays);
    if (!name.trim()) { setError('請輸入物品名稱'); return; }
    if (!c || c < 1) { setError('消耗週期需 ≥ 1 天'); return; }
    if (!s || s < 0) { setError('送貨天數需 ≥ 0'); return; }
    if (s >= c) { setError('送貨天數需小於消耗週期'); return; }
    setError('');
    onSave({ name: name.trim(), cycleDays: c, shippingDays: s, lastRestockedAt });
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <h2>{initial ? '✏️ 編輯物品' : '➕ 新增物品'}</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-field">
            <label>物品名稱</label>
            <input
              type="text"
              placeholder="例：衛生紙"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              maxLength={20}
            />
          </div>

          <div className="form-field">
            <label>消耗週期（天）</label>
            <input
              type="number"
              placeholder="例：28"
              value={cycleDays}
              onChange={e => setCycleDays(e.target.value)}
              min={1}
              max={365}
            />
            <span className="form-hint">這個物品用多久會用完</span>
          </div>

          <div className="form-field">
            <label>送貨天數</label>
            <input
              type="number"
              placeholder="例：3"
              value={shippingDays}
              onChange={e => setShippingDays(e.target.value)}
              min={0}
              max={30}
            />
            <span className="form-hint">下單到收到的天數（實體店填 0）</span>
          </div>

          <div className="form-field">
            <label>上次補貨日</label>
            <input
              type="date"
              value={lastRestockedAt}
              onChange={e => setLastRestockedAt(e.target.value)}
              max={todayStr()}
            />
            <span className="form-hint">剛補貨選今天；快用完了可往前調</span>
          </div>

          {error && (
            <p style={{ color: '#FF6B6B', fontWeight: 700, fontSize: 13 }}>{error}</p>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              儲存
            </button>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel}>
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
