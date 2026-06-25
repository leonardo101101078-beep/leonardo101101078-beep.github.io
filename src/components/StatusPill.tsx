import type { Status } from '../types';

const LABELS: Record<Status, string> = {
  green: '充足',
  yellow: '快了',
  red: '該買',
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`status-pill ${status}`}>
      <span className="dot" />
      {LABELS[status]}
    </span>
  );
}
