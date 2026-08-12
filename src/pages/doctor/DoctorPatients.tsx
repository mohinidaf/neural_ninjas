import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Users } from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/Feedback';
import { demoPatients } from '@/data/demoData';

export function DoctorPatients() {
  const [query, setQuery] = useState('');
  const results = query.trim()
    ? demoPatients.filter(p =>
        p.healthId.toLowerCase().includes(query.toLowerCase()) ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.phone.includes(query)
      )
    : demoPatients;

  return (
    <DashboardLayout role="doctor">
      <PageHeader title="Patients" subtitle="Search and access patient records by Health ID, name, or phone." />

      <Card padding="md" className="mb-6">
        <Input
          icon={<Search className="h-4 w-4" />}
          placeholder="Search by Health ID, name, or phone number…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      {results.length === 0 ? (
        <EmptyState
          icon={<Users className="h-7 w-7" />}
          title="No patients found"
          message={`No patients matching "${query}". Try a different Health ID, name, or phone number.`}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((p) => (
            <Link key={p.id} to={`/doctor/patient/${p.healthId}`}>
              <Card padding="md" hover className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-base font-bold text-primary-700">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink-900">{p.name}</h3>
                      <p className="text-xs text-ink-500">{p.healthId}</p>
                      <p className="text-xs text-ink-500">{p.age}y · {p.gender} · {p.currentDistrict}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-400" />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge tone="danger">Blood: {p.bloodGroup}</Badge>
                  {p.allergies.length > 0 && <Badge tone="warning">Allergy: {p.allergies[0].substance}</Badge>}
                  {p.chronicConditions.length > 0 && <Badge tone="secondary">{p.chronicConditions[0].name}</Badge>}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
