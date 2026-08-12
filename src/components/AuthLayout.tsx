import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-800 to-primary-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <HeartPulse className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">SetuHealth</span>
                <span className="block text-xs font-medium text-primary-200 uppercase tracking-wider">
                  Kerala Migrant Health
                </span>
              </div>
            </Link>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
              Digital Healthcare,
              <br />
              <span className="text-secondary-300">Wherever You Work.</span>
            </h1>

            <p className="mt-6 text-lg text-primary-200 leading-relaxed max-w-md">
              A secure digital health record platform providing migrant workers in Kerala with
              portable healthcare access and continuity of medical care.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-primary-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Portable Health ID across Kerala</span>
              </div>
              <div className="flex items-center gap-3 text-primary-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Multilingual support (English, Hindi, Malayalam)</span>
              </div>
              <div className="flex items-center gap-3 text-primary-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Secure & authorized access only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex flex-col">
          <div className="lg:hidden flex items-center justify-between border-b border-ink-200 bg-white px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold text-ink-900">SetuHealth</span>
            </Link>
            <Link to="/" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
              Back to Home
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
              {title && (
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-ink-900">{title}</h2>
                  {subtitle && <p className="mt-2 text-sm text-ink-500">{subtitle}</p>}
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
