import { Link } from 'react-router-dom';
import {
  Droplet, AlertTriangle, Pill, Activity, Stethoscope, Syringe,
  Clock, MapPin, QrCode, ArrowRight, CalendarClock,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HealthIDCard } from '@/components/HealthIDCard';
import { primaryPatient } from '@/data/demoData';

export function WorkerDashboard() {
  const p = primaryPatient;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const overview = [
    { label: 'Blood Group', value: p.bloodGroup, icon: Droplet, tone: 'text-danger-600 bg-danger-50' },
    { label: 'Allergies', value: p.allergies.length ? p.allergies.map(a => a.substance).join(', ') : 'None', icon: AlertTriangle, tone: 'text-warning-600 bg-warning-50' },
    { label: 'Current Medications', value: `${p.medications.filter(m => m.status === 'active').length} active`, icon: Pill, tone: 'text-primary-600 bg-primary-50' },
    { label: 'Chronic Conditions', value: p.chronicConditions.length ? p.chronicConditions.map(c => c.name).join(', ') : 'None', icon: Activity, tone: 'text-secondary-600 bg-secondary-50' },
    { label: 'Last Consultation', value: p.consultations[0]?.date || '—', icon: Stethoscope, tone: 'text-ink-600 bg-ink-100' },
    { label: 'Vaccination Status', value: p.vaccinations.some(v => v.status === 'overdue') ? '1 overdue' : 'Up to date', icon: Syringe, tone: p.vaccinations.some(v => v.status === 'overdue') ? 'text-danger-600 bg-danger-50' : 'text-success-600 bg-success-50' },
  ];

  // Build timeline from consultations, labs, vaccinations
  const timeline = [
    ...p.consultations.map(c => ({ date: c.date, type: 'Consultation', title: c.diagnosis, location: c.hospital, icon: Stethoscope })),
    ...p.labReports.map(l => ({ date: l.date, type: 'Lab Test', title: l.testName, location: l.hospital, icon: Activity })),
    ...p.vaccinations.map(v => ({ date: v.date, type: 'Vaccination', title: `${v.vaccine} (${v.dose})`, location: v.hospital, icon: Syringe })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <DashboardLayout role="worker">
      <PageHeader
        title={`${greeting}, ${p.name.split(' ')[0]}`}
        subtitle="Your health information, available wherever you go."
        action={
          <Link to="/worker/health-id">
            <Button size="sm" icon={<QrCode className="h-4 w-4" />}>View QR</Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health ID Card */}
        <div className="lg:col-span-2">
          <HealthIDCard patient={p} />
        </div>

        {/* Emergency info */}
        <Card padding="md" className="border-danger-200 bg-danger-50/30">
          <CardHeader
            title="Emergency Information"
            icon={<AlertTriangle className="h-5 w-5 text-danger-600" />}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-600">Blood Group</span>
              <span className="text-lg font-extrabold text-danger-700">{p.bloodGroup}</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm text-ink-600">Allergies</span>
              <div className="text-right">
                {p.allergies.length ? p.allergies.map(a => (
                  <Badge key={a.id} tone="danger" className="mb-1 ml-1">{a.substance} · {a.severity}</Badge>
                )) : <span className="text-sm font-semibold text-ink-700">None</span>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-600">Conditions</span>
              <span className="text-sm font-bold text-ink-900">{p.chronicConditions.map(c => c.name).join(', ') || 'None'}</span>
            </div>
            <div className="border-t border-danger-200 pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Emergency Contact</p>
              <p className="mt-1 text-sm font-bold text-ink-900">{p.emergencyContact.name}</p>
              <p className="text-sm text-ink-600">{p.emergencyContact.relationship} · {p.emergencyContact.phone}</p>
            </div>
            <Link to="/worker/emergency">
              <Button variant="danger" size="sm" className="w-full" iconRight={<ArrowRight className="h-4 w-4" />}>
                View Emergency Card
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Health Overview */}
      <h2 className="mt-8 mb-4 text-lg font-bold text-ink-900">Health Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overview.map((item) => (
          <Card key={item.label} padding="md" hover>
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.tone}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">{item.label}</p>
                <p className="mt-0.5 truncate text-sm font-bold text-ink-900">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent activity + quick links */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card padding="md">
            <CardHeader
              title="Recent Medical Activity"
              subtitle="Your latest consultations, tests, and vaccinations"
              icon={<Clock className="h-5 w-5" />}
              action={<Link to="/worker/record"><Button variant="ghost" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>View All</Button></Link>}
            />
            <div className="relative space-y-5">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                      <item.icon className="h-4 w-4" />
                    </div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-ink-200" />}
                  </div>
                  <div className="pb-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-ink-900">{item.title}</p>
                      <span className="text-xs text-ink-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-ink-500">{item.type}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
                      <MapPin className="h-3 w-3" /> {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <Card padding="md">
            <h3 className="text-sm font-bold text-ink-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/worker/record" className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 text-sm font-semibold text-ink-700 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <span className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary-600" /> Health Record</span>
                <ArrowRight className="h-4 w-4 text-ink-400" />
              </Link>
              <Link to="/worker/health-id" className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 text-sm font-semibold text-ink-700 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <span className="flex items-center gap-2"><QrCode className="h-4 w-4 text-primary-600" /> My QR Code</span>
                <ArrowRight className="h-4 w-4 text-ink-400" />
              </Link>
              <Link to="/worker/emergency" className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 text-sm font-semibold text-ink-700 hover:border-danger-300 hover:bg-danger-50 transition-colors">
                <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-danger-600" /> Emergency Info</span>
                <ArrowRight className="h-4 w-4 text-ink-400" />
              </Link>
            </div>
          </Card>

          <Card padding="md" className="bg-secondary-50 border-secondary-200">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-secondary-700" />
              <h3 className="text-sm font-bold text-ink-900">Next Follow-up</h3>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-secondary-700">
              {p.consultations.find(c => c.followUpDate)?.followUpDate || 'Not scheduled'}
            </p>
            <p className="text-xs text-ink-500 mt-1">
              {p.consultations.find(c => c.followUpDate)?.doctor || '—'} · Bring your QR code
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
