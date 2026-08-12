import { Link } from 'react-router-dom';
import {
  Users, Activity, AlertTriangle, MapPin,
  Stethoscope, Clock, BarChart3,
  FileText, QrCode,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from 'recharts';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { useDoctor } from '@/contexts/DoctorContext';
import { demoPatients } from '@/data/demoData';
import type { TabItem } from '@/components/ui/Tabs';

const tabItems: TabItem[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'disease', label: 'Disease Monitoring', icon: <Activity className="h-4 w-4" /> },
  { id: 'activity', label: 'Activity Log', icon: <Clock className="h-4 w-4" /> },
];

export function AdminDashboard() {
  const { activityLog, scannedPatientIds } = useDoctor();

  const scannedPatients = demoPatients.filter((p) => scannedPatientIds.includes(p.id));

  const stats = [
    { label: 'Total Patients', value: demoPatients.length, icon: Users, color: 'primary', to: '/admin/workers' },
    { label: 'Scanned by Doctor', value: scannedPatients.length, icon: QrCode, color: 'success', to: '/admin/workers' },
    { label: 'Consultations', value: demoPatients.reduce((s, p) => s + p.consultations.length, 0), icon: Stethoscope, color: 'secondary', to: '/admin' },
    { label: 'Active Alerts', value: demoPatients.filter((p) => p.healthStatus === 'critical').length, icon: AlertTriangle, color: 'danger', to: '/admin/alerts' },
  ];

  const colorMap: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    success: 'bg-success-100 text-success-700',
    danger: 'bg-danger-100 text-danger-700',
  };

  return (
    <DashboardLayout role="admin">
      <PageHeader title="Admin Dashboard" subtitle="Health authority overview & monitoring" />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card padding="md" hover className="h-full">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${colorMap[s.color]}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-ink-900">{s.value}</p>
                  <p className="text-xs font-semibold text-ink-500">{s.label}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Tabs tabs={tabItems} value="overview" onChange={() => {}} />
      <div className="pt-6">
        {/* Overview Tab */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Workers by District */}
          <Card padding="md">
            <CardHeader title="Patients by District" icon={<MapPin className="h-5 w-5" />} />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { district: 'Ernakulam', count: demoPatients.filter((p) => p.currentDistrict === 'Ernakulam').length },
                  { district: 'Alappuzha', count: demoPatients.filter((p) => p.currentDistrict === 'Alappuzha').length },
                  { district: 'Thrissur', count: demoPatients.filter((p) => p.currentDistrict === 'Thrissur').length },
                  { district: 'Kottayam', count: demoPatients.filter((p) => p.currentDistrict === 'Kottayam').length },
                  { district: 'Idukki', count: demoPatients.filter((p) => p.currentDistrict === 'Idukki').length },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="district" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Disease Monitoring */}
          <Card padding="md">
            <CardHeader title="Top Conditions" icon={<Activity className="h-5 w-5" />} />
            <div className="space-y-3">
              {[
                { name: 'Hypertension', cases: 2, severity: 'warning' },
                { name: 'Diabetes Type 2', cases: 1, severity: 'warning' },
                { name: 'Malaria', cases: 1, severity: 'danger' },
                { name: 'Tuberculosis', cases: 1, severity: 'danger' },
                { name: 'Chronic Kidney Disease', cases: 1, severity: 'danger' },
              ].map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                    <span className="text-sm font-semibold text-ink-900">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-ink-500">{d.cases} case(s)</span>
                    <Badge tone={d.severity as 'warning' | 'danger'}>{d.severity}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent consultations */}
          <Card padding="md" className="lg:col-span-2">
            <CardHeader title="Recent Consultations" icon={<Stethoscope className="h-5 w-5" />} />
            <div className="space-y-2">
              {demoPatients.flatMap((p) => p.consultations.map((c) => ({ ...c, patientName: p.name, healthId: p.healthId })))
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 5)
                .map((c, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5 hover:border-primary-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-sm font-bold text-secondary-700">
                        {c.patientName.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink-900">{c.patientName}</p>
                        <p className="text-xs text-ink-500">{c.healthId} · {c.diagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-ink-500">{c.date}</p>
                      <p className="text-xs text-ink-400">{c.doctor}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* Activity Log (inline, always visible) */}
        <Card padding="md" className="mt-6">
          <CardHeader title="Doctor Activity Log" icon={<Clock className="h-5 w-5" />} subtitle="Real-time tracking of doctor actions" />
          {activityLog.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-10 w-10 text-ink-300 mx-auto mb-3" />
              <p className="text-ink-900 font-bold">No activity yet</p>
              <p className="text-sm text-ink-500 mt-1">Activity will appear here when a doctor scans patients or adds consultations.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activityLog.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 rounded-lg border border-ink-200 px-4 py-3 hover:border-primary-300 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 shrink-0">
                    {entry.type === 'consultation' ? <Stethoscope className="h-4 w-4 text-primary-700" /> :
                     entry.type === 'scan' ? <QrCode className="h-4 w-4 text-primary-700" /> :
                     <FileText className="h-4 w-4 text-primary-700" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink-900">{entry.description}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
