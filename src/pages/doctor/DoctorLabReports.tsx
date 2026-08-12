import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Search, ArrowRight } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { StatusBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Feedback';
import { demoPatients } from '@/data/demoData';
import type { LabReport } from '@/types';

export function DoctorLabReports() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const allLabs: (LabReport & { patientName: string; healthId: string })[] = demoPatients.flatMap((p) =>
    p.labReports.map((l) => ({ ...l, patientName: p.name, healthId: p.healthId }))
  );

  let filtered = allLabs;
  if (query.trim()) {
    filtered = filtered.filter(
      (l) =>
        l.patientName.toLowerCase().includes(query.toLowerCase()) ||
        l.healthId.toLowerCase().includes(query.toLowerCase()) ||
        l.testName.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter((l) => l.status === statusFilter);
  }
  filtered = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Lab Reports" subtitle="All lab reports across patients." />

      <Card padding="md" className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Search by patient, Health ID, or test name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-lg border border-ink-300 bg-white px-3 text-sm font-semibold text-ink-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<FlaskConical className="h-7 w-7" />} title="No lab reports found" message={`No lab reports matching your search.`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((l) => (
            <Link key={l.id} to={`/doctor/patient/${l.healthId}`}>
              <Card padding="md" hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700">
                      <FlaskConical className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink-900">{l.testName}</h3>
                      <p className="text-xs text-ink-500">{l.patientName} · {l.healthId}</p>
                      <p className="text-xs text-ink-500">{l.date} · {l.hospital}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={l.status} />
                    <ArrowRight className="h-4 w-4 text-ink-400" />
                  </div>
                </div>
                {l.result && (
                  <div className="mt-3 rounded-lg bg-ink-50 p-3 text-sm">
                    <p className="font-bold text-ink-900">{l.result}</p>
                    {l.normalRange && <p className="text-xs text-ink-500 mt-0.5">Normal range: {l.normalRange}</p>}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
