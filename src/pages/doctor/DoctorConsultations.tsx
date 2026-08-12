import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Search, Calendar, ArrowRight, Plus } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Feedback';
import { demoPatients, recentConsultations } from '@/data/demoData';
import type { Consultation } from '@/types';

export function DoctorConsultations() {
  const [query, setQuery] = useState('');
  const allConsults: (Consultation & { patientName: string; healthId: string })[] = demoPatients.flatMap((p) =>
    p.consultations.map((c) => ({ ...c, patientName: p.name, healthId: p.healthId }))
  );
  const filtered = query.trim()
    ? allConsults.filter(
        (c) =>
          c.patientName.toLowerCase().includes(query.toLowerCase()) ||
          c.healthId.toLowerCase().includes(query.toLowerCase()) ||
          c.diagnosis.toLowerCase().includes(query.toLowerCase())
      )
    : allConsults.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="Consultations"
        subtitle="All recorded consultations across patients."
        action={
          <Link to="/doctor/scan">
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>New Consultation</Button>
          </Link>
        }
      />

      <Card padding="md" className="mb-6">
        <Input
          icon={<Search className="h-4 w-4" />}
          placeholder="Search by patient name, Health ID, or diagnosis…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<Stethoscope className="h-7 w-7" />} title="No consultations found" message={`No consultations matching "${query}".`} />
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <Link key={c.id} to={`/doctor/patient/${c.healthId}`}>
              <Card padding="md" hover>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-ink-900">{c.diagnosis}</h3>
                      <StatusBadge status="completed" />
                    </div>
                    <p className="mt-1 text-sm text-ink-500">
                      {c.patientName} · {c.healthId}
                    </p>
                    <p className="text-xs text-ink-500 mt-0.5">{c.hospital} · {c.doctor}</p>
                    <p className="mt-2 text-sm text-ink-700">{c.symptoms}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="flex items-center gap-1 text-xs text-ink-500">
                      <Calendar className="h-3.5 w-3.5" /> {c.date}
                    </span>
                    {c.followUpDate && <Badge tone="warning">Follow-up: {c.followUpDate}</Badge>}
                    <ArrowRight className="h-4 w-4 text-ink-400" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Card padding="md" className="mt-6">
        <CardHeader title="Recent Activity" subtitle="Latest consultation entries" icon={<Stethoscope className="h-5 w-5" />} />
        <div className="space-y-2">
          {recentConsultations.map((c, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5">
              <div>
                <p className="text-sm font-bold text-ink-900">{c.patient}</p>
                <p className="text-xs text-ink-500">{c.healthId} · {c.diagnosis}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-500">{c.date}</p>
                <p className="text-xs text-ink-400">{c.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
