import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, Search, UserCheck, ArrowRight, AlertTriangle,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useDoctor } from '@/contexts/DoctorContext';
import { demoPatients, demoQRMappings, findPatientByQR, findPatientByHealthId } from '@/data/demoData';
import QRScanner from '@/components/QRScanner';

export function DoctorScan() {
  const { addScannedPatient, addActivity, scannedPatientIds, isProfileComplete } = useDoctor();
  const navigate = useNavigate();
  const [manualId, setManualId] = useState('');
  const [searchResult, setSearchResult] = useState<'none' | 'found' | 'notfound'>('none');
  const [foundPatient, setFoundPatient] = useState<typeof demoPatients[0] | null>(null);

  // If profile not complete, show a warning but still allow scanning (for demo/testing).
  const showProfileWarning = !isProfileComplete();

  const handleManualSearch = () => {
    if (!manualId.trim()) return;
    const found = findPatientByHealthId(manualId.trim());
    if (found) {
      setFoundPatient(found);
      setSearchResult('found');
    } else {
      setSearchResult('notfound');
    }
  };

  const handleSelectQR = (qrId: string) => {
    const patient = findPatientByQR(qrId);
    if (patient) {
      setFoundPatient(patient);
      setSearchResult('found');
    }
  };

  const handleAddToPatients = (patient: typeof demoPatients[0]) => {
    addScannedPatient(patient.id);
    addActivity({
      type: 'consultation',
      description: `Scanned and added patient: ${patient.name} (${patient.healthId})`,
      patientId: patient.id,
      patientName: patient.name,
    });
    navigate(`/doctor/patient/${patient.healthId}`);
  };

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="Scan Patient QR"
        subtitle="Scan a patient's QR code or use a demo code below"
      />

      {showProfileWarning && (
        <Card padding="md" className="max-w-2xl mx-auto mb-6 border-warning-200 bg-warning-50/60">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-warning-600" />
            <div>
              <p className="text-sm font-bold text-ink-900">Profile Incomplete</p>
              <p className="text-xs text-ink-600">Complete your profile to ensure scanned records are saved under your account.</p>
            </div>
            <div className="ml-auto">
              <Button size="sm" onClick={() => navigate('/doctor/profile')}>Complete Profile</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Live Scanner */}
      <Card padding="lg" className="mb-6">
        <CardHeader title="Live Scanner" subtitle="Open your camera to scan a patient's QR code live" icon={<Camera className="h-5 w-5" />} />
        <div>
          <QRScanner onScan={(decoded) => {
            const patient = findPatientByQR(decoded);
            if (patient) {
              setFoundPatient(patient);
              setSearchResult('found');
            }
          }} onError={(e) => console.warn('QR scan error', e)} />
        </div>
      </Card>
      {/* Demo QR Codes */}
      <Card padding="lg">
        <CardHeader title="Demo QR Codes" subtitle="Tap any code below to simulate scanning that patient's QR" icon={<Camera className="h-5 w-5" />} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {demoQRMappings.map((qr) => {
            const patient = demoPatients.find((p) => p.id === qr.patientId)!;
            const isAlreadyAdded = scannedPatientIds.includes(qr.patientId);
            return (
              <button
                key={qr.qrId}
                onClick={() => !isAlreadyAdded && handleSelectQR(qr.qrId)}
                disabled={isAlreadyAdded}
                className={`text-left rounded-xl border-2 p-4 transition-all ${
                  isAlreadyAdded
                    ? 'border-success-300 bg-success-50 cursor-default'
                    : 'border-ink-200 hover:border-primary-400 hover:bg-primary-50 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ink-400">{qr.qrId}</span>
                  {isAlreadyAdded ? (
                    <Badge tone="success" className="text-[10px]">Added</Badge>
                  ) : (
                    <Camera className="h-4 w-4 text-ink-400" />
                  )}
                </div>
                <p className="text-sm font-bold text-ink-900">{patient.name}</p>
                <p className="text-xs text-ink-500">{patient.healthId}</p>
                <p className="text-xs text-ink-500 mt-1">{patient.currentDistrict} · {patient.age}y · {patient.gender === 'M' ? 'Male' : 'Female'}</p>
                {patient.allergies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {patient.allergies.map((a) => <Badge key={a.id} tone="danger" className="text-[9px]">{a.substance}</Badge>)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Manual Entry */}
      <Card padding="lg" className="mt-6">
        <CardHeader title="Manual Health ID Entry" subtitle="Type a Health ID if QR scanning is unavailable" icon={<Search className="h-5 w-5" />} />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. KER-MW-10245"
            value={manualId}
            onChange={(e) => { setManualId(e.target.value); setSearchResult('none'); }}
            onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
            className="flex-1 rounded-lg border border-ink-300 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          <Button onClick={handleManualSearch} icon={<Search className="h-4 w-4" />}>Search</Button>
        </div>
      </Card>

      {/* Search Result */}
      {searchResult === 'found' && foundPatient && (
        <Card padding="lg" className="mt-6 border-success-200 bg-success-50/50">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-700">
                {foundPatient.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-lg font-bold text-ink-900">{foundPatient.name}</p>
                <p className="text-sm text-ink-500">{foundPatient.healthId} · {foundPatient.currentDistrict}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {foundPatient.allergies.map((a) => <Badge key={a.id} tone="danger">{a.substance}</Badge>)}
                  {foundPatient.chronicConditions.map((c) => <Badge key={c.id} tone="warning">{c.condition}</Badge>)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {scannedPatientIds.includes(foundPatient.id) ? (
                <Badge tone="success">Already in your patients</Badge>
              ) : (
                <Button onClick={() => handleAddToPatients(foundPatient)} icon={<UserCheck className="h-4 w-4" />}>
                  Add to My Patients
                </Button>
              )}
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Age/Gender</p>
              <p className="text-ink-900">{foundPatient.age}y · {foundPatient.gender === 'M' ? 'Male' : 'Female'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Blood Type</p>
              <p className="text-ink-900">{foundPatient.bloodType}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Phone</p>
              <p className="text-ink-900">{foundPatient.phone}</p>
            </div>
          </div>
        </Card>
      )}
      {searchResult === 'notfound' && (
        <Card padding="md" className="mt-6 border-danger-200 bg-danger-50/30">
          <p className="text-sm text-danger-700 font-semibold">No patient found with Health ID "{manualId}". Check the ID and try again.</p>
        </Card>
      )}

      {/* All available patients list */}
      <Card padding="lg" className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-3">All Available Demo Patients</p>
        <div className="space-y-2">
          {demoPatients.map((p) => {
            const isAdded = scannedPatientIds.includes(p.id);
            return (
              <div key={p.id} className={`flex items-center justify-between rounded-lg border px-4 py-3 ${isAdded ? 'border-success-200 bg-success-50' : 'border-ink-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {p.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.healthId} · {p.currentDistrict}</p>
                  </div>
                </div>
                {isAdded ? (
                  <Badge tone="success">Added</Badge>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => handleAddToPatients(p)} iconRight={<ArrowRight className="h-3 w-3" />}>Add</Button>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </DashboardLayout>
  );
}
