import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Search, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { findPatientByHealthId, demoPatients } from '@/data/demoData';

export function DoctorScan() {
  const [healthId, setHealthId] = useState('');
  const [result, setResult] = useState<'none' | 'found' | 'notfound'>('none');
  const [patient, setPatient] = useState(demoPatients[0]);

  const handleSearch = () => {
    const found = findPatientByHealthId(healthId);
    if (found) {
      setPatient(found);
      setResult('found');
    } else {
      setResult('notfound');
    }
  };

  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Scan / Enter Health ID" subtitle="Scan a patient's QR code or manually enter their Health ID." />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scanner mock + manual entry */}
        <Card padding="md">
          <CardHeader title="QR Scanner" subtitle="Camera scanner UI" icon={<QrCode className="h-5 w-5" />} />
          {/* Scanner viewport */}
          <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-primary-300 bg-ink-900">
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 h-8 w-8 border-t-4 border-l-4 rounded-tl-lg border-primary-400" />
            <div className="absolute top-3 right-3 h-8 w-8 border-t-4 border-r-4 rounded-tr-lg border-primary-400" />
            <div className="absolute bottom-3 left-3 h-8 w-8 border-b-4 border-l-4 rounded-bl-lg border-primary-400" />
            <div className="absolute bottom-3 right-3 h-8 w-8 border-b-4 border-r-4 rounded-br-lg border-primary-400" />
            {/* Scan line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary-400 shadow-[0_0_8px_2px_rgba(53,99,160,0.5)] animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-white/70 text-center px-8">
                Camera preview<br />
                <span className="text-xs text-white/50">Position QR code within frame</span>
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink-500">
            Scanner is a demo UI. Use manual entry below to search by Health ID.
          </p>
        </Card>

        {/* Manual entry + result */}
        <div className="space-y-4">
          <Card padding="md">
            <CardHeader title="Manual Entry" subtitle="Enter Health ID to search" icon={<Search className="h-5 w-5" />} />
            <Input
              placeholder="e.g. KER-MW-10245"
              value={healthId}
              onChange={(e) => setHealthId(e.target.value)}
              onPressEnter={handleSearch}
            />
            <div className="mt-3 flex gap-2">
              <Button onClick={handleSearch} icon={<Search className="h-4 w-4" />} className="flex-1">
                Search
              </Button>
              <Button variant="outline" onClick={() => { setHealthId('KER-MW-10245'); }} className="flex-1">
                Try Demo ID
              </Button>
            </div>

            {/* Quick suggestions */}
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">Demo Health IDs</p>
              <div className="flex flex-wrap gap-2">
                {demoPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setHealthId(p.healthId); }}
                    className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700 hover:border-primary-300 hover:bg-primary-50"
                  >
                    {p.healthId}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Result */}
          {result === 'found' && (
            <Card padding="md" className="border-success-300 bg-success-50/50 animate-scale-in">
              <div className="flex items-center gap-2 text-success-700">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-bold">Patient Record Found</h3>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-base font-bold text-primary-700">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-ink-900">{patient.name}</p>
                  <p className="text-xs text-ink-500">{patient.healthId} · {patient.age}y · {patient.gender}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge tone="danger">Blood: {patient.bloodGroup}</Badge>
                {patient.allergies.map(a => <Badge key={a.id} tone="danger">Allergy: {a.substance}</Badge>)}
                {patient.chronicConditions.map(c => <Badge key={c.id} tone="secondary">{c.name}</Badge>)}
              </div>
              <Link to={`/doctor/patient/${patient.healthId}`}>
                <Button className="w-full mt-4" iconRight={<ArrowRight className="h-4 w-4" />}>
                  Open Patient Record
                </Button>
              </Link>
            </Card>
          )}

          {result === 'notfound' && (
            <Card padding="md" className="border-danger-200 bg-danger-50/50">
              <div className="flex items-center gap-2 text-danger-700">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="text-base font-bold">No Record Found</h3>
              </div>
              <p className="mt-2 text-sm text-ink-600">
                No patient found with Health ID "{healthId}". Please check the ID and try again.
              </p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
