import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, QrCode, Stethoscope, FileText, FlaskConical,
  Syringe, BellRing, UserCircle, Menu, X, LogOut, ShieldCheck,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { useWorkerProfile } from '@/contexts/WorkerProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const navByRole: Record<string, NavItem[]> = {
  worker: [
    { to: '/worker', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { to: '/worker/health-id', label: 'My Health ID', icon: <QrCode className="h-5 w-5" /> },
    { to: '/worker/record', label: 'Health Record', icon: <FileText className="h-5 w-5" /> },
    { to: '/worker/emergency', label: 'Emergency Card', icon: <ShieldCheck className="h-5 w-5" /> },
    { to: '/worker/profile', label: 'My Profile', icon: <UserCircle className="h-5 w-5" /> },
  ],
  doctor: [
    { to: '/doctor', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { to: '/doctor/patients', label: 'Patients', icon: <Users className="h-5 w-5" /> },
    { to: '/doctor/scan', label: 'Scan QR', icon: <QrCode className="h-5 w-5" /> },
    { to: '/doctor/consultations', label: 'Consultations', icon: <Stethoscope className="h-5 w-5" /> },
    { to: '/doctor/prescriptions', label: 'Prescriptions', icon: <FileText className="h-5 w-5" /> },
    { to: '/doctor/lab-reports', label: 'Lab Reports', icon: <FlaskConical className="h-5 w-5" /> },
    { to: '/doctor/vaccinations', label: 'Vaccinations', icon: <Syringe className="h-5 w-5" /> },
    { to: '/doctor/alerts', label: 'Alerts', icon: <BellRing className="h-5 w-5" /> },
    { to: '/doctor/profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { to: '/admin/workers', label: 'Registered Workers', icon: <Users className="h-5 w-5" /> },
    { to: '/admin/disease', label: 'Disease Monitoring', icon: <BellRing className="h-5 w-5" /> },
    { to: '/admin/sdg', label: 'SDG Impact', icon: <ShieldCheck className="h-5 w-5" /> },
    { to: '/admin/profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ],
};

const roleLabel: Record<string, string> = {
  worker: 'Migrant Worker',
  doctor: 'Healthcare Worker',
  admin: 'Health Authority',
};

const defaultRoleUser: Record<string, { name: string; sub: string }> = {
  worker: { name: 'Migrant Worker', sub: 'KER-MW-10245' },
  doctor: { name: 'Dr. Anjali Menon', sub: 'Govt Health Centre, Ernakulam' },
  admin: { name: 'Health Authority', sub: 'Kerala State Health Mission' },
};

interface DashboardLayoutProps {
  role: 'worker' | 'doctor' | 'admin';
  children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const nav = navByRole[role];

  // Dynamically fetch worker profile if role === 'worker'
  let user = defaultRoleUser[role];
  if (role === 'worker') {
    try {
      const { profile } = useWorkerProfile();
      if (profile && profile.name) {
        user = {
          name: profile.name,
          sub: profile.healthId || 'KER-MW-10245',
        };
      }
    } catch (e) {
      // fallback
    }
  }

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  const isActive = (to: string) => location.pathname === to || (to !== `/${role}` && location.pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-ink-950/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-ink-200 bg-white transition-transform duration-300 ease-out-soft lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink-200 px-5">
          <Logo size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-ink-400 hover:text-ink-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 py-4">
          <div className="mb-4 rounded-lg bg-primary-50 px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">{t(roleLabel[role])} {t('Portal')}</p>
            <p className="mt-0.5 text-sm font-bold text-ink-900">{user.name}</p>
            <p className="text-xs text-ink-500">{user.sub}</p>
          </div>

          <nav className="space-y-1">
            {nav.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-primary-700 text-white shadow-sm'
                      : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-ink-400'}>{item.icon}</span>
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-ink-200 pt-4">
            <Button variant="ghost" size="sm" className="w-full justify-start text-ink-500" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {t('Sign Out')}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-200 bg-white/90 px-4 backdrop-blur-md sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-ink-600 hover:text-ink-900">
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-ink-400">
            <ShieldCheck className="h-4 w-4 text-success-600" />
            <span className="font-medium">{t('Authorized Access')}</span>
            <span className="text-ink-300">·</span>
            <span>{t('Protected Health Record')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-success-50 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-success-500 animate-pulse-soft" />
              <span className="text-xs font-semibold text-success-700">{t('Live Health ID')}</span>
            </div>
            <div className="ml-2 flex items-center">
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="rounded-md border px-2 py-1 text-sm bg-white"
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'हिंदी' : 'EN'}
              </button>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

// Page header for dashboard pages
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">{t(title)}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{t(subtitle)}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
