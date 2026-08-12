import {
  Users, FileText, Stethoscope, Syringe, Activity, MapPin,
  TrendingUp, TrendingDown, Minus, ShieldCheck,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  adminStats, workersByDistrict, diseaseMonitoring, vaccinationCoverage, recentConsultations,
} from '@/data/demoData';

const trendIcons: Record<string, React.ReactNode> = {
  up: <TrendingUp className="h-4 w-4 text-danger-600" />,
  down: <TrendingDown className="h-4 w-4 text-success-600" />,
  stable: <Minus className="h-4 w-4 text-ink-500" />,
};

const pieColors = ['#2e878b', '#cbd4df'];

export function AdminDashboard() {
  const stats = [
    { label: 'Registered Workers', value: adminStats.totalWorkers.toLocaleString(), icon: Users, tone: 'bg-primary-50 text-primary-700' },
    { label: 'Active Health Records', value: adminStats.activeRecords.toLocaleString(), icon: FileText, tone: 'bg-secondary-50 text-secondary-700' },
    { label: 'Consultations', value: adminStats.totalConsultations.toLocaleString(), icon: Stethoscope, tone: 'bg-success-50 text-success-700' },
    { label: 'Vaccination Coverage', value: `${adminStats.vaccinationCoverage}%`, icon: Syringe, tone: 'bg-warning-50 text-warning-700' },
    { label: 'Reported Disease Cases', value: adminStats.diseaseCases.toString(), icon: Activity, tone: 'bg-danger-50 text-danger-700' },
    { label: 'Districts Covered', value: adminStats.districtsCovered.toString(), icon: MapPin, tone: 'bg-ink-100 text-ink-700' },
  ];

  return (
    <DashboardLayout role="admin">
      <PageHeader
        title="Health Authority Dashboard"
        subtitle="Anonymized aggregate health statistics across Kerala."
      />

      <div className="mb-4 flex items-center gap-2 rounded-lg bg-warning-50 border border-warning-200 px-4 py-2.5">
        <Badge tone="warning">Prototype Data</Badge>
        <span className="text-xs text-warning-700">All statistics shown are fictional demo data for illustration only.</span>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} padding="md" hover>
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.tone}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-ink-900">{s.value}</p>
                <p className="text-xs font-semibold text-ink-500">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Workers by District */}
        <Card padding="md" className="lg:col-span-2">
          <CardHeader title="Workers by District" subtitle="Distribution of registered migrant workers" icon={<MapPin className="h-5 w-5" />} />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workersByDistrict} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ee" />
              <XAxis dataKey="district" tick={{ fontSize: 11, fill: '#5f6e7f' }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11, fill: '#5f6e7f' }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e7ee', fontSize: '12px' }}
                cursor={{ fill: '#eef4fb' }}
              />
              <Bar dataKey="workers" fill="#284d82" radius={[6, 6, 0, 0]} name="Workers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Vaccination Coverage */}
        <Card padding="md">
          <CardHeader title="Vaccination Coverage" subtitle={`${adminStats.vaccinationCoverage}% covered`} icon={<Syringe className="h-5 w-5" />} />
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vaccinationCoverage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {vaccinationCoverage.map((_, i) => (
                  <Cell key={i} fill={pieColors[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e7ee', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Disease monitoring + recent consultations */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card padding="md">
          <CardHeader title="Disease Monitoring" subtitle="Reported cases (demo data)" icon={<Activity className="h-5 w-5" />} />
          <div className="space-y-3">
            {diseaseMonitoring.map((d) => (
              <div key={d.disease} className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-3">
                <div>
                  <p className="text-sm font-bold text-ink-900">{d.disease}</p>
                  <p className="text-xs text-ink-500">{d.cases} cases reported</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-ink-500 capitalize">{d.trend}</span>
                  {trendIcons[d.trend]}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <CardHeader title="Recent Consultations" subtitle="Latest entries across districts" icon={<Stethoscope className="h-5 w-5" />} />
          <div className="space-y-2">
            {recentConsultations.map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2.5">
                <div>
                  <p className="text-sm font-bold text-ink-900">{c.patient}</p>
                  <p className="text-xs text-ink-500">{c.healthId} · {c.diagnosis}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-500">{c.date}</p>
                  <p className="text-xs text-ink-400">{c.hospital}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-400">
        <ShieldCheck className="h-4 w-4 text-success-600" />
        <span>All data is anonymized. No personal medical information is exposed in analytics.</span>
      </div>
    </DashboardLayout>
  );
}
