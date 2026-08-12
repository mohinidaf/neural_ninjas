import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Patient, BloodGroup, Allergy, ChronicCondition, Medication, Vaccination } from '@/types';
import { primaryPatient, demoPatients } from '@/data/demoData';

export interface SurgeryRecord {
  id: string;
  name: string;
  year: string;
  hospital: string;
}

export interface WorkerProfileData {
  healthId: string;
  name: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  nativeState: string;
  currentDistrict: string;
  phone: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodGroup: BloodGroup;
  allergies: Allergy[];
  chronicConditions: ChronicCondition[];
  surgeries: SurgeryRecord[];
  medications: Medication[];
  vaccinations: Vaccination[];
  insurance?: {
    provider: string;
    policyNumber: string;
    status: 'active' | 'inactive';
  };
}

interface WorkerProfileContextType {
  profile: WorkerProfileData;
  isProfileComplete: boolean;
  progressPercent: number;
  qrPayload: string;
  updateProfile: (updates: Partial<WorkerProfileData>) => void;
  completeProfileAndGenerateQR: (updates?: Partial<WorkerProfileData>) => void;
  fillDemoData: () => void;
  resetProfile: () => void;
  patientView: Patient;
}

const STORAGE_KEY_PROFILE = 'setu_health_worker_profile';
const STORAGE_KEY_COMPLETE = 'setu_health_worker_profile_complete';

const defaultEmptyProfile: WorkerProfileData = {
  healthId: '',
  name: '',
  dob: '',
  age: 0,
  gender: 'Male',
  address: '',
  nativeState: '',
  currentDistrict: '',
  phone: '',
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
  bloodGroup: 'O+',
  allergies: [],
  chronicConditions: [],
  surgeries: [],
  medications: [],
  vaccinations: [],
  insurance: {
    provider: '',
    policyNumber: '',
    status: 'inactive',
  },
};

const WorkerProfileContext = createContext<WorkerProfileContextType | undefined>(undefined);

export function calculateProfileProgress(profile: WorkerProfileData): number {
  const fields = [
    Boolean(profile.name && profile.name.trim()),
    Boolean(profile.dob || profile.age > 0),
    Boolean(profile.gender),
    Boolean((profile.address && profile.address.trim()) || (profile.nativeState && profile.nativeState.trim())),
    Boolean(profile.phone && profile.phone.trim()),
    Boolean(profile.emergencyContact && profile.emergencyContact.name && profile.emergencyContact.name.trim()),
    Boolean(profile.bloodGroup),
    profile.allergies.length > 0 || (profile as any).allergiesNone === true,
    profile.chronicConditions.length > 0 || (profile as any).conditionsNone === true,
    profile.surgeries.length > 0 || (profile as any).surgeriesNone === true,
    profile.medications.length > 0 || (profile as any).medicationsNone === true,
    profile.vaccinations.length > 0 || (profile as any).vaccinationsNone === true,
  ];

  const filled = fields.filter(Boolean).length;
  return Math.min(100, Math.round((filled / fields.length) * 100));
}

// Sync global demoPatients data so doctor scan views also see the updated profile
function syncGlobalDemoPatient(p: WorkerProfileData) {
  if (!p.name) return;
  primaryPatient.name = p.name;
  primaryPatient.phone = p.phone;
  primaryPatient.bloodGroup = p.bloodGroup;
  primaryPatient.age = p.age || 30;
  primaryPatient.gender = p.gender;
  primaryPatient.nativeState = p.nativeState;
  primaryPatient.currentDistrict = p.currentDistrict;
  primaryPatient.emergencyContact = p.emergencyContact;
  primaryPatient.allergies = p.allergies;
  primaryPatient.chronicConditions = p.chronicConditions;
  primaryPatient.medications = p.medications;
  primaryPatient.vaccinations = p.vaccinations;
  if (p.healthId) primaryPatient.healthId = p.healthId;
  if (p.insurance) primaryPatient.insurance = p.insurance;
}

