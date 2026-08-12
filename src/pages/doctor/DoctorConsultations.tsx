import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Calendar, ArrowRight, Search, Plus } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useDoctor } from '@/contexts/DoctorContext';
import { demoPatients } from '@/data/demoData';

export function DoctorConsultations() {
  const { scannedPatientIds } = useDoctor();
  const [searchQuery, setSearchQuery] = useState('');

  const scannedPatients = demoPatients.filter((p) => scannedPatientIds.includes(p.id));

  const allConsultations = scannedPatients.flatMap((p) =>
    p.consultations.map((c) => ({
      ...c,
      patientName: p.name,
      healthId: p.healthId,
      patientId: p.id,
    }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  const filtered = allConsultations.filter((c) => {
    const q = searchQuery.toLowerCase();
    return c.patientName.toLowerCase().includes(q) || c.diagnosis.toLowerCase().includes(q) || c.healthId.toLowerCase().includes(q);
  });

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="Consultations"
        subtitle={`${allConsultations.length} consultation(s) across scanned patients`}
        action={
          <Link to="/doctor/scan">
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>New Consultation</Button>
          </Link>
        }
      />

      <Card padding="sm" className="mb-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search by patient name, diagnosis, or health ID…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
      </Card>

      {allConsultations.length === 0 ? (
        <Card padding="lg" className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink-100 mb-3">
            <Stethoscope className="h-7 w-7 text-ink-400" />
          </div>
          <p className="text-ink-900 font-bold">No consultations yet</p>
          <p className="text-sm text-ink-500 mt-1">Scan a patient and add a consultation to see it here.</p>
          <Link to="/doctor/scan">
            <Button className="mt-4">Scan Patient</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <Link key={i} to={`/doctor/patient/${c.healthId}`}>
              <Card padding="md" hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 shrink-0">
                      {c.patientName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink-900">{c.patientName}</p>
                      <p className="text-xs text-ink-500">{c.healthId}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-ink-800">{c.diagnosis}</p>
                        {c.notes && <p className="text-xs text-ink-500">{c.notes}</p>}
                      </div>
                      {c.medications.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {c.medications.map((m) => <Badge key={m.id} tone="info" className="text-[10px]">{m.name}</Badge>)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-ink-500 flex items-center gap-1"><Calendar className="h-3 w-3" />{c.date}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{c.doctor}</p>
                    {c.followUpDate && <Badge tone="warning" className="mt-2 text-[10px]">Follow-up: {c.followUpDate}</Badge>}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && allConsultations.length > 0 && (
            <Card padding="md" className="text-center">
              <p className="text-sm text-ink-500">No consultations match "{searchQuery}".</p>
            </Card>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
