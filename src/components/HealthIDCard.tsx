import { QRCodeSVG } from 'qrcode.react';
import { Download, Maximize2, ShieldCheck, HeartPulse } from 'lucide-react';
import type { Patient } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface HealthIDCardProps {
  patient: Patient;
  compact?: boolean;
}

export function HealthIDCard({ patient, compact = false }: HealthIDCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
      <div className="flex items-center justify-between bg-gradient-to-r from-primary-800 to-primary-700 px-5 py-3.5 text-white">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5" />
          <span className="font-bold">Arogya Safar</span>
        </div>
        <Badge tone="success" className="bg-white/15 text-white border-white/20">Active</Badge>
      </div>
      <div className={`flex ${compact ? 'flex-row gap-4 p-4' : 'flex-col sm:flex-row gap-5 p-5 sm:p-6'}`}>
        <div className="flex flex-col items-center">
          <div className={`rounded-lg border-2 border-ink-200 bg-white p-2.5 ${compact ? 'h-24 w-24' : 'h-32 w-32'}`}>
            <QRCodeSVG
              value={JSON.stringify({ healthId: patient.healthId, name: patient.name })}
              size={compact ? 80 : 112}
              level="M"
              bgColor="#ffffff"
              fgColor="#1a2f4b"
            />
          </div>
          {!compact && (
            <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">Scan QR</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Health ID</p>
          <p className={`font-extrabold tracking-tight text-primary-700 ${compact ? 'text-lg' : 'text-2xl'}`}>
            {patient.healthId}
          </p>
          <div className="mt-3 space-y-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Name</p>
              <p className={`font-bold text-ink-900 ${compact ? 'text-sm' : 'text-base'}`}>{patient.name}</p>
            </div>
            <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Blood</p>
                <p className={`font-bold text-ink-900 ${compact ? 'text-xs' : 'text-sm'}`}>{patient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Age</p>
                <p className={`font-bold text-ink-900 ${compact ? 'text-xs' : 'text-sm'}`}>{patient.age}y</p>
              </div>
              {!compact && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Allergy</p>
                  <p className="font-bold text-danger-600 text-sm">
                    {patient.allergies[0]?.substance || 'None'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-200 bg-ink-50 px-5 py-2.5 flex items-center justify-between">
        <span className="text-xs text-ink-500">Updated: {patient.lastUpdated}</span>
        <span className="flex items-center gap-1 text-xs font-semibold text-success-700">
          <ShieldCheck className="h-3.5 w-3.5" /> Verified
        </span>
      </div>
    </div>
  );
}

interface FullQRCardProps {
  patient: Patient;
}

export function FullQRCard({ patient }: FullQRCardProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-card-lg">
      <div className="rounded-xl border-4 border-primary-100 bg-white p-4">
        <QRCodeSVG
          value={JSON.stringify({ healthId: patient.healthId, name: patient.name })}
          size={200}
          level="M"
          bgColor="#ffffff"
          fgColor="#1a2f4b"
        />
      </div>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-ink-400">Health ID</p>
      <p className="text-2xl font-extrabold text-primary-700">{patient.healthId}</p>
      <p className="mt-1 text-base font-bold text-ink-900">{patient.name}</p>
      <p className="mt-3 max-w-xs text-sm text-ink-500">
        Show this QR code to an authorized healthcare provider to access your health record.
      </p>
      <div className="mt-5 flex gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
          <Download className="h-4 w-4" /> Download QR
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50">
          <Maximize2 className="h-4 w-4" /> Full Screen
        </button>
      </div>
    </div>
  );
}
