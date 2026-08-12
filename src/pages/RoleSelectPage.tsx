import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User, Stethoscope, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const roles = [
  {
    id: 'worker',
<<<<<<< HEAD
    loginTo: '/login/worker',
    registerTo: '/register/worker',
=======
    to: '/worker',
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
    title: 'Migrant Worker',
    desc: 'View your Health ID, medical history, prescriptions, lab reports, and get multilingual assistance.',
    icon: User,
    color: 'from-primary-600 to-primary-700',
    features: ['Digital Health ID & QR', 'Medical history & records', 'Multilingual HealthSaathi', 'Emergency health card'],
<<<<<<< HEAD
    hasRegister: true,
    registerLabel: 'Create Worker Account',
  },
  {
    id: 'doctor',
    loginTo: '/login/doctor',
    registerTo: '/register/doctor',
=======
  },
  {
    id: 'doctor',
    to: '/doctor',
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
    title: 'Healthcare Worker',
    desc: 'Search or scan a patient Health ID, view authorized records, and add new consultations.',
    icon: Stethoscope,
    color: 'from-secondary-600 to-secondary-700',
    features: ['Search & scan Health ID', 'Full patient record access', 'Add consultations & prescriptions', 'Lab reports & vaccinations'],
<<<<<<< HEAD
    hasRegister: true,
    registerLabel: 'Create Doctor Account',
  },
  {
    id: 'admin',
    loginTo: '/login/admin',
    registerTo: '',
=======
  },
  {
    id: 'admin',
    to: '/admin',
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
    title: 'Health Authority',
    desc: 'View anonymized analytics, disease monitoring, vaccination coverage, and district-wise trends.',
    icon: ShieldCheck,
    color: 'from-ink-700 to-ink-800',
    features: ['Worker registration analytics', 'Disease trend monitoring', 'Vaccination coverage', 'District-wise insights'],
<<<<<<< HEAD
    hasRegister: false,
    registerLabel: '',
=======
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
  },
];

export function RoleSelectPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      {/* Header */}
      <header className="border-b border-ink-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Logo size="sm" />
          <Link to="/">
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="primary" className="mb-4">Choose Your Role</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            How would you like to continue?
          </h1>
          <p className="mt-4 text-lg text-ink-600">
<<<<<<< HEAD
            Select your role to sign in or create an account. Each portal is tailored to its user.
=======
            Select a role to explore the demo. Each portal is tailored to its user — worker, healthcare
            provider, or health authority.
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => (
<<<<<<< HEAD
            <div
              key={role.id}
              className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all duration-300 hover:shadow-card-lg hover:border-primary-300"
=======
            <Link
              key={role.id}
              to={role.to}
              className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all duration-300 hover:shadow-card-lg hover:border-primary-300 hover:-translate-y-1"
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
            >
              {/* Color bar */}
              <div className={`h-2 bg-gradient-to-r ${role.color}`} />

              <div className="p-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${role.color} text-white shadow-sm`}>
                  <role.icon className="h-7 w-7" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-ink-900">{role.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{role.desc}</p>

                <ul className="mt-5 space-y-2.5">
                  {role.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success-600" />
                      {f}
                    </li>
                  ))}
                </ul>

<<<<<<< HEAD
                <div className="mt-6 space-y-3">
                  <Link to={role.loginTo}>
                    <Button className="w-full" variant="primary">
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  {role.hasRegister && (
                    <Link to={role.registerTo}>
                      <Button className="w-full" variant="outline">
                        {role.registerLabel}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
=======
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary-700 group-hover:text-primary-800">
                    Enter Portal
                  </span>
                  <ArrowRight className="h-5 w-5 text-primary-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-400">
<<<<<<< HEAD
          All data shown is fictional demo data. Authentication is powered by Supabase.
=======
          Demo mode — no real authentication required. All data shown is fictional.
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
        </p>
      </div>
    </div>
  );
}
