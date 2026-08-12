import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Calendar, Phone, MapPin, HeartPulse, AlertTriangle, ShieldCheck,
  Stethoscope, Pill, Syringe, Plus, Trash2, CheckCircle2, Sparkles, AlertCircle,
  FileCheck2, ArrowRight, Lock
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useWorkerProfile } from '@/contexts/WorkerProfileContext';
import { QRCodeGeneratorModal } from '@/components/QRCodeGeneratorModal';
import type { BloodGroup, AllergySeverity } from '@/types';

const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const keralaDistricts = [
  'Ernakulam', 'Kozhikode', 'Thiruvananthapuram', 'Malappuram', 'Thrissur',
  'Kannur', 'Kollam', 'Alappuzha', 'Kottayam', 'Palakkad', 'Idukki',
  'Pathanamthitta', 'Wayanad', 'Kasaragod'
];

const nativeStates = [
  'West Bengal', 'Assam', 'Bihar', 'Jharkhand', 'Uttar Pradesh',
  'Odisha', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 'Madhya Pradesh', 'Other'
];

export function CompleteProfilePage() {
  const navigate = useNavigate();
  const {
    profile,
    updateProfile,
    progressPercent,
    completeProfileAndGenerateQR,
    fillDemoData,
    isProfileComplete
  } = useWorkerProfile();

  const [showQRModal, setShowQRModal] = useState(false);
  const [newAllergy, setNewAllergy] = useState({ substance: '', severity: 'mild' as AllergySeverity });
  const [newCondition, setNewCondition] = useState({ name: '', date: '' });
  const [newSurgery, setNewSurgery] = useState({ name: '', year: '', hospital: '' });
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '' });
  const [newVaccine, setNewVaccine] = useState({ vaccine: '', dose: '', date: '' });

  // Handle Form Inputs
  const handleInputChange = (field: string, value: any) => {
    updateProfile({ [field]: value });
  };

  const handleEmergencyChange = (field: string, value: string) => {
    updateProfile({
      emergencyContact: {
        name: profile.emergencyContact?.name || '',
        relationship: profile.emergencyContact?.relationship || '',
        phone: profile.emergencyContact?.phone || '',
        [field]: value,
      },
    });
  };

  const handleInsuranceChange = (field: string, value: string) => {
    updateProfile({
      insurance: {
        provider: profile.insurance?.provider || '',
        policyNumber: profile.insurance?.policyNumber || '',
        status: profile.insurance?.status || 'active',
        [field]: value,
      },
    });
  };

  // Add Item Handlers
  const addAllergy = () => {
    if (!newAllergy.substance.trim()) return;
    const item = {
      id: `a-${Date.now()}`,
      substance: newAllergy.substance.trim(),
      severity: newAllergy.severity,
    };
    updateProfile({ allergies: [...(profile.allergies || []), item] });
    setNewAllergy({ substance: '', severity: 'mild' });
  };

  const removeAllergy = (id: string) => {
    updateProfile({ allergies: (profile.allergies || []).filter((a) => a.id !== id) });
  };

  const addCondition = () => {
    if (!newCondition.name.trim()) return;
    const item = {
      id: `c-${Date.now()}`,
      name: newCondition.name.trim(),
      diagnosedDate: newCondition.date || new Date().toISOString().split('T')[0],
      status: 'managed' as const,
    };
    updateProfile({ chronicConditions: [...(profile.chronicConditions || []), item] });
    setNewCondition({ name: '', date: '' });
  };

  const removeCondition = (id: string) => {
    updateProfile({ chronicConditions: (profile.chronicConditions || []).filter((c) => c.id !== id) });
  };

  const addSurgery = () => {
    if (!newSurgery.name.trim()) return;
    const item = {
      id: `s-${Date.now()}`,
      name: newSurgery.name.trim(),
      year: newSurgery.year || '2023',
      hospital: newSurgery.hospital || 'District Hospital',
    };
    updateProfile({ surgeries: [...(profile.surgeries || []), item] });
    setNewSurgery({ name: '', year: '', hospital: '' });
  };

  const removeSurgery = (id: string) => {
    updateProfile({ surgeries: (profile.surgeries || []).filter((s) => s.id !== id) });
  };

  const addMedication = () => {
    if (!newMedication.name.trim()) return;
    const item = {
      id: `m-${Date.now()}`,
      name: newMedication.name.trim(),
      dosage: newMedication.dosage || '500mg',
      frequency: newMedication.frequency || 'Once daily',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      prescribedBy: 'Self Reported',
    };
    updateProfile({ medications: [...(profile.medications || []), item] });
    setNewMedication({ name: '', dosage: '', frequency: '' });
  };

  const removeMedication = (id: string) => {
    updateProfile({ medications: (profile.medications || []).filter((m) => m.id !== id) });
  };

  const addVaccine = () => {
    if (!newVaccine.vaccine.trim()) return;
    const item = {
      id: `v-${Date.now()}`,
      vaccine: newVaccine.vaccine.trim(),
      dose: newVaccine.dose || 'Dose 1',
      date: newVaccine.date || new Date().toISOString().split('T')[0],
      status: 'completed' as const,
      hospital: 'Health Centre',
    };
    updateProfile({ vaccinations: [...(profile.vaccinations || []), item] });
    setNewVaccine({ vaccine: '', dose: '', date: '' });
  };

  const removeVaccine = (id: string) => {
    updateProfile({ vaccinations: (profile.vaccinations || []).filter((v) => v.id !== id) });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.name.trim()) {
      alert('Please fill out your Full Name.');
      return;
    }
    if (!profile.phone || !profile.phone.trim()) {
      alert('Please fill out your Mobile Phone Number.');
      return;
    }

    // Default DOB / Age calculation if not explicitly set
    const dobVal = profile.dob || '1994-05-12';
    const computedAge = profile.age || (new Date().getFullYear() - new Date(dobVal).getFullYear());

    completeProfileAndGenerateQR({
      dob: dobVal,
      age: computedAge > 0 ? computedAge : 30,
      gender: profile.gender || 'Male',
      bloodGroup: profile.bloodGroup || 'O+',
    });

    setShowQRModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Banner / Navigation */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-700 text-white shadow-md">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">SetuHealth Profile Setup</h1>
            <p className="text-xs text-slate-500">Digital Health Record Management for Migrant Workers</p>
          </div>
        </div>

        <button
          type="button"
          onClick={fillDemoData}
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary-300 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-100 transition-colors shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary-600" /> Auto-fill Demo Profile
        </button>
      </div>

      {/* Profile Lock Banner */}
      {!isProfileComplete && (
        <div className="max-w-4xl mx-auto mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-100 p-2 text-amber-800 mt-0.5">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">Dashboard & Health Features Locked</h3>
              <p className="text-xs text-amber-700 mt-0.5">
                You must complete your health profile to generate your unique Health ID & QR code. Dashboard features remain disabled until saved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Progress Bar Card */}
      <div className="max-w-4xl mx-auto sticky top-4 z-30 mb-8 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-bold text-slate-900">Profile Completion Status</span>
          </div>
          <span className="text-sm font-extrabold text-primary-700">{progressPercent}% Completed</span>
        </div>

        <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-600 via-sky-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>{progressPercent < 100 ? 'Fill required personal & health details' : 'All steps completed!'}</span>
          <span className="font-semibold text-emerald-600">
            {progressPercent === 100 ? 'Ready for QR Generation' : `${100 - progressPercent}% remaining`}
          </span>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="max-w-4xl mx-auto space-y-6">

        {/* 1. Basic Personal Information */}
        <Card padding="md" className="shadow-md">
          <CardHeader title="1. Basic Personal Information" icon={<User className="h-5 w-5 text-primary-600" />} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Rahim Ali"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={profile.dob || '1994-05-12'}
                onChange={(e) => {
                  const dobVal = e.target.value;
                  const birthYear = new Date(dobVal).getFullYear();
                  const currentYear = new Date().getFullYear();
                  const computedAge = currentYear - birthYear;
                  updateProfile({ dob: dobVal, age: computedAge > 0 ? computedAge : 30 });
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={profile.gender || 'Male'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
        </Card>

        {/* 2. Address & Migration Details */}
        <Card padding="md" className="shadow-md">
          <CardHeader title="2. Address & Migration Details" icon={<MapPin className="h-5 w-5 text-primary-600" />} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Current Residence Address in Kerala
              </label>
              <input
                type="text"
                value={profile.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="e.g. Near Bus Stand, Aluva, Ernakulam"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Native Home State
              </label>
              <select
                value={profile.nativeState || ''}
                onChange={(e) => handleInputChange('nativeState', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">Select State</option>
                {nativeStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Current Kerala Work District
              </label>
              <select
                value={profile.currentDistrict || ''}
                onChange={(e) => handleInputChange('currentDistrict', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">Select District</option>
                {keralaDistricts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* 3. Emergency Contact */}
        <Card padding="md" className="shadow-md border-red-100 bg-red-50/20">
          <CardHeader title="3. Emergency Contact Details" icon={<Phone className="h-5 w-5 text-red-600" />} />
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                value={profile.emergencyContact?.name || ''}
                onChange={(e) => handleEmergencyChange('name', e.target.value)}
                placeholder="e.g. Saira Banu"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={profile.emergencyContact?.relationship || ''}
                onChange={(e) => handleEmergencyChange('relationship', e.target.value)}
                placeholder="Spouse / Sibling / Friend"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.emergencyContact?.phone || ''}
                onChange={(e) => handleEmergencyChange('phone', e.target.value)}
                placeholder="+91 98765 11122"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
        </Card>

        {/* 4. Blood Group & Allergies */}
        <Card padding="md" className="shadow-md">
          <CardHeader title="4. Blood Group & Known Allergies" icon={<AlertTriangle className="h-5 w-5 text-amber-600" />} />
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => handleInputChange('bloodGroup', bg)}
                    className={`py-2.5 rounded-lg font-bold text-sm border transition-all ${
                      profile.bloodGroup === bg
                        ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-red-300'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies list */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Known Allergies
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(profile.allergies || []).map((a) => (
                  <span
                    key={a.id}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200"
                  >
                    {a.substance} ({a.severity})
                    <button type="button" onClick={() => removeAllergy(a.id)} className="text-amber-600 hover:text-amber-900">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                {(!profile.allergies || profile.allergies.length === 0) && (
                  <span className="text-xs text-slate-400 italic">No allergies added yet.</span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllergy.substance}
                  onChange={(e) => setNewAllergy((prev) => ({ ...prev, substance: e.target.value }))}
                  placeholder="e.g. Penicillin, Dust Mites"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <select
                  value={newAllergy.severity}
                  onChange={(e) => setNewAllergy((prev) => ({ ...prev, severity: e.target.value as AllergySeverity }))}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
                <button
                  type="button"
                  onClick={addAllergy}
                  className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* 5. Existing Diseases & Surgeries */}
        <Card padding="md" className="shadow-md">
          <CardHeader title="5. Existing Diseases & Previous Surgeries" icon={<Stethoscope className="h-5 w-5 text-primary-600" />} />
          <div className="grid gap-6 sm:grid-cols-2">

            {/* Chronic Conditions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Existing Diseases / Conditions
              </label>
              <div className="space-y-2 mb-3">
                {(profile.chronicConditions || []).map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg bg-slate-100 p-2.5 text-xs">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <button type="button" onClick={() => removeCondition(c.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCondition.name}
                  onChange={(e) => setNewCondition((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Asthma, Diabetes, BP"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={addCondition}
                  className="rounded-lg bg-primary-700 px-3 py-2 text-xs font-bold text-white hover:bg-primary-800"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Surgeries */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Previous Surgeries
              </label>
              <div className="space-y-2 mb-3">
                {(profile.surgeries || []).map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg bg-slate-100 p-2.5 text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <p className="text-[10px] text-slate-500">{s.year} · {s.hospital}</p>
                    </div>
                    <button type="button" onClick={() => removeSurgery(s.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSurgery.name}
                  onChange={(e) => setNewSurgery((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Appendectomy"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={newSurgery.year}
                  onChange={(e) => setNewSurgery((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="Year (2021)"
                  className="w-24 rounded-lg border border-slate-300 px-2 py-2 text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={addSurgery}
                  className="rounded-lg bg-primary-700 px-3 py-2 text-xs font-bold text-white hover:bg-primary-800"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* 6. Current Medications & Vaccination History */}
        <Card padding="md" className="shadow-md">
          <CardHeader title="6. Current Medications & Vaccinations" icon={<Pill className="h-5 w-5 text-primary-600" />} />
          <div className="grid gap-6 sm:grid-cols-2">

            {/* Medications */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Current Medications
              </label>
              <div className="space-y-2 mb-3">
                {(profile.medications || []).map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-lg bg-sky-50 p-2.5 text-xs border border-sky-100">
                    <div>
                      <p className="font-bold text-sky-900">{m.name} ({m.dosage})</p>
                      <p className="text-[10px] text-sky-600">{m.frequency}</p>
                    </div>
                    <button type="button" onClick={() => removeMedication(m.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Medication name"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                  placeholder="Dosage (500mg)"
                  className="w-28 rounded-lg border border-slate-300 px-2 py-2 text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={addMedication}
                  className="rounded-lg bg-sky-700 px-3 py-2 text-xs font-bold text-white hover:bg-sky-800"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Vaccinations */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Vaccination History
              </label>
              <div className="space-y-2 mb-3">
                {(profile.vaccinations || []).map((v) => (
                  <div key={v.id} className="flex items-center justify-between rounded-lg bg-emerald-50 p-2.5 text-xs border border-emerald-100">
                    <div>
                      <p className="font-bold text-emerald-900">{v.vaccine}</p>
                      <p className="text-[10px] text-emerald-600">{v.dose} · {v.date}</p>
                    </div>
                    <button type="button" onClick={() => removeVaccine(v.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newVaccine.vaccine}
                  onChange={(e) => setNewVaccine((prev) => ({ ...prev, vaccine: e.target.value }))}
                  placeholder="Vaccine (Tetanus/COVID)"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={addVaccine}
                  className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* 7. Insurance Details (Optional) */}
        <Card padding="md" className="shadow-md">
          <CardHeader title="7. Health Insurance Details (Optional)" icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Insurance Provider / Scheme
              </label>
              <input
                type="text"
                value={profile.insurance?.provider || ''}
                onChange={(e) => handleInsuranceChange('provider', e.target.value)}
                placeholder="e.g. Karunya Health Insurance"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Policy / Card Number
              </label>
              <input
                type="text"
                value={profile.insurance?.policyNumber || ''}
                onChange={(e) => handleInsuranceChange('policyNumber', e.target.value)}
                placeholder="e.g. KHS-2026-88412"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
        </Card>

        {/* Submit & Generate QR Action Bar */}
        <div className="sticky bottom-4 z-20 rounded-2xl bg-white/95 p-4 shadow-xl border border-slate-200 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">All information is encrypted and securely stored.</p>
            <p className="text-sm font-bold text-slate-900">{progressPercent}% Profile Complete</p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-primary-700 to-emerald-600 hover:from-primary-800 hover:to-emerald-700 text-white font-bold px-8 shadow-lg shadow-primary-700/20"
            iconRight={<ArrowRight className="h-5 w-5" />}
          >
            Save Profile & Generate QR Code
          </Button>
        </div>
      </form>

      {/* QR Code Modal Popup */}
      <QRCodeGeneratorModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        onProceedToDashboard={() => {
          setShowQRModal(false);
          navigate('/worker', { replace: true });
        }}
      />
    </div>
  );
}
