import { useState } from 'react';
import { Users, Search, MapPin } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Feedback';
import { demoPatients } from '@/data/demoData';

export function AdminWorkers() {
  const [query, setQuery] = useState('');
  const filtered = query.trim()
    ? demoPatients.filter(
        (p) =>
          p.healthId.toLowerCase().includes(query.toLowerCase()) ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.nativeState.toLowerCase().includes(query.toLowerCase()) ||
          p.currentDistrict.toLowerCase().includes(query.toLowerCase())
      )
    : demoPatients;

  return (
    <DashboardLayout role="admin">
      <PageHeader title="Registered Workers" subtitle="All migrant workers with digital health records." />

      <Card padding="md" className="mb-6">
        <Input
          icon={<Search className="h-4 w-4" />}
          placeholder="Search by name, Health ID, native state, or district…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={<Users className="h-7 w-7" />} title="No workers found" message={`No workers matching "${query}".`} />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50 text-left">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Health ID</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Name</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Age</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Native State</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">District</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Registered</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-xs text-ink-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-primary-700">{p.healthId}</td>
                    <td className="px-4 py-3 font-bold text-ink-900">{p.name}</td>
                    <td className="px-4 py-3 text-ink-700">{p.age}y</td>
                    <td className="px-4 py-3 text-ink-700">{p.nativeState}</td>
                    <td className="px-4 py-3 text-ink-700">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-ink-400" />{p.currentDistrict}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-500">{p.registrationDate}</td>
                    <td className="px-4 py-3"><Badge tone="success">Active</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <p className="mt-4 text-xs text-ink-400">
        Showing {filtered.length} of {demoPatients.length} demo workers · Prototype data
      </p>
    </DashboardLayout>
  );
}
