import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Syringe, Search, ArrowRight, AlertTriangle } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Feedback';
import { demoPatients } from '@/data/demoData';
import type { Vaccination } from '@/types';

export function DoctorVaccinations() {
  const [query, setQuery] = useState('');

  const allVacc: (Vaccination & { patientName: string; healthId: string })[] = demoPatients.flatMap((p) =>
    p.vaccinations.map((v) => ({ ...v, patientName: p.name, healthId: p.healthId }))
  );

  const filtered = query.trim()
    ? allVacc.filter(
        (v) =>
          v.patientName.toLowerCase().includes(query.toLowerCase()) ||
          v.healthId.toLowerCase().includes(query.toLowerCase()) ||
          v.vaccine.toLowerCase().includes(query.toLowerCase())
      )
    : allVacc;

  const overdue = allVacc.filter((v) => v.status === 'overdue');

  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Vaccinations" subtitle="Vaccination records and due dates across patients." />

      {overdue.length > 0 && (
        <Card padding="md" className="mb-6 border-danger-200 bg-danger-50/30">
          <CardHeader title="Overdue Vaccinations" icon={<AlertTriangle className="h-5 w-5 text-danger-600" />} />
          <div className="space-y-2">
            {overdue.map((v) => (
              <Link key={v.id} to={`/doctor/patient/${v.healthId}`}>
                <div className="flex items-center justify-between rounded-lg bg-white border border-danger-200 px-3 py-2.5 hover:border-danger-300 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-ink-900">{v.patientName} · {v.healthId}</p>
                    <p className="text-xs text-ink-500">{v.vaccine} ({v.dose}) — Due: {v.nextDueDate}</p>
                  </div>
                  <StatusBadge status="overdue" />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      <Card padding="md" className="mb-6">
        <Input
          icon={<Search className="h-4 w-4" />}
          placeholder="Search by patient, Health ID, or vaccine name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<Syringe className="h-7 w-7" />} title="No vaccinations found" message={`No vaccinations matching "${query}".`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((v) => (
            <Link key={v.id + v.healthId} to={`/doctor/patient/${v.healthId}`}>
              <Card padding="md" hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-700">
                      <Syringe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink-900">{v.vaccine}</h3>
                      <p className="text-xs text-ink-500">{v.patientName} · {v.healthId}</p>
                      <p className="text-xs text-ink-500">{v.dose} · {v.date} · {v.hospital}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Next Due</p>
                      <p className="text-xs text-ink-700">{v.nextDueDate || '—'}</p>
                    </div>
                    <StatusBadge status={v.status} />
                    <ArrowRight className="h-4 w-4 text-ink-400" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
