import { ShieldCheck, Building2, MapPin, Mail, Phone, Users } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function AdminProfile() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Profile" subtitle="Health authority account and access details." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding="md" className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ink-700 text-2xl font-extrabold text-white">
            HA
          </div>
          <h2 className="mt-4 text-lg font-bold text-ink-900">Health Authority</h2>
          <p className="text-sm text-ink-500">Kerala State Health Mission</p>
          <div className="mt-3 flex justify-center">
            <Badge tone="primary"><ShieldCheck className="h-3.5 w-3.5" /> Admin Access</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink-200 pt-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Workers</p>
              <p className="font-bold text-ink-900">14,827</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Districts</p>
              <p className="font-bold text-ink-900">14</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card padding="md">
            <CardHeader title="Organization" icon={<Building2 className="h-5 w-5" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Organization" value="Kerala State Health Mission" icon={<Building2 className="h-4 w-4" />} />
              <Detail label="Department" value="Public Health & Family Welfare" />
              <Detail label="State" value="Kerala" icon={<MapPin className="h-4 w-4" />} />
              <Detail label="Jurisdiction" value="All Districts" />
              <Detail label="Phone" value="+91 471 230 1234" icon={<Phone className="h-4 w-4" />} />
              <Detail label="Email" value="health@kerala.gov.in" icon={<Mail className="h-4 w-4" />} />
            </div>
          </Card>

          <Card padding="md">
            <CardHeader title="Access Control" icon={<ShieldCheck className="h-5 w-5 text-success-600" />} />
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Access Level</span>
                <Badge tone="primary">Health Authority (Admin)</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Analytics Access</span>
                <Badge tone="success">Full</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Personal Records</span>
                <Badge tone="neutral">No access</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Disease Surveillance</span>
                <Badge tone="secondary">Authorized</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Last Login</span>
                <span className="font-semibold text-ink-700">12 Aug 2026, 09:00</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-ink-50 p-3 text-xs text-ink-500">
              <strong className="text-ink-700">Note:</strong> Admin access is limited to anonymized aggregate data.
              Personal medical records are not accessible from this account.
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
