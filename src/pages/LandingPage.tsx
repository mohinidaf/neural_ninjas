import { Link } from 'react-router-dom';
import {
  ArrowRight, QrCode, ShieldCheck, HeartPulse, Languages, FileText,
  FlaskConical, Syringe, MapPin, Activity, Stethoscope, AlertTriangle,
  FileStack, Users, Building2, ArrowLeftRight, CalendarClock, Pill,
} from 'lucide-react';
import { LandingNav } from '@/components/LandingNav';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import nameImage from '../../images/name_-removebg-preview.png';

const problems = [
  { icon: FileStack, title: 'Lost Medical Records', desc: 'Paper prescriptions and lab reports get lost, damaged, or left behind when workers move between districts.' },
  { icon: Languages, title: 'Language Barriers', desc: 'Workers speaking Hindi, Bengali, or Odia struggle to communicate medical history to Malayalam-speaking doctors.' },
  { icon: MapPin, title: 'Frequent Relocation', desc: 'A worker moving Kozhikode → Kochi → Trivandrum leaves their medical history at the previous hospital.' },
  { icon: ArrowLeftRight, title: 'Fragmented Healthcare', desc: 'Each hospital creates a new patient file. Treatment starts from scratch and tests are repeated.' },
  { icon: CalendarClock, title: 'Repeated Tests', desc: 'Without access to previous lab reports, new facilities reorder the same tests — costing time and money.' },
  { icon: AlertTriangle, title: 'Emergency Difficulties', desc: 'In an emergency, no immediate access to blood group, allergies, or critical conditions delays care.' },
];

const workflow = [
  { step: '01', title: 'Register', desc: 'Worker registers with basic details at any health centre or directly via the app.' },
  { step: '02', title: 'Health ID', desc: 'A unique portable Health ID (KER-MW-XXXXX) is generated instantly.' },
  { step: '03', title: 'QR Code', desc: 'A QR code linked to the Health ID is issued — carried on phone or printed card.' },
  { step: '04', title: 'Authorized Access', desc: 'Any authorized healthcare provider scans or enters the ID to retrieve the record.' },
  { step: '05', title: 'Medical Record', desc: 'Full medical history — allergies, conditions, medications, labs — becomes available.' },
  { step: '06', title: 'Continuous Care', desc: 'Treatment continues seamlessly across districts. No repeated tests, no lost history.' },
];

const features = [
  { icon: QrCode, title: 'Digital Health ID', desc: 'A unique, portable health identity that travels with the worker across Kerala.', tone: 'primary' },
  { icon: ShieldCheck, title: 'QR Medical Access', desc: 'Authorized providers scan the QR to instantly access verified health records.', tone: 'secondary' },
  { icon: FileText, title: 'Medical History', desc: 'Complete chronological record of consultations, diagnoses, and treatments.', tone: 'primary' },
  { icon: AlertTriangle, title: 'Emergency Health Card', desc: 'Critical info — blood group, allergies, conditions — available instantly in emergencies.', tone: 'danger' },
  { icon: Languages, title: 'Multilingual Assistant', desc: 'HealthSaathi translates symptoms and instructions between workers and doctors.', tone: 'secondary' },
  { icon: Stethoscope, title: 'Digital Prescriptions', desc: 'Every prescription is digitized, stored, and accessible at any future visit.', tone: 'primary' },
  { icon: FlaskConical, title: 'Lab Reports', desc: 'Test results stored permanently — no need to carry physical reports between hospitals.', tone: 'secondary' },
  { icon: Syringe, title: 'Vaccination Records', desc: 'Track vaccinations and due dates across districts and health centres.', tone: 'primary' },
  { icon: MapPin, title: 'Portable Healthcare', desc: 'Health information follows the worker wherever they go in Kerala.', tone: 'secondary' },
  { icon: Activity, title: 'Disease Monitoring', desc: 'Anonymized data helps health authorities track communicable disease trends.', tone: 'primary' },
];

const sdgs = [
  { num: '3', title: 'Good Health and Well-being', desc: 'Improves healthcare continuity and access for vulnerable populations.', color: 'bg-success-600' },
  { num: '9', title: 'Industry, Innovation & Infrastructure', desc: 'Creates digital healthcare infrastructure for migrant worker health.', color: 'bg-primary-700' },
  { num: '10', title: 'Reduced Inequalities', desc: 'Supports equitable healthcare access regardless of origin or language.', color: 'bg-secondary-600' },
  { num: '16', title: 'Peace, Justice & Strong Institutions', desc: 'Builds secure digital identity and trusted access to health services.', color: 'bg-ink-700' },
  { num: '17', title: 'Partnerships for the Goals', desc: 'Enables collaboration between hospitals, government agencies, and NGOs.', color: 'bg-accent-600' },
];

