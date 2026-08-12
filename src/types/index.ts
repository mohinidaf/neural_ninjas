export type Role = 'worker' | 'doctor' | 'admin';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type AllergySeverity = 'mild' | 'moderate' | 'severe';

export interface Allergy {
  id: string;
  substance: string;
  severity: AllergySeverity;
  note?: string;
}

export interface ChronicCondition {
  id: string;
  name: string;
  diagnosedDate: string; // ISO
  status: 'active' | 'managed' | 'resolved';
  note?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'discontinued';
  prescribedBy: string;
}

export interface Prescription {
  id: string;
  consultationId?: string;
  date: string;
  doctor: string;
  hospital: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  notes?: string;
}

export interface Consultation {
  id: string;
  date: string;
  hospital: string;
  doctor: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescription?: Prescription;
  followUpDate?: string;
  notes?: string;
}

export interface LabReport {
  id: string;
  testName: string;
  date: string;
  hospital: string;
  status: 'completed' | 'pending' | 'cancelled';
  result?: string;
  normalRange?: string;
  documentUrl?: string;
}

export interface Vaccination {
  id: string;
  vaccine: string;
  date: string;
  dose: string;
  nextDueDate?: string;
  status: 'completed' | 'pending' | 'overdue';
  hospital: string;
}

export interface MedicalDocument {
  id: string;
  title: string;
  type: 'prescription' | 'lab_report' | 'discharge_summary' | 'vaccination_certificate';
  date: string;
  hospital: string;
  url?: string;
}

export interface Patient {
  id: string;
  healthId: string; // KER-MW-XXXXX
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  nativeState: string;
  currentDistrict: string;
  bloodGroup: BloodGroup;
  photoUrl?: string;
  registrationDate: string;
  lastUpdated: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: Allergy[];
  chronicConditions: ChronicCondition[];
  medications: Medication[];
  consultations: Consultation[];
  labReports: LabReport[];
  vaccinations: Vaccination[];
  documents: MedicalDocument[];
  insurance?: {
    provider: string;
    policyNumber: string;
    status: 'active' | 'inactive';
  };
}

export interface DistrictCase {
  id: string;
  district: string;
  disease: string;
  cases: number;
  dateRange: string;
  trend: 'up' | 'down' | 'stable';
  alertStatus: 'normal' | 'monitoring' | 'alert';
}

export interface AdminStats {
  totalWorkers: number;
  activeRecords: number;
  totalConsultations: number;
  vaccinationCoverage: number; // percentage
  diseaseCases: number;
  districtsCovered: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  lang: string;
}

export type ChatLang = 'en' | 'hi' | 'ml';

export interface ChatQuickAction {
  id: string;
  label: string;
  icon: string; // lucide icon name
}

export interface DoctorProfileData {
  fullName: string;
  license: string;
  specialization: string;
  hospitalName: string;
  yearsExperience: number;
  phone: string;
  email: string;
  isComplete: boolean;
}

export interface ActivityLogEntry {
  id: string;
  type: 'profile_completed' | 'qr_scanned' | 'patient_accessed' | 'consultation_added' | 'prescription_created';
  description: string;
  timestamp: string;
  healthId?: string;
}
