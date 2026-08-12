import { Building2, Users, Stethoscope, Clock, ShieldCheck } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function HospitalDashboard() {
  const stats = [
    { label: 'Registered Doctors', value: '24', icon: Stethoscope, tone: 'bg-secondary-50 text-secondary-700' },
    { label: 'Total Patients', value: '1,847', icon: Users, tone: 'bg-primary-50 text-primary-700' },
    { label: 'Consultations Today', value: '42', icon: Clock, tone: 'bg-success-50 text-success-700' },
    { label: 'Pending Verifications', value: '3', icon: ShieldCheck, tone: 'bg-warning-50 text-warning-700' },
  ];

  return (
    <DashboardLayout role="admin">
      <PageHeader
        title="Hospital Dashboard"
        subtitle="Manage hospital operations and staff"
      />

      <div className="mb-4 flex items-center gap-2 rounded-lg bg-warning-50 border border-warning-200 px-4 py-2.5">
        <Badge tone="warning">Coming Soon</Badge>
        <span className="text-xs text-warning-700">Hospital management features are under development.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} padding="md" hover>
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.tone}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-ink-900">{s.value}</p>
                <p className="text-xs font-semibold text-ink-500">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink-900">Hospital Management</h3>
              <p className="mt-2 text-sm text-ink-600">
                This dashboard will include features for managing doctors, staff, and hospital operations.
                Currently under development.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="primary">Doctor Management</Badge>
                <Badge tone="secondary">Staff Directory</Badge>
                <Badge tone="success">Patient Analytics</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink-900">Quick Actions</h3>
              <p className="mt-2 text-sm text-ink-600">
                Common hospital operations will be available here.
              </p>
              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-500">
                  Register new doctor — Coming soon
                </div>
                <div className="rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-500">
                  View patient records — Coming soon
                </div>
                <div className="rounded-lg border border-ink-200 px-3 py-2.5 text-sm text-ink-500">
                  Manage appointments — Coming soon
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
