import { Stethoscope, Building2, Phone, Mail, ShieldCheck, Calendar } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function DoctorProfile() {
  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Profile" subtitle="Your professional details and access level." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile summary */}
        <Card padding="md" className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100 text-2xl font-extrabold text-secondary-700">
            AM
          </div>
          <h2 className="mt-4 text-lg font-bold text-ink-900">Dr. Anjali Menon</h2>
          <p className="text-sm text-ink-500">General Physician</p>
          <div className="mt-3 flex justify-center">
            <Badge tone="success"><ShieldCheck className="h-3.5 w-3.5" /> Authorized</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink-200 pt-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Patients</p>
              <p className="font-bold text-ink-900">1,247</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Consultations</p>
              <p className="font-bold text-ink-900">3,820</p>
            </div>
          </div>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <Card padding="md">
            <CardHeader title="Professional Information" icon={<Stethoscope className="h-5 w-5" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Full Name" value="Dr. Anjali Menon" icon={<Stethoscope className="h-4 w-4" />} />
              <Detail label="Specialization" value="General Physician" />
              <Detail label="Registration No" value="KMC-2018-04512" />
              <Detail label="Experience" value="8 years" icon={<Calendar className="h-4 w-4" />} />
            </div>
          </Card>

          <Card padding="md">
            <CardHeader title="Workplace" icon={<Building2 className="h-5 w-5" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Hospital" value="Government Health Centre" icon={<Building2 className="h-4 w-4" />} />
              <Detail label="District" value="Ernakulam" />
              <Detail label="Phone" value="+91 484 123 4567" icon={<Phone className="h-4 w-4" />} />
              <Detail label="Email" value="anjali.menon@ghc.ernakulam.in" icon={<Mail className="h-4 w-4" />} />
            </div>
          </Card>

          <Card padding="md">
            <CardHeader title="Access Control" icon={<ShieldCheck className="h-5 w-5 text-success-600" />} />
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Access Level</span>
                <Badge tone="primary">Healthcare Worker</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Record Access</span>
                <Badge tone="secondary">Authorized</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Can Prescribe</span>
                <Badge tone="success">Yes</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Last Login</span>
                <span className="font-semibold text-ink-700">12 Aug 2026, 08:45</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Detail({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-ink-400 flex items-center gap-1">{icon}{label}</p>
      <p className="mt-1 font-bold text-ink-900">{value}</p>
    </div>
  );
}
