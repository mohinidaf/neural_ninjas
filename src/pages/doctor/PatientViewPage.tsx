import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  User, Droplet, AlertTriangle, Phone, Stethoscope, Pill,
  FlaskConical, Syringe, FileText, Calendar, Plus, ArrowLeft,
  Activity, ShieldCheck, MapPin,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal, useToast } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/Form';
import { EmptyState } from '@/components/ui/Feedback';
import { findPatientByHealthId, demoPatients } from '@/data/demoData';
import type { Consultation } from '@/types';
import { AddConsultationForm } from '@/components/AddConsultationForm';

export function PatientViewPage() {
  const { healthId } = useParams();
  const patient = healthId ? findPatientByHealthId(healthId) : undefined;
  const [tab, setTab] = useState('overview');
  const [showConsult, setShowConsult] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>(patient?.consultations || []);
  const { showToast, toastEl } = useToast();

  if (!patient) {
    return (
      <DashboardLayout role="doctor">
        <EmptyState
          icon={<User className="h-7 w-7" />}
          title="Patient not found"
          message={`No patient record found for Health ID "${healthId}".`}
          action={<Link to="/doctor/scan"><Button>Search Again</Button></Link>}
        />
      </DashboardLayout>
    );
  }

  const handleSaveConsultation = (data: Omit<Consultation, 'id'>) => {
    const newConsult: Consultation = { ...data, id: `cons-${Date.now()}` };
    setConsultations([newConsult, ...consultations]);
    setShowConsult(false);
    showToast('Consultation saved successfully');
    setTab('history');
  };

  return (
    <DashboardLayout role="doctor">
      {/* Back link */}
      <Link to="/doctor/patients" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-primary-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Patients
      </Link>

      {/* Patient Header */}
      <Card padding="md" className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700 shrink-0">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-ink-900">{patient.name}</h1>
              <p className="text-sm text-ink-500">{patient.healthId}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge tone="neutral">{patient.age}y · {patient.gender}</Badge>
                <Badge tone="danger"><Droplet className="h-3 w-3" /> {patient.bloodGroup}</Badge>
                {patient.allergies.map(a => <Badge key={a.id} tone="danger"><AlertTriangle className="h-3 w-3" /> {a.substance}</Badge>)}
                {patient.chronicConditions.map(c => <Badge key={c.id} tone="secondary"><Activity className="h-3 w-3" /> {c.name}</Badge>)}
              </div>
              <p className="mt-2 flex items-center gap-1 text-xs text-ink-500">
                <MapPin className="h-3.5 w-3.5" /> {patient.currentDistrict} · Native: {patient.nativeState}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-1.5 text-xs text-success-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Authorized Access
            </div>
            <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setShowConsult(true)}>
              Add Consultation
            </Button>
          </div>
        </div>
      </Card>

      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
          { id: 'history', label: 'Medical History', icon: <Stethoscope className="h-4 w-4" />, count: consultations.length },
          { id: 'medications', label: 'Medications', icon: <Pill className="h-4 w-4" />, count: patient.medications.length },
          { id: 'labs', label: 'Lab Reports', icon: <FlaskConical className="h-4 w-4" />, count: patient.labReports.length },
          { id: 'vaccinations', label: 'Vaccinations', icon: <Syringe className="h-4 w-4" />, count: patient.vaccinations.length },
          { id: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4" />, count: patient.documents.length },
        ]}
        value={tab}
        onChange={setTab}
        className="mb-6"
      />

      {tab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card padding="md" className="lg:col-span-2">
            <CardHeader title="Personal Information" icon={<User className="h-5 w-5" />} />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Full Name" value={patient.name} />
              <Field label="Age / Gender" value={`${patient.age}y · ${patient.gender}`} />
              <Field label="Phone" value={patient.phone} />
              <Field label="Native State" value={patient.nativeState} />
              <Field label="Current District" value={patient.currentDistrict} />
              <Field label="Registered Since" value={patient.registrationDate} />
            </div>
          </Card>
          <div className="space-y-4">
            <Card padding="md" className="border-danger-200 bg-danger-50/30">
              <CardHeader title="Emergency Contact" icon={<Phone className="h-5 w-5 text-danger-600" />} />
              <p className="text-sm font-bold text-ink-900">{patient.emergencyContact.name}</p>
              <p className="text-sm text-ink-600">{patient.emergencyContact.relationship}</p>
              <p className="mt-1 text-sm font-semibold text-primary-700">{patient.emergencyContact.phone}</p>
            </Card>
            <Card padding="md">
              <CardHeader title="Vitals & Alerts" icon={<Activity className="h-5 w-5" />} />
              <div className="space-y-2.5 text-sm">
                <Row label="Blood Group" value={<span className="text-lg font-extrabold text-danger-700">{patient.bloodGroup}</span>} />
                <Row label="Allergies" value={patient.allergies.length ? patient.allergies.map(a => <Badge key={a.id} tone="danger" className="mr-1">{a.substance}</Badge>) : 'None'} />
                <Row label="Conditions" value={patient.chronicConditions.length ? patient.chronicConditions.map(c => <Badge key={c.id} tone="secondary" className="mr-1">{c.name}</Badge>) : 'None'} />
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-4">
          {consultations.map((c) => (
            <Card key={c.id} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-ink-900">{c.diagnosis}</h3>
                  <StatusBadge status="completed" />
                </div>
                <span className="text-sm text-ink-500">{c.date}</span>
              </div>
              <p className="text-sm text-ink-500 mt-1">{c.hospital} · {c.doctor}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Symptoms</p>
                  <p className="text-sm text-ink-700">{c.symptoms}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Treatment</p>
                  <p className="text-sm text-ink-700">{c.treatment}</p>
                </div>
              </div>
              {c.followUpDate && (
                <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-warning-700">
                  <Calendar className="h-3.5 w-3.5" /> Follow-up: {c.followUpDate}
                </p>
              )}
              {c.prescription && (
                <div className="mt-3 rounded-lg bg-primary-50/50 border border-primary-100 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Prescription</p>
                  <ul className="mt-1.5 space-y-1 text-sm text-ink-700">
                    {c.prescription.medicines.map((m, i) => (
                      <li key={i}>• {m.name} — {m.dosage}, {m.frequency}, {m.duration}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === 'medications' && (
        <div className="space-y-3">
          {patient.medications.map((m) => (
            <Card key={m.id} padding="md" hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{m.name}</h3>
                    <p className="text-xs text-ink-500">{m.dosage} · {m.frequency}</p>
                  </div>
                </div>
                <StatusBadge status={m.status} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div><p className="font-bold uppercase tracking-wider text-ink-400">Start</p><p className="text-ink-700">{m.startDate}</p></div>
                <div><p className="font-bold uppercase tracking-wider text-ink-400">End</p><p className="text-ink-700">{m.endDate || 'Ongoing'}</p></div>
                <div><p className="font-bold uppercase tracking-wider text-ink-400">By</p><p className="text-ink-700">{m.prescribedBy}</p></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'labs' && (
        <div className="space-y-3">
          {patient.labReports.map((l) => (
            <Card key={l.id} padding="md" hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50 text-secondary-700">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{l.testName}</h3>
                    <p className="text-xs text-ink-500">{l.date} · {l.hospital}</p>
                  </div>
                </div>
                <StatusBadge status={l.status} />
              </div>
              {l.result && (
                <div className="mt-3 rounded-lg bg-ink-50 p-3 text-sm">
                  <p className="font-bold text-ink-900">{l.result}</p>
                  {l.normalRange && <p className="text-xs text-ink-500 mt-0.5">Normal range: {l.normalRange}</p>}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === 'vaccinations' && (
        <div className="space-y-3">
          {patient.vaccinations.map((v) => (
            <Card key={v.id} padding="md" hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-700">
                    <Syringe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{v.vaccine}</h3>
                    <p className="text-xs text-ink-500">{v.dose} · {v.date}</p>
                  </div>
                </div>
                <StatusBadge status={v.status} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div><p className="font-bold uppercase tracking-wider text-ink-400">Hospital</p><p className="text-ink-700">{v.hospital}</p></div>
                <div><p className="font-bold uppercase tracking-wider text-ink-400">Next Due</p><p className="text-ink-700">{v.nextDueDate || '—'}</p></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'documents' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {patient.documents.map((d) => (
            <Card key={d.id} padding="md" hover>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-ink-900 truncate">{d.title}</h3>
                  <p className="text-xs text-ink-500 mt-0.5">{d.date} · {d.hospital}</p>
                  <Badge tone="neutral" className="mt-2">{d.type.replace(/_/g, ' ')}</Badge>
                </div>
                <button className="text-xs font-semibold text-primary-700 hover:underline shrink-0">View</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Consultation Modal */}
      <Modal
        open={showConsult}
        onClose={() => setShowConsult(false)}
        title="Add New Consultation"
        subtitle={`Patient: ${patient.name} · ${patient.healthId}`}
        size="lg"
      >
        <AddConsultationForm
          patientName={patient.name}
          onSave={handleSaveConsultation}
          onCancel={() => setShowConsult(false)}
        />
      </Modal>

      {toastEl}
    </DashboardLayout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{label}</p>
      <p className="mt-0.5 font-semibold text-ink-900">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-ink-600">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
