import type { View } from '../types';

interface Props {
  view: View;
  onChange: (v: View) => void;
}

export function BottomNav({ view, onChange }: Props) {
  return (
    <nav className="bottom-nav">
      <button className={view === 'home' ? 'active' : ''} onClick={() => onChange('home')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        主頁
      </button>
      <button className={view === 'shopping' ? 'active' : ''} onClick={() => onChange('shopping')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        採買清單
      </button>
    </nav>
  );
}
