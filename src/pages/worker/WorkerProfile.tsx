import { User, Phone, MapPin, Calendar, ShieldCheck, FileText } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { primaryPatient } from '@/data/demoData';

export function WorkerProfile() {
  const p = primaryPatient;
  return (
    <DashboardLayout role="worker">
      <PageHeader title="My Profile" subtitle="Your personal and registration details." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile summary */}
        <Card padding="md" className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-extrabold text-primary-700">
            {p.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="mt-4 text-lg font-bold text-ink-900">{p.name}</h2>
          <p className="text-sm text-ink-500">{p.healthId}</p>
          <div className="mt-3 flex justify-center">
            <Badge tone="success"><ShieldCheck className="h-3.5 w-3.5" /> Verified Worker</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm border-t border-ink-200 pt-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Age</p>
              <p className="font-bold text-ink-900">{p.age}y</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Blood</p>
              <p className="font-bold text-ink-900">{p.bloodGroup}</p>
            </div>
          </div>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <Card padding="md">
            <CardHeader title="Personal Information" icon={<User className="h-5 w-5" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Full Name" value={p.name} icon={<User className="h-4 w-4" />} />
              <Detail label="Age" value={`${p.age} years`} icon={<Calendar className="h-4 w-4" />} />
              <Detail label="Gender" value={p.gender} />
              <Detail label="Phone" value={p.phone} icon={<Phone className="h-4 w-4" />} />
              <Detail label="Native State" value={p.nativeState} icon={<MapPin className="h-4 w-4" />} />
              <Detail label="Current District" value={p.currentDistrict} icon={<MapPin className="h-4 w-4" />} />
            </div>
          </Card>

          <Card padding="md">
            <CardHeader title="Registration Details" icon={<FileText className="h-5 w-5" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Health ID" value={p.healthId} />
              <Detail label="Registered Since" value={p.registrationDate} />
              <Detail label="Last Updated" value={p.lastUpdated} />
              <Detail label="Status" value="Active" />
            </div>
          </Card>

          {p.insurance && (
            <Card padding="md">
              <CardHeader title="Insurance Information" icon={<ShieldCheck className="h-5 w-5" />} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail label="Provider" value={p.insurance.provider} />
                <Detail label="Policy Number" value={p.insurance.policyNumber} />
                <Detail label="Status" value={p.insurance.status === 'active' ? 'Active' : 'Inactive'} />
              </div>
            </Card>
          )}
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
