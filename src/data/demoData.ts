import type {
  Patient,
  AdminStats,
  DistrictCase,
  ChatQuickAction,
} from '@/types';

export interface DemoQRMapping {
  qrId: string;
  patientId: string;
  patientName: string;
}

export const demoPatients: Patient[] = [
  {
    id: 'p1',
    healthId: 'KER-MW-10245',
    name: 'Rahim Ali',
    age: 32,
    gender: 'Male',
    phone: '+91 98765 43210',
    nativeState: 'Bihar',
    currentDistrict: 'Ernakulam',
    bloodGroup: 'B+',
    registrationDate: '2026-03-15',
    lastUpdated: '2026-08-12',
    emergencyContact: {
      name: 'Saira Banu',
      relationship: 'Spouse',
      phone: '+91 98765 11122',
    },
    allergies: [
      { id: 'a1', substance: 'Penicillin', severity: 'severe', note: 'Anaphylaxis reported' },
      { id: 'a2', substance: 'Dust mites', severity: 'mild' },
    ],
    chronicConditions: [
      { id: 'c1', name: 'Asthma', diagnosedDate: '2018-06-01', status: 'managed', note: 'Mild intermittent' },
    ],
    medications: [
      {
        id: 'm1',
        name: 'Salbutamol Inhaler',
        dosage: '100 mcg',
        frequency: 'As needed',
        startDate: '2026-07-08',
        status: 'active',
        prescribedBy: 'Dr. Anjali Menon',
      },
      {
        id: 'm2',
        name: 'Amoxicillin',
        dosage: '500 mg',
        frequency: '3 times daily',
        startDate: '2026-08-12',
        endDate: '2026-08-19',
        status: 'active',
        prescribedBy: 'Dr. Anjali Menon',
      },
      {
        id: 'm3',
        name: 'Paracetamol',
        dosage: '650 mg',
        frequency: '3 times daily',
        startDate: '2026-08-12',
        endDate: '2026-08-15',
        status: 'active',
        prescribedBy: 'Dr. Anjali Menon',
      },
    ],
    consultations: [
      {
        id: 'cons1',
        date: '2026-08-12',
        hospital: 'Government Health Centre, Ernakulam',
        doctor: 'Dr. Anjali Menon',
        symptoms: 'Cough, mild fever, shortness of breath for 3 days',
        diagnosis: 'Acute Respiratory Infection',
        treatment: 'Antibiotics, bronchodilator, rest, hydration',
        followUpDate: '2026-08-19',
        notes: 'Monitor breathing. Return if symptoms worsen.',
        prescription: {
          id: 'rx1',
          consultationId: 'cons1',
          date: '2026-08-12',
          doctor: 'Dr. Anjali Menon',
          hospital: 'Government Health Centre, Ernakulam',
          medicines: [
            { name: 'Amoxicillin', dosage: '500 mg', frequency: '3x daily', duration: '7 days' },
            { name: 'Salbutamol Inhaler', dosage: '100 mcg', frequency: 'As needed', duration: 'Ongoing' },
            { name: 'Paracetamol', dosage: '650 mg', frequency: '3x daily', duration: '3 days' },
          ],
          notes: 'Take Amoxicillin with food. Avoid penicillin-class drugs.',
        },
      },
      {
        id: 'cons2',
        date: '2026-06-18',
        hospital: 'District Hospital, Kozhikode',
        doctor: 'Dr. Rajesh Kumar',
        symptoms: 'Routine asthma follow-up',
        diagnosis: 'Asthma — well controlled',
        treatment: 'Continue inhaler, avoid triggers',
        followUpDate: '2026-09-18',
        notes: 'Patient reports fewer episodes since moving.',
      },
      {
        id: 'cons3',
        date: '2026-03-20',
        hospital: 'Primary Health Centre, Kozhikode',
        doctor: 'Dr. Lakshmi Pillai',
        symptoms: 'Wheezing, chest tightness',
        diagnosis: 'Asthma exacerbation',
        treatment: 'Nebulization, oral steroids (short course)',
        notes: 'First registered visit. Issued Health ID.',
      },
    ],
    labReports: [
      {
        id: 'lab1',
        testName: 'Complete Blood Count (CBC)',
        date: '2026-08-12',
        hospital: 'Government Health Centre, Ernakulam',
        status: 'completed',
        result: 'WBC slightly elevated (11.2 × 10⁹/L)',
        normalRange: '4.0–11.0 × 10⁹/L',
      },
      {
        id: 'lab2',
        testName: 'Chest X-Ray',
        date: '2026-08-12',
        hospital: 'Government Health Centre, Ernakulam',
        status: 'completed',
        result: 'No significant abnormalities',
      },
      {
        id: 'lab3',
        testName: 'Blood Sugar (Fasting)',
        date: '2026-07-08',
        hospital: 'District Hospital, Kozhikode',
        status: 'completed',
        result: '92 mg/dL',
        normalRange: '70–100 mg/dL',
      },
      {
        id: 'lab4',
        testName: 'Sputum Culture',
        date: '2026-06-18',
        hospital: 'District Hospital, Kozhikode',
        status: 'completed',
        result: 'No pathogenic organisms isolated',
      },
    ],
    vaccinations: [
      {
        id: 'v1',
        vaccine: 'Tetanus',
        date: '2026-06-18',
        dose: 'Booster',
        nextDueDate: '2031-06-18',
        status: 'completed',
        hospital: 'District Hospital, Kozhikode',
      },
      {
        id: 'v2',
        vaccine: 'Hepatitis B',
        date: '2026-03-20',
        dose: 'Dose 1 of 3',
        nextDueDate: '2026-09-20',
        status: 'pending',
        hospital: 'Primary Health Centre, Kozhikode',
      },
      {
        id: 'v3',
        vaccine: 'COVID-19',
        date: '2025-01-10',
        dose: 'Precautionary',
        nextDueDate: undefined,
        status: 'completed',
        hospital: 'Govt Hospital, Patna',
      },
    ],
    documents: [
      {
        id: 'd1',
        title: 'Prescription — Respiratory Infection',
        type: 'prescription',
        date: '2026-08-12',
        hospital: 'Government Health Centre, Ernakulam',
      },
      {
        id: 'd2',
        title: 'CBC Report',
        type: 'lab_report',
        date: '2026-08-12',
        hospital: 'Government Health Centre, Ernakulam',
      },
      {
        id: 'd3',
        title: 'Chest X-Ray Report',
        type: 'lab_report',
        date: '2026-08-12',
        hospital: 'Government Health Centre, Ernakulam',
      },
      {
        id: 'd4',
        title: 'Tetanus Vaccination Certificate',
        type: 'vaccination_certificate',
        date: '2026-06-18',
        hospital: 'District Hospital, Kozhikode',
      },
      {
        id: 'd5',
        title: 'Asthma Follow-up Summary',
        type: 'discharge_summary',
        date: '2026-06-18',
        hospital: 'District Hospital, Kozhikode',
      },
    ],
    insurance: {
      provider: 'Karunya Health Scheme',
      policyNumber: 'KHS-2026-88412',
      status: 'active',
    },
  },
  {
    id: 'p2',
    healthId: 'KER-MW-10312',
    name: 'Bikash Das',
    age: 28,
    gender: 'Male',
    phone: '+91 89012 34567',
    nativeState: 'Assam',
    currentDistrict: 'Kozhikode',
    bloodGroup: 'O+',
    registrationDate: '2026-04-02',
    lastUpdated: '2026-08-10',
    emergencyContact: {
      name: 'Priya Das',
      relationship: 'Sister',
      phone: '+91 89012 99900',
    },
    allergies: [{ id: 'a1', substance: 'Sulfonamides', severity: 'moderate' }],
    chronicConditions: [],
    medications: [
      {
        id: 'm1',
        name: 'ORS',
        dosage: '1 sachet',
        frequency: 'After every loose motion',
        startDate: '2026-08-10',
        endDate: '2026-08-13',
        status: 'active',
        prescribedBy: 'Dr. Fathima Rasheed',
      },
    ],
    consultations: [
      {
        id: 'cons1',
        date: '2026-08-10',
        hospital: 'Community Health Centre, Kozhikode',
        doctor: 'Dr. Fathima Rasheed',
        symptoms: 'Diarrhea, vomiting, dehydration',
        diagnosis: 'Acute Gastroenteritis',
        treatment: 'ORS, antibiotics, fluid management',
        followUpDate: '2026-08-14',
      },
    ],
    labReports: [
      {
        id: 'lab1',
        testName: 'Stool Culture',
        date: '2026-08-10',
        hospital: 'Community Health Centre, Kozhikode',
        status: 'pending',
      },
    ],
    vaccinations: [
      {
        id: 'v1',
        vaccine: 'Typhoid',
        date: '2026-04-02',
        dose: 'Booster',
        status: 'completed',
        hospital: 'Community Health Centre, Kozhikode',
      },
    ],
    documents: [
      {
        id: 'd1',
        title: 'Prescription — Gastroenteritis',
        type: 'prescription',
        date: '2026-08-10',
        hospital: 'Community Health Centre, Kozhikode',
      },
    ],
  },
  {
    id: 'p3',
    healthId: 'KER-MW-10488',
    name: 'Lakhan Singh',
    age: 35,
    gender: 'Male',
    phone: '+91 70123 45678',
    nativeState: 'Uttar Pradesh',
    currentDistrict: 'Thiruvananthapuram',
    bloodGroup: 'A+',
    registrationDate: '2026-02-11',
    lastUpdated: '2026-08-09',
    emergencyContact: {
      name: 'Ravi Singh',
      relationship: 'Brother',
      phone: '+91 70123 00011',
    },
    allergies: [],
    chronicConditions: [
      { id: 'c1', name: 'Hypertension', diagnosedDate: '2025-11-01', status: 'managed' },
    ],
    medications: [
      {
        id: 'm1',
        name: 'Amlodipine',
        dosage: '5 mg',
        frequency: 'Once daily',
        startDate: '2025-11-05',
        status: 'active',
        prescribedBy: 'Dr. Suresh Nair',
      },
    ],
    consultations: [
      {
        id: 'cons1',
        date: '2026-08-09',
        hospital: 'General Hospital, Thiruvananthapuram',
        doctor: 'Dr. Suresh Nair',
        symptoms: 'Headache, dizziness',
        diagnosis: 'Hypertension — controlled',
        treatment: 'Continue Amlodipine, reduce salt',
        followUpDate: '2026-11-09',
      },
      {
        id: 'cons2',
        date: '2026-05-15',
        hospital: 'General Hospital, Thiruvananthapuram',
        doctor: 'Dr. Suresh Nair',
        symptoms: 'Routine BP check',
        diagnosis: 'Hypertension — stable',
        treatment: 'Continue medication',
      },
    ],
    labReports: [
      {
        id: 'lab1',
        testName: 'Lipid Profile',
        date: '2026-08-09',
        hospital: 'General Hospital, Thiruvananthapuram',
        status: 'completed',
        result: 'Within normal limits',
      },
    ],
    vaccinations: [
      {
        id: 'v1',
        vaccine: 'Hepatitis B',
        date: '2026-02-11',
        dose: 'Dose 1 of 3',
        nextDueDate: '2026-08-11',
        status: 'overdue',
        hospital: 'General Hospital, Thiruvananthapuram',
      },
    ],
    documents: [
      {
        id: 'd1',
        title: 'Lipid Profile Report',
        type: 'lab_report',
        date: '2026-08-09',
        hospital: 'General Hospital, Thiruvananthapuram',
      },
    ],
  },
  {
    id: 'p4',
    healthId: 'KER-MW-10567',
    name: 'Arjun Mahato',
    age: 26,
    gender: 'Male',
    phone: '+91 91234 56789',
    nativeState: 'Jharkhand',
    currentDistrict: 'Malappuram',
    bloodGroup: 'AB+',
    registrationDate: '2026-05-20',
    lastUpdated: '2026-08-11',
    emergencyContact: {
      name: 'Sita Mahato',
      relationship: 'Spouse',
      phone: '+91 91234 22000',
    },
    allergies: [{ id: 'a1', substance: 'Peanuts', severity: 'moderate' }],
    chronicConditions: [],
    medications: [],
    consultations: [
      {
        id: 'cons1',
        date: '2026-08-11',
        hospital: 'District Hospital, Malappuram',
        doctor: 'Dr. Aisha Salim',
        symptoms: 'High fever, joint pain, rash',
        diagnosis: 'Suspected Dengue Fever',
        treatment: 'NS1 antigen test advised, symptomatic treatment, hydration',
        followUpDate: '2026-08-14',
        notes: 'Advised platelet monitoring daily. Hospitalize if platelets < 50,000.',
      },
    ],
    labReports: [
      {
        id: 'lab1',
        testName: 'NS1 Antigen (Dengue)',
        date: '2026-08-11',
        hospital: 'District Hospital, Malappuram',
        status: 'pending',
      },
      {
        id: 'lab2',
        testName: 'Platelet Count',
        date: '2026-08-11',
        hospital: 'District Hospital, Malappuram',
        status: 'completed',
        result: '180,000/µL',
        normalRange: '150,000–450,000/µL',
      },
    ],
    vaccinations: [],
    documents: [
      {
        id: 'd1',
        title: 'Dengue Investigation Notes',
        type: 'prescription',
        date: '2026-08-11',
        hospital: 'District Hospital, Malappuram',
      },
    ],
  },
];

