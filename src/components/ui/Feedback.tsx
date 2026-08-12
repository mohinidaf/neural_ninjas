import type { ReactNode } from 'react';
import { Inbox, AlertCircle, Loader2 } from 'lucide-react';

export function EmptyState({ icon, title, message, action }: { icon?: ReactNode; title: string; message?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-300 bg-ink-50/50 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        {icon || <Inbox className="h-7 w-7" />}
      </div>
      <h3 className="mt-4 text-base font-bold text-ink-800">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-ink-500">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-danger-200 bg-danger-50 px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-100 text-danger-600">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-bold text-danger-800">Something went wrong</h3>
      <p className="mt-1 max-w-sm text-sm text-danger-700">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 rounded-lg bg-danger-600 px-4 py-2 text-sm font-semibold text-white hover:bg-danger-700">
          Try again
        </button>
      )}
    </div>
  );
}

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      <p className="mt-3 text-sm font-medium text-ink-500">{message}</p>
    </div>
  );
}
