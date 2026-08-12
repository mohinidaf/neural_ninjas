<<<<<<< HEAD
export type Role = 'worker' | 'doctor' | 'admin' | 'hospital';
=======
export type Role = 'worker' | 'doctor' | 'admin';
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48

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
<<<<<<< HEAD

// Auth & Profile Types
export type AccountStatus = 'active' | 'pending' | 'suspended' | 'rejected';

export interface UserProfile {
  id: string;
  user_id: string;
  role: Role;
  full_name: string;
  email: string;
  phone?: string;
  status: AccountStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkerProfile extends UserProfile {
  role: 'worker';
  health_id?: string;
  native_state?: string;
  current_district?: string;
  blood_group?: BloodGroup;
}

export interface DoctorProfile extends UserProfile {
  role: 'doctor';
  medical_license?: string;
  specialization?: string;
  hospital_name?: string;
  hospital_id?: string;
  years_experience?: number;
}

export interface HospitalProfile extends UserProfile {
  role: 'hospital';
  hospital_name: string;
  hospital_address?: string;
  hospital_city?: string;
  hospital_state?: string;
  hospital_phone?: string;
  registration_number?: string;
  admin_name?: string;
}

export interface AdminProfile extends UserProfile {
  role: 'admin';
  organization?: string;
  department?: string;
}

// Auth form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface WorkerRegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
}

export interface DoctorRegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  medical_license: string;
  specialization: string;
  hospital_name: string;
}

export interface HospitalRegisterFormData {
  hospital_name: string;
  official_email: string;
  password: string;
  confirm_password: string;
  hospital_phone: string;
  hospital_address: string;
  hospital_city: string;
  hospital_state: string;
  registration_number: string;
  admin_name: string;
  admin_email: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
=======
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
