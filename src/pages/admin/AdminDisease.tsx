import {
  TrendingUp, TrendingDown, Minus, Activity, AlertTriangle,
  MapPin, ShieldCheck,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { districtCases, diseaseMonitoring } from '@/data/demoData';

const trendIcons: Record<string, React.ReactNode> = {
  up: <TrendingUp className="h-4 w-4 text-danger-600" />,
  down: <TrendingDown className="h-4 w-4 text-success-600" />,
  stable: <Minus className="h-4 w-4 text-ink-500" />,
};

export function AdminDisease() {
  return (
    <DashboardLayout role="admin">
      <PageHeader title="Disease Monitoring" subtitle="Communicable disease surveillance across districts." />

      <div className="mb-4 flex items-center gap-2 rounded-lg bg-warning-50 border border-warning-200 px-4 py-2.5">
        <Badge tone="warning">Demo Data</Badge>
        <span className="text-xs text-warning-700">This is sample data for prototype demonstration — not real Kerala government health data.</span>
      </div>

      {/* Disease summary */}
      <Card padding="md" className="mb-6">
        <CardHeader title="Disease Trends" subtitle="Reported cases by disease type" icon={<Activity className="h-5 w-5" />} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diseaseMonitoring.map((d) => (
            <div key={d.disease} className="rounded-xl border border-ink-200 bg-ink-50/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{d.disease}</p>
              <p className="mt-1 text-2xl font-extrabold text-ink-900">{d.cases}</p>
              <div className="mt-2 flex items-center gap-1.5">
                {trendIcons[d.trend]}
                <span className="text-xs font-semibold capitalize text-ink-600">{d.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* District-wise cases table */}
      <Card padding="none">
        <div className="border-b border-ink-200 px-5 py-4">
          <h3 className="text-base font-bold text-ink-900">District-wise Reported Cases</h3>
          <p className="text-sm text-ink-500">Aug 1–12, 2026 · Sample data</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50 text-left">
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">District</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Disease</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Cases</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Date Range</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Trend</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Alert Status</th>
              </tr>
            </thead>
            <tbody>
              {districtCases.map((dc) => (
                <tr key={dc.id} className="border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                  <td className="px-5 py-3 font-bold text-ink-900">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-ink-400" />{dc.district}</span>
                  </td>
                  <td className="px-5 py-3 text-ink-700">{dc.disease}</td>
                  <td className="px-5 py-3 font-bold text-ink-900">{dc.cases}</td>
                  <td className="px-5 py-3 text-ink-500">{dc.dateRange}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 capitalize text-ink-600 text-xs font-semibold">
                      {trendIcons[dc.trend]} {dc.trend}
                    </span>
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={dc.alertStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card padding="md" className="border-danger-200 bg-danger-50/30">
          <div className="flex items-center gap-2 text-danger-700">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-sm font-bold">Alert</h3>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-danger-700">
            {districtCases.filter((d) => d.alertStatus === 'alert').length}
          </p>
          <p className="text-xs text-ink-500">Districts on alert</p>
        </Card>
        <Card padding="md" className="border-warning-200 bg-warning-50/30">
          <div className="flex items-center gap-2 text-warning-700">
            <Activity className="h-5 w-5" />
            <h3 className="text-sm font-bold">Monitoring</h3>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-warning-700">
            {districtCases.filter((d) => d.alertStatus === 'monitoring').length}
          </p>
          <p className="text-xs text-ink-500">Districts under monitoring</p>
        </Card>
        <Card padding="md" className="border-success-200 bg-success-50/30">
          <div className="flex items-center gap-2 text-success-700">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="text-sm font-bold">Normal</h3>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-success-700">
            {districtCases.filter((d) => d.alertStatus === 'normal').length}
          </p>
          <p className="text-xs text-ink-500">Districts normal</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
