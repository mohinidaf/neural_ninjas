import { Link } from 'react-router-dom';
import { AlertTriangle, Activity, Syringe, ArrowRight, ShieldCheck } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { demoPatients } from '@/data/demoData';

export function DoctorAlerts() {
  const allergyAlerts = demoPatients.filter((p) => p.allergies.length > 0);
  const overdueVaccines = demoPatients.flatMap((p) =>
    p.vaccinations.filter((v) => v.status === 'overdue').map((v) => ({ ...v, patientName: p.name, healthId: p.healthId }))
  );
  const chronicConditions = demoPatients.filter((p) => p.chronicConditions.length > 0);
  const recentDiagnoses = demoPatients.flatMap((p) =>
    p.consultations.slice(0, 1).map((c) => ({ ...c, patientName: p.name, healthId: p.healthId }))
  );

  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Alerts" subtitle="Critical patient alerts — allergies, overdue vaccinations, and conditions." />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Allergy Alerts */}
        <Card padding="md" className="border-danger-200 bg-danger-50/30">
          <CardHeader title="Allergy Alerts" subtitle="Patients with recorded allergies" icon={<AlertTriangle className="h-5 w-5 text-danger-600" />} />
          <div className="space-y-3">
            {allergyAlerts.map((p) => (
              <Link key={p.id} to={`/doctor/patient/${p.healthId}`}>
                <div className="rounded-lg bg-white border border-danger-200 p-3 hover:border-danger-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-ink-900">{p.name}</p>
                    <ArrowRight className="h-4 w-4 text-ink-400" />
                  </div>
                  <p className="text-xs text-ink-500">{p.healthId}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.allergies.map((a) => (
                      <Badge key={a.id} tone="danger">{a.substance} · {a.severity}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Overdue Vaccinations */}
        <Card padding="md" className="border-warning-200 bg-warning-50/30">
          <CardHeader title="Overdue Vaccinations" subtitle="Patients with overdue vaccine doses" icon={<Syringe className="h-5 w-5 text-warning-600" />} />
          {overdueVaccines.length === 0 ? (
            <p className="text-sm text-ink-500 py-4 text-center">No overdue vaccinations.</p>
          ) : (
            <div className="space-y-3">
              {overdueVaccines.map((v) => (
                <Link key={v.id + v.healthId} to={`/doctor/patient/${v.healthId}`}>
                  <div className="rounded-lg bg-white border border-warning-200 p-3 hover:border-warning-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-ink-900">{v.patientName}</p>
                      <Badge tone="warning">Overdue</Badge>
                    </div>
                    <p className="text-xs text-ink-500">{v.healthId}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{v.vaccine} ({v.dose}) — Due: {v.nextDueDate}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Chronic Conditions */}
        <Card padding="md" className="border-secondary-200 bg-secondary-50/30">
          <CardHeader title="Chronic Conditions" subtitle="Patients with managed conditions" icon={<Activity className="h-5 w-5 text-secondary-600" />} />
          <div className="space-y-3">
            {chronicConditions.map((p) => (
              <Link key={p.id} to={`/doctor/patient/${p.healthId}`}>
                <div className="rounded-lg bg-white border border-secondary-200 p-3 hover:border-secondary-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-ink-900">{p.name}</p>
                    <ArrowRight className="h-4 w-4 text-ink-400" />
                  </div>
                  <p className="text-xs text-ink-500">{p.healthId}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.chronicConditions.map((c) => (
                      <Badge key={c.id} tone="secondary">{c.name}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Recent Diagnoses */}
        <Card padding="md">
          <CardHeader title="Recent Diagnoses" subtitle="Latest diagnoses across patients" icon={<ShieldCheck className="h-5 w-5" />} />
          <div className="space-y-3">
            {recentDiagnoses.map((c, i) => (
              <Link key={i} to={`/doctor/patient/${c.healthId}`}>
                <div className="flex items-center justify-between rounded-lg border border-ink-200 p-3 hover:border-primary-300 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-ink-900">{c.patientName}</p>
                    <p className="text-xs text-ink-500">{c.healthId} · {c.diagnosis}</p>
                  </div>
                  <span className="text-xs text-ink-400">{c.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Link to="/doctor/patients">
          <Button variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>View All Patients</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
}