export const primaryPatient = demoPatients[0]; // Rahim Ali

export const adminStats: AdminStats = {
  totalWorkers: 14827,
  activeRecords: 14203,
  totalConsultations: 38492,
  vaccinationCoverage: 68,
  diseaseCases: 312,
  districtsCovered: 14,
};

export const workersByDistrict = [
  { district: 'Ernakulam', workers: 3420 },
  { district: 'Kozhikode', workers: 2810 },
  { district: 'Thiruvananthapuram', workers: 2340 },
  { district: 'Malappuram', workers: 1980 },
  { district: 'Thrissur', workers: 1620 },
  { district: 'Kannur', workers: 1340 },
  { district: 'Kollam', workers: 1110 },
  { district: 'Other', workers: 207 },
];

export const diseaseMonitoring = [
  { disease: 'Dengue', cases: 124, trend: 'up' as const },
  { disease: 'Tuberculosis', cases: 48, trend: 'stable' as const },
  { disease: 'Acute Fever', cases: 89, trend: 'down' as const },
  { disease: 'Resp. Infections', cases: 51, trend: 'up' as const },
];

export const vaccinationCoverage = [
  { name: 'Covered', value: 68 },
  { name: 'Pending', value: 32 },
];

export const districtCases: DistrictCase[] = [
  {
    id: 'dc1',
    district: 'Ernakulam',
    disease: 'Dengue',
    cases: 24,
    dateRange: 'Aug 1–12, 2026',
    trend: 'up',
    alertStatus: 'monitoring',
  },
  {
    id: 'dc2',
    district: 'Malappuram',
    disease: 'Dengue',
    cases: 31,
    dateRange: 'Aug 1–12, 2026',
    trend: 'up',
    alertStatus: 'alert',
  },
  {
    id: 'dc3',
    district: 'Kozhikode',
    disease: 'Tuberculosis',
    cases: 12,
    dateRange: 'Aug 1–12, 2026',
    trend: 'stable',
    alertStatus: 'monitoring',
  },
  {
    id: 'dc4',
    district: 'Thiruvananthapuram',
    disease: 'Acute Fever',
    cases: 18,
    dateRange: 'Aug 1–12, 2026',
    trend: 'down',
    alertStatus: 'normal',
  },
  {
    id: 'dc5',
    district: 'Thrissur',
    disease: 'Resp. Infections',
    cases: 9,
    dateRange: 'Aug 1–12, 2026',
    trend: 'up',
    alertStatus: 'monitoring',
  },
  {
    id: 'dc6',
    district: 'Kannur',
    disease: 'Acute Fever',
    cases: 7,
    dateRange: 'Aug 1–12, 2026',
    trend: 'down',
    alertStatus: 'normal',
  },
];

