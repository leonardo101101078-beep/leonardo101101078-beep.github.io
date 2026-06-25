interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-sheet" style={{ paddingBottom: 24 }} onClick={e => e.stopPropagation()}>
        <div className="confirm-box" style={{ maxWidth: '100%' }}>
          <p>{message}</p>
          <div className="form-actions">
            <button className="btn btn-primary" style={{ flex: 1, background: '#FF6B6B' }} onClick={onConfirm}>
              確認刪除
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel}>
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
