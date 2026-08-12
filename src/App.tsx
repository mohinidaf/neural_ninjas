import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { RoleSelectPage } from '@/pages/RoleSelectPage';
import { WorkerDashboard } from '@/pages/worker/WorkerDashboard';
import { WorkerHealthID } from '@/pages/worker/WorkerHealthID';
import { WorkerRecord } from '@/pages/worker/WorkerRecord';
import { WorkerEmergency } from '@/pages/worker/WorkerEmergency';
import { WorkerProfile } from '@/pages/worker/WorkerProfile';
import { DoctorDashboard } from '@/pages/doctor/DoctorDashboard';
import { DoctorPatients } from '@/pages/doctor/DoctorPatients';
import { DoctorScan } from '@/pages/doctor/DoctorScan';
import { DoctorConsultations } from '@/pages/doctor/DoctorConsultations';
import { DoctorPrescriptions } from '@/pages/doctor/DoctorPrescriptions';
import { DoctorLabReports } from '@/pages/doctor/DoctorLabReports';
import { DoctorVaccinations } from '@/pages/doctor/DoctorVaccinations';
import { DoctorAlerts } from '@/pages/doctor/DoctorAlerts';
import { DoctorProfile } from '@/pages/doctor/DoctorProfile';
import { PatientViewPage } from '@/pages/doctor/PatientViewPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminWorkers } from '@/pages/admin/AdminWorkers';
import { AdminDisease } from '@/pages/admin/AdminDisease';
import { AdminSDG } from '@/pages/admin/AdminSDG';
import { AdminProfile } from '@/pages/admin/AdminProfile';
import { HealthSaathiProvider } from '@/components/HealthSaathi/HealthSaathiWidget';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role" element={<RoleSelectPage />} />

        {/* Worker */}
        <Route path="/worker" element={<HealthSaathiProvider><WorkerDashboard /></HealthSaathiProvider>} />
        <Route path="/worker/health-id" element={<HealthSaathiProvider><WorkerHealthID /></HealthSaathiProvider>} />
        <Route path="/worker/record" element={<HealthSaathiProvider><WorkerRecord /></HealthSaathiProvider>} />
        <Route path="/worker/emergency" element={<HealthSaathiProvider><WorkerEmergency /></HealthSaathiProvider>} />
        <Route path="/worker/profile" element={<HealthSaathiProvider><WorkerProfile /></HealthSaathiProvider>} />

        {/* Doctor */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/patient/:healthId" element={<PatientViewPage />} />
        <Route path="/doctor/scan" element={<DoctorScan />} />
        <Route path="/doctor/consultations" element={<DoctorConsultations />} />
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        <Route path="/doctor/lab-reports" element={<DoctorLabReports />} />
        <Route path="/doctor/vaccinations" element={<DoctorVaccinations />} />
        <Route path="/doctor/alerts" element={<DoctorAlerts />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/workers" element={<AdminWorkers />} />
        <Route path="/admin/disease" element={<AdminDisease />} />
        <Route path="/admin/sdg" element={<AdminSDG />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
