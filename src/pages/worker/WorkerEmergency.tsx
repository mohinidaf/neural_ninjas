import { Droplet, AlertTriangle, Pill, Phone, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/Badge';
import { useWorkerProfile } from '@/contexts/WorkerProfileContext';

export function WorkerEmergency() {
  const { patientView } = useWorkerProfile();
  const p = patientView;

  return (
    <DashboardLayout role="worker">
      <PageHeader
        title="Emergency Health Information"
        subtitle="Optimized for fast reading during an emergency."
      />

      {/* Emergency banner */}
      <div className="mb-6 overflow-hidden rounded-2xl border-2 border-danger-300 bg-danger-50">
        <div className="flex items-center justify-between bg-danger-600 px-5 py-3 text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold text-base tracking-wide">EMERGENCY HEALTH INFORMATION</span>
          </div>
          <Badge tone="neutral" className="bg-white/20 text-white border-white/30">Show to medical staff</Badge>
        </div>

        <div className="p-5 sm:p-6">
          {/* Name + ID */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-danger-700">Name</p>
              <p className="text-2xl font-extrabold text-ink-900">{p.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-danger-700">Health ID</p>
              <p className="text-2xl font-extrabold text-primary-700">{p.healthId}</p>
            </div>
          </div>

          <div className="my-5 h-px bg-danger-200" />

          {/* Critical info grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-4 border border-danger-200">
              <div className="flex items-center gap-2 text-danger-700">
                <Droplet className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Blood Group</span>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-danger-700">{p.bloodGroup}</p>
            </div>

            <div className="rounded-xl bg-white p-4 border border-danger-200">
              <div className="flex items-center gap-2 text-danger-700">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Allergies</span>
              </div>
              <div className="mt-2 space-y-1">
                {p.allergies.length ? p.allergies.map(a => (
                  <p key={a.id} className="text-lg font-extrabold text-danger-700">{a.substance} <span className="text-sm font-semibold text-danger-500">({a.severity})</span></p>
                )) : <p className="text-lg font-bold text-success-700">None Reported</p>}
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 border border-danger-200">
              <div className="flex items-center gap-2 text-danger-700">
                <Activity className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Critical Conditions</span>
              </div>
              <div className="mt-2 space-y-1">
                {p.chronicConditions.length ? p.chronicConditions.map(c => (
                  <p key={c.id} className="text-lg font-extrabold text-ink-900">{c.name}</p>
                )) : <p className="text-lg font-bold text-success-700">None Reported</p>}
              </div>
            </div>
          </div>

          {/* Current medications */}
          <div className="mt-5 rounded-xl bg-white p-4 border border-danger-200">
            <div className="flex items-center gap-2 text-danger-700">
              <Pill className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Current Medications</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.medications.filter(m => m.status === 'active').length ? (
                p.medications.filter(m => m.status === 'active').map(m => (
                  <span key={m.id} className="rounded-lg bg-ink-100 px-3 py-1.5 text-sm font-bold text-ink-800">
                    {m.name} ({m.dosage})
                  </span>
                ))
              ) : (
                <span className="text-sm text-ink-500">No active medications listed.</span>
              )}
            </div>
          </div>

          {/* Emergency contact */}
          <div className="mt-5 rounded-xl bg-white p-4 border border-danger-200">
            <div className="flex items-center gap-2 text-danger-700">
              <Phone className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Emergency Contact</span>
            </div>
            <div className="mt-2">
              <p className="text-lg font-extrabold text-ink-900">{p.emergencyContact.name}</p>
              <p className="text-sm text-ink-600">{p.emergencyContact.relationship}</p>
              <p className="text-xl font-bold text-primary-700 mt-1">{p.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-ink-400">
        <ShieldCheck className="h-4 w-4 text-success-600" />
        <span>This information is visible to authorized healthcare providers via your Health ID.</span>
      </div>
    </DashboardLayout>
  );
}
