import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, QrCode, Stethoscope, CalendarClock, ArrowRight,
  Search, Activity, AlertTriangle, ClipboardCheck, Clock,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { useDoctor } from '@/contexts/DoctorContext';
import { demoPatients, findPatientByHealthId } from '@/data/demoData';

export function DoctorDashboard() {
  const { profile, scannedPatientIds, activityLog } = useDoctor();
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<'none' | 'found' | 'notfound'>('none');
  const [foundPatient, setFoundPatient] = useState<typeof demoPatients[0] | null>(null);

  const scannedPatients = demoPatients.filter((p) => scannedPatientIds.includes(p.id));
  const totalConsultations = scannedPatients.reduce((sum, p) => sum + p.consultations.length, 0);
  const pendingFollowUps = scannedPatients.reduce(
    (sum, p) => sum + p.consultations.filter((c) => c.followUpDate).length,
    0
  );

  const handleSearch = () => {
    if (!searchId.trim()) return;
    const found = findPatientByHealthId(searchId.trim());
    if (found) {
      setFoundPatient(found);
      setSearchResult('found');
    } else {
      setSearchResult('notfound');
    }
  };

  // If profile not complete, show a top banner prompting completion but allow access to scanner and features
  const profileIncompleteBanner = !profile.isComplete ? (
    <Card padding="lg" className="max-w-2xl mx-auto mb-6 border-warning-200 bg-warning-50/70">
      <div className="flex items-start gap-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning-100">
          <ClipboardCheck className="h-6 w-6 text-warning-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-ink-900">Complete Your Profile</h3>
          <p className="mt-1 text-sm text-ink-600 max-w-md">Finish a few required fields in your profile to unlock full scanning and patient access features.</p>
          <div className="mt-3 flex gap-2">
            <Link to="/doctor/profile"><Button size="sm" icon={<ClipboardCheck className="h-4 w-4" />}>Complete Profile</Button></Link>
          </div>
        </div>
      </div>
    </Card>
  ) : null;

  // Profile complete — normal dashboard
  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="Doctor Dashboard"
        subtitle={`Welcome back, ${profile.fullName || 'Doctor'}`}
        action={
          <Link to="/doctor/scan">
            <Button size="sm" icon={<QrCode className="h-4 w-4" />}>Scan QR</Button>
          </Link>
        }
      />

  {profileIncompleteBanner}
      {/* Stats — dynamic based on scanned patients */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card key="scanned" padding="md" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-ink-900">{scannedPatients.length}</p>
              <p className="text-xs font-semibold text-ink-500">Scanned Patients</p>
            </div>
          </div>
        </Card>
        <Card key="total" padding="md" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-ink-900">{demoPatients.length}</p>
              <p className="text-xs font-semibold text-ink-500">Total Patients</p>
            </div>
          </div>
        </Card>
        <Card key="consult" padding="md" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-success-50 text-success-700">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-ink-900">{totalConsultations}</p>
              <p className="text-xs font-semibold text-ink-500">Consultations</p>
            </div>
          </div>
        </Card>
        <Card key="followup" padding="md" hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-warning-50 text-warning-700">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-ink-900">{pendingFollowUps}</p>
              <p className="text-xs font-semibold text-ink-500">Pending Follow-ups</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search + Scan */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card padding="md" className="lg:col-span-2">
          <CardHeader title="Search Patient" subtitle="Find by Health ID, name, or phone number" icon={<Search className="h-5 w-5" />} />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Health ID (e.g. KER-MW-10245), name, or phone…"
              value={searchId}
              onChange={(e) => { setSearchId(e.target.value); setSearchResult('none'); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 rounded-lg border border-ink-300 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            <Button onClick={handleSearch} icon={<Search className="h-4 w-4" />}>Search</Button>
          </div>

          {searchResult === 'found' && foundPatient && (
            <div className="mt-3 rounded-lg border border-success-200 bg-success-50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {foundPatient.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{foundPatient.name}</p>
                    <p className="text-xs text-ink-500">{foundPatient.healthId} · {foundPatient.currentDistrict}</p>
                  </div>
                </div>
                <Link to={`/doctor/patient/${foundPatient.healthId}`}>
                  <Button size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>Open</Button>
                </Link>
              </div>
            </div>
          )}
          {searchResult === 'notfound' && (
            <p className="mt-2 text-sm text-danger-600">No patient found with ID "{searchId}".</p>
          )}

          {/* Quick results — scanned patients or all */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
              {scannedPatients.length > 0 ? 'Recently Scanned Patients' : 'All Patients'}
            </p>
            {(scannedPatients.length > 0 ? scannedPatients : demoPatients).slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/doctor/patient/${p.healthId}`}
                className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {p.name.split(' ').map((n) => n[0]).join('')}
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
            {scannedPatients.length > 0
              ? scannedPatients.flatMap((p) => p.consultations.map((c) => ({ ...c, patientName: p.name, healthId: p.healthId })))
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 4)
                  .map((c, i) => (
                    <Link key={i} to={`/doctor/patient/${c.healthId}`}>
                      <div className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-3 hover:border-primary-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-sm font-bold text-secondary-700">
                            {c.patientName.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-ink-900">{c.patientName}</p>
                            <p className="text-xs text-ink-500">{c.healthId} · {c.diagnosis}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-ink-500">{c.date}</p>
                          <p className="text-xs text-ink-400">{c.doctor}</p>
                        </div>
                      </div>
                    </Link>
                  ))
              : <p className="text-sm text-ink-400 py-4 text-center">Scan a patient to see consultations here.</p>
            }
          </div>
        </Card>

        <div className="space-y-4">
          <Card padding="md" className="border-danger-200 bg-danger-50/30">
            <CardHeader title="Allergy Alerts" icon={<AlertTriangle className="h-5 w-5 text-danger-600" />} />
            <div className="space-y-3">
              {(scannedPatients.length > 0 ? scannedPatients : demoPatients).filter((p) => p.allergies.length > 0).map((p) => (
                <Link key={p.id} to={`/doctor/patient/${p.healthId}`}>
                  <div className="rounded-lg bg-white border border-danger-200 p-3 hover:border-danger-300 transition-colors">
                    <p className="text-sm font-bold text-ink-900">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.healthId}</p>
                    <div className="mt-1.5">
                      {p.allergies.map((a) => <Badge key={a.id} tone="danger" className="mr-1">{a.substance}</Badge>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Activity Log */}
          {activityLog.length > 0 && (
            <Card padding="md">
              <CardHeader title="Recent Activity" icon={<Clock className="h-5 w-5" />} />
              <div className="space-y-2">
                {activityLog.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-ink-200 px-3 py-2">
                    <p className="text-xs font-semibold text-ink-900">{entry.description}</p>
                    <p className="text-[10px] text-ink-400 mt-0.5">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
