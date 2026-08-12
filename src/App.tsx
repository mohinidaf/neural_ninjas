import { BrowserRouter, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { RoleSelectPage } from '@/pages/RoleSelectPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterWorkerPage } from '@/pages/auth/RegisterWorkerPage';
import { RegisterDoctorPage } from '@/pages/auth/RegisterDoctorPage';
import { RegisterHospitalPage } from '@/pages/auth/RegisterHospitalPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { PendingApprovalPage } from '@/pages/auth/PendingApprovalPage';
=======
import { LandingPage } from '@/pages/LandingPage';
import { RoleSelectPage } from '@/pages/RoleSelectPage';
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
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
<<<<<<< HEAD
import { HospitalDashboard } from '@/pages/hospital/HospitalDashboard';
=======
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
import { HealthSaathiProvider } from '@/components/HealthSaathi/HealthSaathiWidget';

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/pending-approval" element={<PendingApprovalPage />} />

          {/* Auth Routes */}
          <Route path="/login/worker" element={<LoginPage role="worker" />} />
          <Route path="/login/doctor" element={<LoginPage role="doctor" />} />
          <Route path="/login/admin" element={<LoginPage role="admin" />} />
          <Route path="/login/hospital" element={<LoginPage role="hospital" />} />
          <Route path="/register/worker" element={<RegisterWorkerPage />} />
          <Route path="/register/doctor" element={<RegisterDoctorPage />} />
          <Route path="/register/hospital" element={<RegisterHospitalPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Worker Routes (Protected) */}
          <Route
            path="/worker"
            element={
              <ProtectedRoute allowedRoles={['worker']}>
                <HealthSaathiProvider><WorkerDashboard /></HealthSaathiProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker/health-id"
            element={
              <ProtectedRoute allowedRoles={['worker']}>
                <HealthSaathiProvider><WorkerHealthID /></HealthSaathiProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker/record"
            element={
              <ProtectedRoute allowedRoles={['worker']}>
                <HealthSaathiProvider><WorkerRecord /></HealthSaathiProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker/emergency"
            element={
              <ProtectedRoute allowedRoles={['worker']}>
                <HealthSaathiProvider><WorkerEmergency /></HealthSaathiProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker/profile"
            element={
              <ProtectedRoute allowedRoles={['worker']}>
                <HealthSaathiProvider><WorkerProfile /></HealthSaathiProvider>
              </ProtectedRoute>
            }
          />

          {/* Doctor Routes (Protected) */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPatients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patient/:healthId"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/scan"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorScan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/consultations"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorConsultations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/prescriptions"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPrescriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/lab-reports"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLabReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/vaccinations"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorVaccinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/alerts"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorAlerts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/workers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminWorkers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/disease"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDisease />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sdg"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSDG />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />

          {/* Hospital Routes (Protected) */}
          <Route
            path="/hospital"
            element={
              <ProtectedRoute allowedRoles={['hospital']}>
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
=======
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
>>>>>>> e47a57daf19862945af7d9790fcf354bf297bc48
    </BrowserRouter>
  );
}
