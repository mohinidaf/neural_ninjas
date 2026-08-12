import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/Button';

const specializations = [
  'General Physician',
  'Internal Medicine',
  'Pediatrics',
  'Obstetrics & Gynecology',
  'Surgery',
  'Orthopedics',
  'Cardiology',
  'Dermatology',
  'ENT',
  'Ophthalmology',
  'Psychiatry',
  'Other',
];

export function RegisterDoctorPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    medical_license: '',
    specialization: 'General Physician',
    hospital_name: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.medical_license.trim()) {
      newErrors.medical_license = 'Medical license number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/doctor', {
      replace: true,
      state: { message: 'Account created successfully! Welcome to Arogya Safar.' },
    });
  };

  return (
    <AuthLayout
      title="Create Doctor Account"
      subtitle="Register to access patient health records"
    >
      <div className="mb-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-600 to-secondary-700 text-white shadow-sm">
          <Stethoscope className="h-6 w-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Full Name
          </label>
          <input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={(e) => updateField('full_name', e.target.value)}
            placeholder="Dr. Your Name"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.full_name ? 'border-danger-400' : 'border-ink-300'
            }`}
          />
          {errors.full_name && <p className="mt-1 text-xs text-danger-600">{errors.full_name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@hospital.com"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.email ? 'border-danger-400' : 'border-ink-300'
            }`}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-danger-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.phone ? 'border-danger-400' : 'border-ink-300'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-danger-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="medical_license" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Medical Registration / License Number
          </label>
          <input
            id="medical_license"
            type="text"
            value={formData.medical_license}
            onChange={(e) => updateField('medical_license', e.target.value)}
            placeholder="e.g. KMC-2018-04512"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.medical_license ? 'border-danger-400' : 'border-ink-300'
            }`}
          />
          {errors.medical_license && <p className="mt-1 text-xs text-danger-600">{errors.medical_license}</p>}
        </div>

        <div>
          <label htmlFor="specialization" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Specialization
          </label>
          <select
            id="specialization"
            value={formData.specialization}
            onChange={(e) => updateField('specialization', e.target.value)}
            className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hospital_name" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Hospital / Clinic Name <span className="text-ink-400 font-normal">(Optional)</span>
          </label>
          <input
            id="hospital_name"
            type="text"
            value={formData.hospital_name}
            onChange={(e) => updateField('hospital_name', e.target.value)}
            placeholder="e.g. Government Health Centre"
            className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Create a password"
              className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
                errors.password ? 'border-danger-400' : 'border-ink-300'
              }`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-danger-600">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirm_password" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirm_password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirm_password}
              onChange={(e) => updateField('confirm_password', e.target.value)}
              placeholder="Confirm your password"
              className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
                errors.confirm_password ? 'border-danger-400' : 'border-ink-300'
              }`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirm_password && <p className="mt-1 text-xs text-danger-600">{errors.confirm_password}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/login/doctor" className="font-semibold text-primary-700 hover:text-primary-800">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-ink-400">
          <Link to="/role" className="font-semibold text-primary-700 hover:text-primary-800">
            Choose a different role
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