const toneMap: Record<string, string> = {
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  danger: 'bg-danger-50 text-danger-700',
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Background — subtle navy gradient with grid */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/60 via-white to-white" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #213f6b 1px, transparent 1px), linear-gradient(to bottom, #213f6b 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <Badge tone="primary" className="mb-5 px-3 py-1 text-xs">
              <HeartPulse className="h-3.5 w-3.5" />
              Aligned with UN Sustainable Development Goals
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Digital Healthcare,
              <br />
              <span className="text-brand-gradient">Wherever You Work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600 leading-relaxed">
              A secure digital health record platform designed to provide migrant workers in Kerala with
              portable healthcare access, multilingual assistance, and continuity of medical care.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/role">
                <Button size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
                  Get Started
                </Button>
              </Link>
              <a href="#demo">
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success-600" /> Secure & Authorized Access</span>
              <span className="flex items-center gap-1.5"><Languages className="h-4 w-4 text-secondary-600" /> English · हिंदी · മലയാളം</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary-600" /> 14 Districts Covered</span>
            </div>
          </div>

          {/* Hero visual — Health ID card mockup */}
          <div className="mx-auto mt-16 max-w-2xl">
            <HeroHealthCard />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="section-y bg-ink-50/50 border-y border-ink-200">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="danger" className="mb-4">The Challenge</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              Healthcare barriers migrant workers face every day
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Kerala hosts over 3.5 million migrant workers. When they move between districts or face a medical
              emergency, critical health information is often out of reach.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <Card key={p.title} hover padding="md" className="border-ink-200/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-danger-50 text-danger-600">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / How it works */}
      <section id="demo" className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="secondary" className="mb-4">The Solution</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              One Health ID. Continuous care across Kerala.
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Register once, carry your health record everywhere. Authorized providers access what they need,
              when they need it.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step, i) => (
              <div key={step.step} className="relative">
                <Card padding="lg" className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-primary-200">{step.step}</span>
                    <div className="h-px flex-1 bg-ink-200" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
                </Card>
                {i < workflow.length - 1 && i % 3 !== 2 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ink-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-y bg-primary-950 text-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="secondary" className="mb-4 bg-white/10 text-secondary-200 border-white/20">
              Platform Features
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Built for real healthcare delivery
            </h2>
            <p className="mt-4 text-lg text-primary-200">
              Every feature is designed around how migrant workers and healthcare providers actually interact.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneMap[f.tone]}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-primary-200">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section id="sdg" className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="success" className="mb-4">UN Sustainable Development Goals</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              Advancing global goals, locally
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              SetuHealth contributes directly to five UN Sustainable Development Goals by improving health
              access, building infrastructure, and reducing inequality.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sdgs.map((sdg) => (
              <Card key={sdg.num} hover padding="lg" className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${sdg.color} text-white shadow-sm`}>
                    <span className="text-xl font-extrabold">{sdg.num}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">SDG {sdg.num}</p>
                    <h3 className="text-sm font-bold text-ink-900 leading-snug">{sdg.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{sdg.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Experience the demo
            </h2>
            <p className="mt-4 text-lg text-primary-200">
              Walk through the complete journey — from worker registration to cross-district care, multilingual
              assistance, and health authority analytics.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/role">
                <Button size="lg" variant="secondary" iconRight={<ArrowRight className="h-5 w-5" />}>
                  Launch Demo
                </Button>
              </Link>
              <a href="#problem">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-200 bg-ink-50">
        <div className="container-page py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <img src={nameImage} alt="SetuHealth" className="h-6 w-auto" />
              </div>
              <p className="mt-4 max-w-md text-sm text-ink-600 leading-relaxed">
                A digital health record management system for migrant workers in Kerala, aligned with the UN
                Sustainable Development Goals. Prototype built for Smart India Hackathon.
              </p>
              <Badge tone="warning" className="mt-4">SIH Prototype · Demo Data</Badge>
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink-900">Platform</h4>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li><a href="#problem" className="hover:text-primary-700">The Problem</a></li>
                <li><a href="#solution" className="hover:text-primary-700">Solution</a></li>
                <li><a href="#features" className="hover:text-primary-700">Features</a></li>
                <li><a href="#sdg" className="hover:text-primary-700">SDG Impact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink-900">Get Started</h4>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li><Link to="/role" className="hover:text-primary-700">Choose Role</Link></li>
                <li><Link to="/worker" className="hover:text-primary-700">Worker Portal</Link></li>
                <li><Link to="/doctor" className="hover:text-primary-700">Doctor Portal</Link></li>
                <li><Link to="/admin" className="hover:text-primary-700">Admin Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-ink-200 pt-6">
            <p className="text-xs text-ink-400">
              © 2026 SetuHealth · SIH Prototype · All data shown is fictional demo data.
            </p>
            <div className="flex items-center gap-2 text-xs text-ink-400">
              <Users className="h-4 w-4" />
              <span>Built for migrant worker healthcare in Kerala</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Hero visual — a mock Health ID card
function HeroHealthCard() {
  return (
    <div className="relative mx-auto max-w-md animate-slide-up">
      {/* Glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary-200/40 to-secondary-200/40 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card-lg">
        {/* Card header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary-800 to-primary-700 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <img src={nameImage} alt="SetuHealth" className="h-5 w-auto" />
          </div>
          <Badge tone="success" className="bg-white/15 text-white border-white/20">Active</Badge>
        </div>
        {/* Card body */}
        <div className="flex gap-5 p-6">
          <div className="flex flex-col items-center">
            {/* Faux QR */}
            <div className="grid h-28 w-28 grid-cols-8 gap-0.5 rounded-lg border-2 border-ink-200 bg-white p-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${
                    [0,1,2,5,6,7,8,15,16,18,21,22,24,31,32,34,37,38,40,47,48,55,56,58,61,62,63].includes(i) ? 'bg-ink-900' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">Scan QR</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Health ID</p>
            <p className="text-2xl font-extrabold tracking-tight text-primary-700">KER-MW-10245</p>
            <div className="mt-4 space-y-2.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Name</p>
                <p className="text-sm font-bold text-ink-900">Rahim Ali</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Blood</p>
                  <p className="text-sm font-bold text-ink-900">B+</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Allergy</p>
                  <p className="text-sm font-bold text-danger-600">Penicillin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-ink-200 bg-ink-50 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-ink-500">Last updated: 12 Aug 2026</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-success-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified
          </span>
        </div>
      </div>
    </div>
  );
}
