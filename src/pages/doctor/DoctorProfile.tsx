import { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Building2, Briefcase, BadgeCheck,
  Save, CheckCircle,
} from 'lucide-react';
import { DashboardLayout, PageHeader } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDoctor } from '@/contexts/DoctorContext';
import type { DoctorProfileData } from '@/types';

export function DoctorProfile() {
  const { profile, updateProfile, isProfileComplete } = useDoctor();
  const [form, setForm] = useState<DoctorProfileData>({ ...profile });
  const [saved, setSaved] = useState(false);

  const completedFields = [form.fullName, form.license, form.specialization, form.hospitalName].filter(Boolean).length;
  const completionPercent = Math.round((completedFields / 4) * 100);

  const handleSave = () => {
    updateProfile({ ...form, isComplete: completedFields >= 4 });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fieldProps = (key: keyof DoctorProfileData, label: string, icon: React.ReactNode, type: string = 'text') => (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-ink-400 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">{icon}</span>
        <input
          type={type}
          value={(form[key] as string | number) ?? ''}
          onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
          className="w-full rounded-lg border border-ink-300 pl-10 pr-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
    </div>
  );

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        title="Doctor Profile"
        subtitle="Complete your profile to access patient records"
        action={
          saved
            ? <Button disabled icon={<CheckCircle className="h-4 w-4" />}>Saved!</Button>
            : <Button onClick={handleSave} icon={<Save className="h-4 w-4" />}>Save Profile</Button>
        }
      />

      {/* Progress bar */}
      <Card padding="md" className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-ink-900">Profile Completion</span>
          <span className={`text-sm font-bold ${completionPercent === 100 ? 'text-success-600' : 'text-warning-600'}`}>{completionPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink-100 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${completionPercent === 100 ? 'bg-success-500' : 'bg-warning-500'}`} style={{ width: `${completionPercent}%` }} />
        </div>
        {completionPercent === 100 && <p className="mt-2 text-xs text-success-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Your profile is complete. You can now scan patient QR codes.</p>}
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding="lg" className="lg:col-span-2">
          <h3 className="text-lg font-bold text-ink-900 mb-4">Professional Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldProps('fullName', 'Full Name', <User className="h-4 w-4" />)}
            {fieldProps('license', 'Medical License No.', <BadgeCheck className="h-4 w-4" />)}
            {fieldProps('specialization', 'Specialization', <Briefcase className="h-4 w-4" />)}
            {fieldProps('hospitalName', 'Hospital / Clinic', <Building2 className="h-4 w-4" />)}
            {fieldProps('yearsExperience', 'Years of Experience', <Briefcase className="h-4 w-4" />, 'number')}
          </div>

          <h3 className="text-lg font-bold text-ink-900 mt-6 mb-4">Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {fieldProps('phone', 'Phone', <Phone className="h-4 w-4" />)}
            {fieldProps('email', 'Email', <Mail className="h-4 w-4" />)}
            {fieldProps('district', 'District', <MapPin className="h-4 w-4" />)}
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="text-lg font-bold text-ink-900 mb-4">Your Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Name</p>
              <p className="text-sm font-semibold text-ink-900">{form.fullName || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">License</p>
              <p className="text-sm font-semibold text-ink-900">{form.license || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Specialization</p>
              <p className="text-sm font-semibold text-ink-900">{form.specialization || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Hospital</p>
              <p className="text-sm font-semibold text-ink-900">{form.hospitalName || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Phone</p>
              <p className="text-sm font-semibold text-ink-900">{form.phone || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Email</p>
              <p className="text-sm font-semibold text-ink-900">{form.email || '—'}</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