export const recentConsultations = [
  { patient: 'Rahim Ali', healthId: 'KER-MW-10245', doctor: 'Dr. Anjali Menon', hospital: 'Govt Health Centre, Ernakulam', date: '2026-08-12', diagnosis: 'Respiratory Infection' },
  { patient: 'Arjun Mahato', healthId: 'KER-MW-10567', doctor: 'Dr. Aisha Salim', hospital: 'District Hospital, Malappuram', date: '2026-08-11', diagnosis: 'Suspected Dengue' },
  { patient: 'Lakhan Singh', healthId: 'KER-MW-10488', doctor: 'Dr. Suresh Nair', hospital: 'General Hospital, TVM', date: '2026-08-09', diagnosis: 'Hypertension follow-up' },
  { patient: 'Bikash Das', healthId: 'KER-MW-10312', doctor: 'Dr. Fathima Rasheed', hospital: 'CHC, Kozhikode', date: '2026-08-10', diagnosis: 'Acute Gastroenteritis' },
];

export const chatQuickActions: ChatQuickAction[] = [
  { id: 'record', label: 'My Health Record', icon: 'FileText' },
  { id: 'medicines', label: 'My Medicines', icon: 'Pill' },
  { id: 'appointments', label: 'My Appointments', icon: 'CalendarClock' },
  { id: 'findcare', label: 'Find Healthcare', icon: 'MapPin' },
  { id: 'translate', label: 'Translate for Doctor', icon: 'Languages' },
];

