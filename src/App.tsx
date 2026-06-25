import { useState } from 'react';
import type { View } from './types';
import { useItems } from './hooks/useItems';
import { Mascot } from './components/Mascot';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { ShoppingPage } from './pages/ShoppingPage';
import './styles.css';

export function App() {
  const [view, setView] = useState<View>('home');
  const { items, addItem, updateItem, removeItem, markRestocked } = useItems();

  return (
    <div className="app-shell">
      <header className="app-header">
        <Mascot size={42} />
        <div>
          <h1>囤囤鼠</h1>
          <div className="subtitle">家裡的補貨小窩・{items.length} 項物資</div>
        </div>
      </header>

      {view === 'home' ? (
        <HomePage
          items={items}
          onRestock={markRestocked}
          onAdd={addItem}
          onUpdate={updateItem}
          onDelete={removeItem}
        />
      ) : (
        <ShoppingPage items={items} />
      )}

      <BottomNav view={view} onChange={setView} />
    </div>
  );
}

export default App;
