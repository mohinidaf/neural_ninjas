import { Link } from 'react-router-dom';
import {
  Users, QrCode, Stethoscope, CalendarClock, ArrowRight,
  Search, Activity, AlertTriangle,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { recentConsultations, demoPatients } from '@/data/demoData';

export function DoctorDashboard() {
  const stats = [
    { label: "Today's Patients", value: '8', icon: Users, tone: 'bg-primary-50 text-primary-700' },
    { label: 'Total Patients', value: '1,247', icon: Users, tone: 'bg-secondary-50 text-secondary-700' },
    { label: 'Consultations Today', value: '5', icon: Stethoscope, tone: 'bg-success-50 text-success-700' },
    { label: 'Pending Follow-ups', value: '12', icon: CalendarClock, tone: 'bg-warning-50 text-warning-700' },
  ];

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="Doctor Dashboard"
        subtitle="Welcome back, Dr. Anjali Menon"
        action={
          <Link to="/doctor/scan">
            <Button size="sm" icon={<QrCode className="h-4 w-4" />}>Scan QR</Button>
          </Link>
        }
      />

      {/* Stats */}
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

      {/* Search + Scan */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card padding="md" className="lg:col-span-2">
          <CardHeader title="Search Patient" subtitle="Find by Health ID, name, or phone number" icon={<Search className="h-5 w-5" />} />
          <SearchBox />
          {/* Quick results */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Recent Patients</p>
            {demoPatients.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/doctor/patient/${p.healthId}`}
                className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.healthId} · {p.currentDistrict}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-400" />
              </Link>
            ))}
          </div>
        </Card>

        <Card padding="md" className="bg-primary-50 border-primary-200">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-700 text-white">
            <QrCode className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-ink-900">Scan Health ID</h3>
          <p className="mt-1 text-sm text-ink-600">Scan a patient's QR code or manually enter their Health ID to access their full medical record.</p>
          <Link to="/doctor/scan">
            <Button className="w-full mt-4" icon={<QrCode className="h-4 w-4" />}>Open Scanner</Button>
          </Link>
        </Card>
      </div>

      {/* Recent consultations + alerts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card padding="md" className="lg:col-span-2">
          <CardHeader
            title="Recent Consultations"
            icon={<Stethoscope className="h-5 w-5" />}
            action={<Link to="/doctor/consultations"><Button variant="ghost" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>View All</Button></Link>}
          />
          <div className="space-y-3">
            {recentConsultations.map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-sm font-bold text-secondary-700">
                    {c.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{c.patient}</p>
                    <p className="text-xs text-ink-500">{c.healthId} · {c.diagnosis}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-500">{c.date}</p>
                  <p className="text-xs text-ink-400">{c.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md" className="border-danger-200 bg-danger-50/30">
          <CardHeader title="Allergy Alerts" icon={<AlertTriangle className="h-5 w-5 text-danger-600" />} />
          <div className="space-y-3">
            {demoPatients.filter(p => p.allergies.length > 0).map(p => (
              <div key={p.id} className="rounded-lg bg-white border border-danger-200 p-3">
                <p className="text-sm font-bold text-ink-900">{p.name}</p>
                <p className="text-xs text-ink-500">{p.healthId}</p>
                <div className="mt-1.5">
                  {p.allergies.map(a => <Badge key={a.id} tone="danger" className="mr-1">{a.substance}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function SearchBox() {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter Health ID (e.g. KER-MW-10245), name, or phone…"
        className="flex-1 rounded-lg border border-ink-300 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
      />
      <Link to="/doctor/patient/KER-MW-10245">
        <Button icon={<Search className="h-4 w-4" />}>Search</Button>
      </Link>
    </div>
  );
}
