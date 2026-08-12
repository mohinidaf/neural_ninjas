import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Stethoscope, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/Button';
import type { Role } from '@/types';

const roleConfig: Record<Role, { title: string; subtitle: string; icon: React.ReactNode; color: string; registerPath: string; registerLabel: string }> = {
  worker: {
    title: 'Worker Login',
    subtitle: 'Sign in to access your health records',
    icon: <User className="h-6 w-6" />,
    color: 'from-primary-600 to-primary-700',
    registerPath: '/register/worker',
    registerLabel: 'Create Worker Account',
  },
  doctor: {
    title: 'Healthcare Worker Login',
    subtitle: 'Sign in to access patient records',
    icon: <Stethoscope className="h-6 w-6" />,
    color: 'from-secondary-600 to-secondary-700',
    registerPath: '/register/doctor',
    registerLabel: 'Create Doctor Account',
  },
  admin: {
    title: 'Health Authority Login',
    subtitle: 'Sign in to access analytics dashboard',
    icon: <ShieldCheck className="h-6 w-6" />,
    color: 'from-ink-700 to-ink-800',
    registerPath: '',
    registerLabel: '',
  },
};

interface LoginPageProps {
  role: Role;
}

export function LoginPage({ role }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const config = roleConfig[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    // For worker role, redirect to profile completion to ensure QR generation
    if (role === 'worker') {
      navigate('/worker/complete-profile', { replace: true });
    } else {
      navigate(`/${role}`, { replace: true });
    }
  };

  return (
    <AuthLayout title={config.title} subtitle={config.subtitle}>
      <div className="mb-6">
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${config.color} text-white shadow-sm`}>
          {config.icon}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-danger-50 border border-danger-200 p-4">
            <p className="text-sm text-danger-700">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 pr-12 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Sign In
        </Button>
      </form>

      {config.registerPath && (
        <div className="mt-8 text-center">
          <p className="text-sm text-ink-500">
            Don't have an account?{' '}
            <Link to={config.registerPath} className="font-semibold text-primary-700 hover:text-primary-800">
              {config.registerLabel}
            </Link>
          </p>
        </div>
      )}

      {role === 'admin' && (
        <div className="mt-8 text-center">
          <p className="text-sm text-ink-500">
            Admin accounts are created by the system administrator.
            <br />
            Contact support if you need access.
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-ink-200 pt-6">
        <p className="text-center text-xs text-ink-400">
          <Link to="/role" className="font-semibold text-primary-700 hover:text-primary-800">
            Choose a different role
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
