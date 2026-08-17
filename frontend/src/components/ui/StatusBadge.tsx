interface StatusBadgeProps {
  status: 'Alive' | 'Dead' | 'unknown';
}

const statusStyles: Record<string, string> = {
  Alive: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Dead: 'bg-red-50 text-red-700 ring-red-600/20',
  unknown: 'bg-gray-100 text-gray-600 ring-gray-500/20',
};

const statusDot: Record<string, string> = {
  Alive: 'bg-emerald-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-400',
};

const statusLabels: Record<string, string> = {
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
      {statusLabels[status]}
    </span>
  );
}
