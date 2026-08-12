import { Download, Maximize2, ShieldCheck, Info } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { FullQRCard } from '@/components/HealthIDCard';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { primaryPatient } from '@/data/demoData';

export function WorkerHealthID() {
  const p = primaryPatient;
  return (
    <DashboardLayout role="worker">
      <PageHeader
        title="My Health ID & QR"
        subtitle="Show this to any authorized healthcare provider to access your record."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <FullQRCard patient={p} />

        <div className="space-y-4">
          <Card padding="md">
            <CardHeader title="How it works" icon={<Info className="h-5 w-5" />} />
            <ol className="space-y-3 text-sm text-ink-700">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">1</span>
                <span>Show your QR code to the healthcare provider at any hospital or clinic.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">2</span>
                <span>The provider scans or enters your Health ID to retrieve your record.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">3</span>
                <span>Only authorized personnel can access protected medical information.</span>
              </li>
            </ol>
          </Card>

          <Card padding="md">
            <CardHeader title="Access Control" icon={<ShieldCheck className="h-5 w-5 text-success-600" />} />
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-600">QR Code contains</span>
                <Badge tone="primary">Health ID only</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Medical history</span>
                <Badge tone="secondary">Authorized access</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Your control</span>
                <Badge tone="success">Protected</Badge>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-ink-50 p-3 text-xs text-ink-500">
              The QR code does <strong className="text-ink-700">not</strong> contain your full medical history.
              It links to your Health ID, which authorized providers use to access your record securely.
            </div>
          </Card>

          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800">
              <Download className="h-4 w-4" /> Download QR
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-50">
              <Maximize2 className="h-4 w-4" /> Full Screen
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
