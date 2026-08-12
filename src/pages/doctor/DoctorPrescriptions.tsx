import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, ArrowRight, Pill } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Feedback';
import { demoPatients } from '@/data/demoData';
import type { Prescription } from '@/types';

export function DoctorPrescriptions() {
  const [query, setQuery] = useState('');
  const allRx: (Prescription & { patientName: string; healthId: string })[] = demoPatients.flatMap((p) =>
    p.consultations
      .filter((c) => c.prescription)
      .map((c) => ({ ...c.prescription!, patientName: p.name, healthId: p.healthId }))
  );
  const filtered = query.trim()
    ? allRx.filter(
        (r) =>
          r.patientName.toLowerCase().includes(query.toLowerCase()) ||
          r.healthId.toLowerCase().includes(query.toLowerCase()) ||
          r.medicines.some((m) => m.name.toLowerCase().includes(query.toLowerCase()))
      )
    : allRx.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Prescriptions" subtitle="All prescriptions issued across patients." />

      <Card padding="md" className="mb-6">
        <Input
          icon={<Search className="h-4 w-4" />}
          placeholder="Search by patient, Health ID, or medicine…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<FileText className="h-7 w-7" />} title="No prescriptions found" message={`No prescriptions matching "${query}".`} />
      ) : (
        <div className="space-y-4">
          {filtered.map((rx) => (
            <Link key={rx.id} to={`/doctor/patient/${rx.healthId}`}>
              <Card padding="md" hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink-900">{rx.patientName}</h3>
                      <p className="text-xs text-ink-500">{rx.healthId} · {rx.date}</p>
                      <p className="text-xs text-ink-500">{rx.doctor} · {rx.hospital}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-400" />
                </div>
                <div className="mt-3 rounded-lg bg-primary-50/50 border border-primary-100 p-3">
                  <ul className="space-y-1.5 text-sm text-ink-700">
                    {rx.medicines.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Pill className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                        <span><strong>{m.name}</strong> — {m.dosage}, {m.frequency}, {m.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {rx.notes && (
                  <p className="mt-2 text-xs text-ink-500 italic">{rx.notes}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
