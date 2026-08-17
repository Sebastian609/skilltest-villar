interface StatusBadgeProps {
  status: 'Alive' | 'Dead' | 'unknown';
}

const statusStyles: Record<string, string> = {
  Alive: 'bg-emerald-100 text-emerald-800',
  Dead: 'bg-red-100 text-red-800',
  unknown: 'bg-zinc-100 text-zinc-600',
};

const statusLabels: Record<string, string> = {
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