export function WorkerProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<WorkerProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        syncGlobalDemoPatient(parsed);
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultEmptyProfile;
  });

  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_COMPLETE) === 'true';
    } catch (e) {
      return false;
    }
  });

  const progressPercent = calculateProfileProgress(profile);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEY_COMPLETE, String(isProfileComplete));
      syncGlobalDemoPatient(profile);
    } catch (e) {
      console.error(e);
    }
  }, [profile, isProfileComplete]);

  const updateProfile = (updates: Partial<WorkerProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      syncGlobalDemoPatient(next);
      return next;
    });
  };

  const completeProfileAndGenerateQR = (updates?: Partial<WorkerProfileData>) => {
    const current = { ...profile, ...updates };
    const generatedHealthId = current.healthId || `KER-MW-${Math.floor(10000 + Math.random() * 90000)}`;
    const updated = {
      ...current,
      healthId: generatedHealthId,
    };
    setProfile(updated);
    setIsProfileComplete(true);
    syncGlobalDemoPatient(updated);
  };

  const fillDemoData = () => {
    const demo: WorkerProfileData = {
      healthId: 'KER-MW-10245',
      name: primaryPatient.name,
      dob: '1994-05-12',
      age: primaryPatient.age,
      gender: primaryPatient.gender as any,
      address: 'Near KSRTC Bus Stand, Aluva, Ernakulam, Kerala',
      nativeState: primaryPatient.nativeState,
      currentDistrict: primaryPatient.currentDistrict,
      phone: primaryPatient.phone,
      emergencyContact: primaryPatient.emergencyContact,
      bloodGroup: primaryPatient.bloodGroup,
      allergies: primaryPatient.allergies,
      chronicConditions: primaryPatient.chronicConditions,
      surgeries: [
        { id: 's1', name: 'Appendectomy', year: '2021', hospital: 'Govt Hospital, Patna' }
      ],
      medications: primaryPatient.medications,
      vaccinations: primaryPatient.vaccinations,
      insurance: primaryPatient.insurance,
    };
    (demo as any).allergiesNone = false;
    (demo as any).conditionsNone = false;
    (demo as any).surgeriesNone = false;
    (demo as any).medicationsNone = false;
    (demo as any).vaccinationsNone = false;

    setProfile(demo);
    syncGlobalDemoPatient(demo);
  };

  const resetProfile = () => {
    setProfile(defaultEmptyProfile);
    setIsProfileComplete(false);
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_COMPLETE);
  };

  const qrPayload = JSON.stringify({
    healthId: profile.healthId || 'KER-MW-PENDING',
    name: profile.name || 'Worker',
    phone: profile.phone,
    bloodGroup: profile.bloodGroup,
    emergency: profile.emergencyContact.phone,
    verifyUrl: `https://setuhealth.kerala.gov.in/verify/${profile.healthId || '10245'}`,
  });

  // Patient object for rendering
  const patientView: Patient = {
    id: 'worker-local',
    healthId: profile.healthId || (isProfileComplete ? 'KER-MW-10245' : primaryPatient.healthId),
    name: profile.name || (isProfileComplete ? 'Registered Worker' : primaryPatient.name),
    age: profile.age || primaryPatient.age,
    gender: profile.gender || primaryPatient.gender,
    phone: profile.phone || primaryPatient.phone,
    nativeState: profile.nativeState || primaryPatient.nativeState,
    currentDistrict: profile.currentDistrict || primaryPatient.currentDistrict,
    bloodGroup: profile.bloodGroup || primaryPatient.bloodGroup,
    registrationDate: primaryPatient.registrationDate,
    lastUpdated: new Date().toISOString().split('T')[0],
    emergencyContact: profile.emergencyContact.name ? profile.emergencyContact : primaryPatient.emergencyContact,
    allergies: profile.allergies,
    chronicConditions: profile.chronicConditions,
    medications: profile.medications,
    consultations: primaryPatient.consultations,
    labReports: primaryPatient.labReports,
    vaccinations: profile.vaccinations,
    documents: primaryPatient.documents,
    insurance: profile.insurance?.provider ? profile.insurance : primaryPatient.insurance,
  };

  return (
    <WorkerProfileContext.Provider
      value={{
        profile,
        isProfileComplete,
        progressPercent,
        qrPayload,
        updateProfile,
        completeProfileAndGenerateQR,
        fillDemoData,
        resetProfile,
        patientView,
      }}
    >
      {children}
    </WorkerProfileContext.Provider>
  );
}

export function useWorkerProfile() {
  const context = useContext(WorkerProfileContext);
  if (!context) {
    throw new Error('useWorkerProfile must be used within WorkerProfileProvider');
  }
  return context;
}