export function findPatientByHealthId(id: string): Patient | undefined {
  return demoPatients.find((p) => p.healthId.toLowerCase() === id.toLowerCase());
}

// 5th demo patient — Meena Devi
const meenaDevi: Patient = {
  id: 'p5',
  healthId: 'KER-MW-10734',
  name: 'Meena Devi',
  age: 29,
  gender: 'Female',
  phone: '+91 78901 23456',
  nativeState: 'West Bengal',
  currentDistrict: 'Thrissur',
  bloodGroup: 'B-',
  registrationDate: '2026-06-10',
  lastUpdated: '2026-08-11',
  emergencyContact: {
    name: 'Ratan Devi',
    relationship: 'Mother',
    phone: '+91 78901 88800',
  },
  allergies: [
    { id: 'a1', substance: 'Iodine', severity: 'moderate', note: 'Skin rash on contact' },
    { id: 'a2', substance: 'Shellfish', severity: 'severe', note: 'Anaphylaxis risk' },
  ],
  chronicConditions: [
    { id: 'c1', name: 'Type 2 Diabetes', diagnosedDate: '2024-03-15', status: 'managed', note: 'Diet-controlled, occasional Metformin' },
  ],
  medications: [
    {
      id: 'm1',
      name: 'Metformin',
      dosage: '500 mg',
      frequency: 'Twice daily',
      startDate: '2024-04-01',
      status: 'active',
      prescribedBy: 'Dr. Subhash Chandra',
    },
  ],
  consultations: [
    {
      id: 'cons1',
      date: '2026-08-11',
      hospital: 'Government Medical College, Thrissur',
      doctor: 'Dr. Subhash Chandra',
      symptoms: 'Frequent urination, increased thirst, fatigue',
      diagnosis: 'Type 2 Diabetes — elevated blood sugar',
      treatment: 'Continue Metformin, dietary counseling, regular monitoring',
      followUpDate: '2026-11-11',
      notes: 'HbA1c check due in 3 months. Refer to ophthalmologist for retinal screening.',
    },
    {
      id: 'cons2',
      date: '2026-05-20',
      hospital: 'Primary Health Centre, Thrissur',
      doctor: 'Dr. Lakshmi Nair',
      symptoms: 'Mild fever, cough',
      diagnosis: 'Upper Respiratory Tract Infection',
      treatment: 'Supportive care, paracetamol, rest',
    },
  ],
  labReports: [
    {
      id: 'lab1',
      testName: 'HbA1c (Glycated Hemoglobin)',
      date: '2026-08-11',
      hospital: 'Government Medical College, Thrissur',
      status: 'completed',
      result: '7.8%',
      normalRange: '< 5.7%',
    },
    {
      id: 'lab2',
      testName: 'Fasting Blood Sugar',
      date: '2026-08-11',
      hospital: 'Government Medical College, Thrissur',
      status: 'completed',
      result: '156 mg/dL',
      normalRange: '70–100 mg/dL',
    },
    {
      id: 'lab3',
      testName: 'Urinalysis',
      date: '2026-05-20',
      hospital: 'Primary Health Centre, Thrissur',
      status: 'completed',
      result: 'Normal',
    },
  ],
  vaccinations: [
    {
      id: 'v1',
      vaccine: 'Influenza',
      date: '2026-01-15',
      dose: 'Annual',
      status: 'completed',
      hospital: 'Primary Health Centre, Thrissur',
    },
    {
      id: 'v2',
      vaccine: 'Tetanus',
      date: '2025-06-10',
      dose: 'Booster',
      nextDueDate: '2035-06-10',
      status: 'completed',
      hospital: 'Primary Health Centre, Thrissur',
    },
  ],
  documents: [
    {
      id: 'd1',
      title: 'Diabetes Management Plan',
      type: 'discharge_summary',
      date: '2026-08-11',
      hospital: 'Government Medical College, Thrissur',
    },
    {
      id: 'd2',
      title: 'HbA1c Report',
      type: 'lab_report',
      date: '2026-08-11',
      hospital: 'Government Medical College, Thrissur',
    },
  ],
  insurance: {
    provider: 'Ayushman Bharat',
    policyNumber: 'AB-2026-55231',
    status: 'active',
  },
};

demoPatients.push(meenaDevi);

export const demoQRMappings: DemoQRMapping[] = [
  { qrId: 'AROGYA-DEMO-001', patientId: 'p1', patientName: 'Rahim Ali' },
  { qrId: 'AROGYA-DEMO-002', patientId: 'p2', patientName: 'Bikash Das' },
  { qrId: 'AROGYA-DEMO-003', patientId: 'p3', patientName: 'Lakhan Singh' },
  { qrId: 'AROGYA-DEMO-004', patientId: 'p4', patientName: 'Arjun Mahato' },
  { qrId: 'AROGYA-DEMO-005', patientId: 'p5', patientName: 'Meena Devi' },
];

export function findPatientByQR(qrId: string): Patient | undefined {
  const mapping = demoQRMappings.find((m) => m.qrId === qrId);
  if (!mapping) return undefined;
  return demoPatients.find((p) => p.id === mapping.patientId);
}
