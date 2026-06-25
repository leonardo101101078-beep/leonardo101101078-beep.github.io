import { useState } from 'react';
import type { Item } from '../types';
import { ItemCard } from '../components/ItemCard';
import { AddItemForm } from '../components/AddItemForm';
import { ConfirmDialog } from '../components/ConfirmDialog';

interface Props {
  items: Item[];
  onRestock: (id: string) => void;
  onAdd: (data: Omit<Item, 'id'>) => void;
  onUpdate: (item: Item) => void;
  onDelete: (id: string) => void;
}

export function HomePage({ items, onRestock, onAdd, onUpdate, onDelete }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Item | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  function handleSave(data: Omit<Item, 'id'>) {
    if (editItem) {
      onUpdate({ ...editItem, ...data });
    } else {
      onAdd(data);
    }
    setShowForm(false);
    setEditItem(undefined);
  }

  function handleEdit(item: Item) {
    setEditItem(item);
    setShowForm(true);
  }

  function handleDeleteRequest(id: string) {
    setDeleteId(id);
  }

  function handleDeleteConfirm() {
    if (deleteId) onDelete(deleteId);
    setDeleteId(undefined);
  }

  const deleteTarget = items.find(i => i.id === deleteId);

  return (
    <>
      <div className="page-content">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>還沒有物品喔！<br/>點右下角 ＋ 開始記錄吧 🐹</p>
          </div>
        ) : (
          <div className="card-list">
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onRestock={onRestock}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="fab"
        onClick={() => { setEditItem(undefined); setShowForm(true); }}
        aria-label="新增物品"
      >
        +
      </button>

      {showForm && (
        <AddItemForm
          initial={editItem}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditItem(undefined); }}
        />
      )}

      {deleteId && deleteTarget && (
        <ConfirmDialog
          message={`刪除「${deleteTarget.name}」嗎？這個動作無法復原。`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(undefined)}
        />
      )}
    </>
  );
}
