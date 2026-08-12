import { Link, useLocation } from 'react-router-dom';
import { Clock, ArrowLeft, Building2 } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/Button';

interface LocationState {
  message?: string;
  role?: string;
}

export function PendingApprovalPage() {
  const location = useLocation();
  const state = location.state as LocationState;
  const message = state?.message || 'Your account is pending verification.';

  return (
    <AuthLayout
      title="Account Pending Verification"
      subtitle="Your registration has been submitted"
    >
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-warning-100 mb-6">
          <Clock className="h-10 w-10 text-warning-600" />
        </div>

        <div className="rounded-lg bg-warning-50 border border-warning-200 p-4 mb-6">
          <p className="text-sm text-warning-700">{message}</p>
        </div>

        <h3 className="text-lg font-bold text-ink-900 mb-2">What happens next?</h3>
        <div className="text-sm text-ink-600 space-y-3 text-left mb-8">
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">1</span>
            <span>The Health Authority will review your registration.</span>
          </div>
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">2</span>
            <span>You'll receive an email notification once verified.</span>
          </div>
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">3</span>
            <span>After approval, you can log in and access your dashboard.</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/login/hospital">
            <Button variant="outline" className="w-full">
              <Building2 className="h-4 w-4" />
              Go to Hospital Login
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-xs text-ink-400">
          For urgent inquiries, contact the Health Authority at{' '}
          <a href="mailto:health@kerala.gov.in" className="text-primary-700 hover:text-primary-800">
            health@kerala.gov.in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
