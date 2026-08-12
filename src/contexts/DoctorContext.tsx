import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { DoctorProfileData, ActivityLogEntry, Patient, Consultation, Prescription } from '@/types';

interface DoctorContextType {
  profile: DoctorProfileData;
  updateProfile: (data: DoctorProfileData) => void;
  scannedPatientIds: string[];
  addScannedPatient: (patientId: string) => void;
  activityLog: ActivityLogEntry[];
  addActivity: (entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => void;
  localConsultations: Record<string, Consultation[]>;
  addConsultation: (patientId: string, consultation: Consultation) => void;
  localPrescriptions: Record<string, Prescription[]>;
  addPrescription: (patientId: string, prescription: Prescription) => void;
  getPatientById: (id: string) => Patient | undefined;
  isProfileComplete: () => boolean;
}

const defaultProfile: DoctorProfileData = {
  fullName: '',
  license: '',
  specialization: '',
  hospitalName: '',
  yearsExperience: 0,
  phone: '',
  email: '',
  isComplete: false,
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export function useDoctor() {
  const ctx = useContext(DoctorContext);
  if (!ctx) throw new Error('useDoctor must be used within DoctorProvider');
  return ctx;
}

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<DoctorProfileData>(() =>
    loadFromStorage('arogya_doctor_profile', defaultProfile)
  );
  const [scannedPatientIds, setScannedPatientIds] = useState<string[]>(() =>
    loadFromStorage<string[]>('arogya_scanned_patients', [])
  );
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() =>
    loadFromStorage<ActivityLogEntry[]>('arogya_activity_log', [])
  );
  const [localConsultations, setLocalConsultations] = useState<Record<string, Consultation[]>>(() =>
    loadFromStorage<Record<string, Consultation[]>>('arogya_local_consultations', {})
  );
  const [localPrescriptions, setLocalPrescriptions] = useState<Record<string, Prescription[]>>(() =>
    loadFromStorage<Record<string, Prescription[]>>('arogya_local_prescriptions', {})
  );

  useEffect(() => { saveToStorage('arogya_doctor_profile', profile); }, [profile]);
  useEffect(() => { saveToStorage('arogya_scanned_patients', scannedPatientIds); }, [scannedPatientIds]);
  useEffect(() => { saveToStorage('arogya_activity_log', activityLog); }, [activityLog]);
  useEffect(() => { saveToStorage('arogya_local_consultations', localConsultations); }, [localConsultations]);
  useEffect(() => { saveToStorage('arogya_local_prescriptions', localPrescriptions); }, [localPrescriptions]);

  const updateProfile = useCallback((data: DoctorProfileData) => {
    setProfile(data);
  }, []);

  const addScannedPatient = useCallback((patientId: string) => {
    setScannedPatientIds((prev) => {
      if (prev.includes(patientId)) return prev;
      return [...prev, patientId];
    });
  }, []);

  const addActivity = useCallback((entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: ActivityLogEntry = {
      ...entry,
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    setActivityLog((prev) => [newEntry, ...prev].slice(0, 100));
  }, []);

  const addConsultation = useCallback((patientId: string, consultation: Consultation) => {
    setLocalConsultations((prev) => ({
      ...prev,
      [patientId]: [consultation, ...(prev[patientId] || [])],
    }));
  }, []);

  const addPrescription = useCallback((patientId: string, prescription: Prescription) => {
    setLocalPrescriptions((prev) => ({
      ...prev,
      [patientId]: [prescription, ...(prev[patientId] || [])],
    }));
  }, []);

  const getPatientById = useCallback((id: string): Patient | undefined => {
    // This will be called from pages — they should pass demoPatients in
    // But for convenience, we return undefined here and let pages handle it
    return undefined;
  }, []);

  const isProfileComplete = useCallback((): boolean => {
    return profile.isComplete && Boolean(profile.fullName && profile.license && profile.specialization && profile.hospitalName);
  }, [profile]);

  return (
    <DoctorContext.Provider
      value={{
        profile,
        updateProfile,
        scannedPatientIds,
        addScannedPatient,
        activityLog,
        addActivity,
        localConsultations,
        addConsultation,
        localPrescriptions,
        addPrescription,
        getPatientById,
        isProfileComplete,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
