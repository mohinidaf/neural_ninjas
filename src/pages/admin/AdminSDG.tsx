import {
  HeartPulse, Building2, Scale, Handshake, ShieldCheck,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const sdgs = [
  {
    num: '3',
    title: 'Good Health and Well-being',
    desc: 'Arogya Safar improves healthcare continuity and access for migrant workers by providing portable digital health records, ensuring treatment is never disrupted when workers move between districts.',
    icon: HeartPulse,
    color: 'bg-success-600',
    metric: '14,827 workers with health records',
  },
  {
    num: '9',
    title: 'Industry, Innovation & Infrastructure',
    desc: 'The platform creates digital healthcare infrastructure specifically designed for vulnerable populations, using QR-based Health IDs and cloud-native records accessible across Kerala.',
    icon: Building2,
    color: 'bg-primary-700',
    metric: '14 districts connected',
  },
  {
    num: '10',
    title: 'Reduced Inequalities',
    desc: 'By providing multilingual support and portable health identity, Arogya Safar reduces the healthcare access gap between migrant workers and local populations.',
    icon: Scale,
    color: 'bg-secondary-600',
    metric: '3 languages supported',
  },
  {
    num: '16',
    title: 'Peace, Justice & Strong Institutions',
    desc: 'Secure digital identity and role-based access control build trust in health institutions. Workers control their data while authorized providers access what they need.',
    icon: ShieldCheck,
    color: 'bg-ink-700',
    metric: 'Role-based access control',
  },
  {
    num: '17',
    title: 'Partnerships for the Goals',
    desc: 'Arogya Safar enables future collaboration between hospitals, government health agencies, NGOs, and insurance providers through a shared health record framework.',
    icon: Handshake,
    color: 'bg-accent-600',
    metric: 'Multi-stakeholder framework',
  },
];

export function AdminSDG() {
  return (
    <DashboardLayout role="admin">
      <PageHeader
        title="SDG Impact"
        subtitle="How Arogya Safar contributes to UN Sustainable Development Goals."
      />

      <div className="mb-6 rounded-xl bg-gradient-to-br from-primary-900 to-primary-800 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <HeartPulse className="h-6 w-6" />
          <Badge tone="secondary" className="bg-white/10 text-secondary-200 border-white/20">
            UN Sustainable Development Goals
          </Badge>
        </div>
        <h2 className="text-2xl font-extrabold mt-2">Advancing global goals, locally</h2>
        <p className="mt-2 text-primary-200 max-w-2xl">
          Arogya Safar directly contributes to five SDGs by improving health access for migrant workers,
          building digital infrastructure, reducing inequality, strengthening institutions, and enabling partnerships.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {sdgs.map((sdg) => (
          <Card key={sdg.num} padding="lg" hover>
            <div className="flex items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${sdg.color} text-white shadow-sm`}>
                <span className="text-xl font-extrabold">{sdg.num}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">SDG {sdg.num}</p>
                </div>
                <h3 className="text-base font-bold text-ink-900 leading-snug">{sdg.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{sdg.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <sdg.icon className="h-4 w-4 text-ink-400" />
                  <Badge tone="primary">{sdg.metric}</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
