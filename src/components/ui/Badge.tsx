import type { ReactNode } from 'react';

type Tone = 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-ink-100 text-ink-700 border-ink-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200',
  success: 'bg-success-50 text-success-700 border-success-200',
  warning: 'bg-warning-50 text-warning-700 border-warning-200',
  danger: 'bg-danger-50 text-danger-700 border-danger-200',
  info: 'bg-primary-50 text-primary-700 border-primary-200',
};

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

// Status badge for medical statuses — uses text + icon, not color alone
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { tone: Tone; label: string }> = {
    active: { tone: 'success', label: 'Active' },
    completed: { tone: 'success', label: 'Completed' },
    pending: { tone: 'warning', label: 'Pending' },
    overdue: { tone: 'danger', label: 'Overdue' },
    managed: { tone: 'secondary', label: 'Managed' },
    resolved: { tone: 'success', label: 'Resolved' },
    discontinued: { tone: 'neutral', label: 'Discontinued' },
    cancelled: { tone: 'neutral', label: 'Cancelled' },
    monitoring: { tone: 'warning', label: 'Monitoring' },
    alert: { tone: 'danger', label: 'Alert' },
    normal: { tone: 'success', label: 'Normal' },
  };
  const cfg = map[status.toLowerCase()] || { tone: 'neutral' as Tone, label: status };
  return <Badge tone={cfg.tone}>{cfg.label}</Badge>;
}
