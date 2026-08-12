import { useState } from 'react';
import { Stethoscope, Plus, Trash2 } from 'lucide-react';
import { Input, Select, Textarea } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import type { Consultation } from '@/types';

interface AddConsultationFormProps {
  patientName: string;
  onSave: (data: Omit<Consultation, 'id'>) => void;
  onCancel: () => void;
}

export function AddConsultationForm({ patientName, onSave, onCancel }: AddConsultationFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    date: today,
    hospital: 'Government Health Centre, Ernakulam',
    doctor: 'Dr. Anjali Menon',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    followUpDate: '',
    notes: '',
  });
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = 'Date is required';
    if (!form.symptoms.trim()) e.symptoms = 'Symptoms are required';
    if (!form.diagnosis.trim()) e.diagnosis = 'Diagnosis is required';
    if (!form.hospital.trim()) e.hospital = 'Hospital is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const hasMeds = medicines.some(m => m.name.trim());
    onSave({
      ...form,
      followUpDate: form.followUpDate || undefined,
      prescription: hasMeds ? {
        id: `rx-${Date.now()}`,
        date: form.date,
        doctor: form.doctor,
        hospital: form.hospital,
        medicines: medicines.filter(m => m.name.trim()),
      } : undefined,
    });
  };

  return (
    <div className="space-y-4">
      {/* Patient + Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Patient" value={patientName} disabled />
        <Input
          label="Consultation Date"
          type="date"
          value={form.date}
          onChange={(e) => update('date', e.target.value)}
          error={errors.date}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Doctor"
          value={form.doctor}
          onChange={(e) => update('doctor', e.target.value)}
        />
        <Input
          label="Hospital / Clinic"
          value={form.hospital}
          onChange={(e) => update('hospital', e.target.value)}
          error={errors.hospital}
        />
      </div>

      <Textarea
        label="Symptoms"
        placeholder="Describe patient symptoms…"
        rows={3}
        value={form.symptoms}
        onChange={(e) => update('symptoms', e.target.value)}
        error={errors.symptoms}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Diagnosis"
          placeholder="Primary diagnosis…"
          value={form.diagnosis}
          onChange={(e) => update('diagnosis', e.target.value)}
          error={errors.diagnosis}
        />
        <Input
          label="Follow-up Date"
          type="date"
          value={form.followUpDate}
          onChange={(e) => update('followUpDate', e.target.value)}
        />
      </div>

      <Textarea
        label="Treatment Plan"
        placeholder="Treatment, advice, recommendations…"
        rows={2}
        value={form.treatment}
        onChange={(e) => update('treatment', e.target.value)}
      />

      {/* Prescription medicines */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-ink-800">Prescription Medicines</label>
          <button
            onClick={() => setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }])}
            className="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Medicine
          </button>
        </div>
        <div className="space-y-3">
          {medicines.map((med, i) => (
            <div key={i} className="rounded-lg border border-ink-200 bg-ink-50/50 p-3">
              <div className="grid gap-2 sm:grid-cols-4">
                <input
                  placeholder="Medicine name"
                  value={med.name}
                  onChange={(e) => setMedicines(medicines.map((m, j) => j === i ? { ...m, name: e.target.value } : m))}
                  className="rounded-lg border border-ink-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                <input
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => setMedicines(medicines.map((m, j) => j === i ? { ...m, dosage: e.target.value } : m))}
                  className="rounded-lg border border-ink-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                <input
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) => setMedicines(medicines.map((m, j) => j === i ? { ...m, frequency: e.target.value } : m))}
                  className="rounded-lg border border-ink-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => setMedicines(medicines.map((m, j) => j === i ? { ...m, duration: e.target.value } : m))}
                    className="flex-1 rounded-lg border border-ink-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  />
                  {medicines.length > 1 && (
                    <button
                      onClick={() => setMedicines(medicines.filter((_, j) => j !== i))}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-danger-600 hover:bg-danger-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Textarea
        label="Notes"
        placeholder="Additional notes, precautions…"
        rows={2}
        value={form.notes}
        onChange={(e) => update('notes', e.target.value)}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} icon={<Stethoscope className="h-4 w-4" />}>Save Consultation</Button>
      </div>
    </div>
  );
}
