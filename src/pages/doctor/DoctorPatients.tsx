import { Link } from 'react-router-dom';
import { Users, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { useDoctor } from '@/contexts/DoctorContext';
import { demoPatients } from '@/data/demoData';

export function DoctorPatients() {
  const { scannedPatientIds } = useDoctor();
  const [searchQuery, setSearchQuery] = useState('');

  const scannedPatients = demoPatients.filter((p) => scannedPatientIds.includes(p.id));
  const filteredPatients = scannedPatients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.healthId.toLowerCase().includes(q) || p.currentDistrict.toLowerCase().includes(q);
  });

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="My Patients"
        subtitle={`${scannedPatients.length} patient(s) scanned`}
        action={
          <Link to="/doctor/scan">
            <Button size="sm" icon={<Users className="h-4 w-4" />}>Scan New Patient</Button>
          </Link>
        }
      />

      {scannedPatients.length === 0 ? (
        <Card padding="lg" className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink-100 mb-3">
            <Users className="h-7 w-7 text-ink-400" />
          </div>
          <p className="text-ink-900 font-bold">No patients scanned yet</p>
          <p className="text-sm text-ink-500 mt-1">Scan a patient's QR code to add them to your list.</p>
          <Link to="/doctor/scan">
            <Button className="mt-4" icon={<Users className="h-4 w-4" />}>Scan QR Code</Button>
          </Link>
        </Card>
      ) : (
        <>
          <Card padding="sm" className="mb-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-ink-400" />
              <input
                type="text"
                placeholder="Search by name, health ID, or district…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((p) => (
              <Link key={p.id} to={`/doctor/patient/${p.healthId}`}>
                <Card padding="md" hover className="h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-base font-bold text-primary-700">
                      {p.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <StatusBadge status={p.healthStatus === 'stable' ? 'active' : p.healthStatus === 'critical' ? 'critical' : 'warning'} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-ink-900">{p.name}</h3>
                  <p className="text-xs text-ink-500 mt-0.5">{p.healthId}</p>
                  <div className="mt-3 space-y-1 text-xs text-ink-600">
                    <p><span className="font-semibold text-ink-700">Age:</span> {p.age} · <span className="font-semibold text-ink-700">Blood:</span> {p.bloodType}</p>
                    <p><span className="font-semibold text-ink-700">District:</span> {p.currentDistrict}</p>
                  </div>
                  {p.allergies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.allergies.map((a) => <Badge key={a.id} tone="danger" className="text-[10px]">{a.substance}</Badge>)}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                    <span className="text-xs text-ink-500">{p.consultations.length} consultation(s)</span>
                    <ArrowRight className="h-4 w-4 text-ink-400" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPatients.length === 0 && scannedPatients.length > 0 && (
            <Card padding="md" className="mt-4 text-center">
              <p className="text-sm text-ink-500">No patients match "{searchQuery}".</p>
            </Card>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
