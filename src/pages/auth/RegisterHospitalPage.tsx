import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export function RegisterHospitalPage() {
  const [formData, setFormData] = useState({
    hospital_name: '',
    official_email: '',
    hospital_phone: '',
    hospital_address: '',
    hospital_city: '',
    hospital_state: 'Kerala',
    registration_number: '',
    admin_name: '',
    admin_email: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.hospital_name.trim()) {
      newErrors.hospital_name = 'Hospital name is required';
    }
    if (!formData.official_email.trim()) {
      newErrors.official_email = 'Official email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.official_email)) {
      newErrors.official_email = 'Please enter a valid email';
    }
    if (!formData.hospital_phone.trim()) {
      newErrors.hospital_phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.hospital_phone)) {
      newErrors.hospital_phone = 'Please enter a valid phone number';
    }
    if (!formData.hospital_address.trim()) {
      newErrors.hospital_address = 'Address is required';
    }
    if (!formData.hospital_city.trim()) {
      newErrors.hospital_city = 'City is required';
    }
    if (!formData.registration_number.trim()) {
      newErrors.registration_number = 'Registration number is required';
    }
    if (!formData.admin_name.trim()) {
      newErrors.admin_name = 'Administrator name is required';
    }
    if (!formData.admin_email.trim()) {
      newErrors.admin_email = 'Administrator email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.admin_email)) {
      newErrors.admin_email = 'Please enter a valid email';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) return;

    setLoading(true);
    const { error } = await signUp(formData.official_email, formData.password, 'hospital', {
      full_name: formData.admin_name,
      hospital_name: formData.hospital_name,
      hospital_address: formData.hospital_address,
      hospital_city: formData.hospital_city,
      hospital_state: formData.hospital_state,
      hospital_phone: formData.hospital_phone,
      registration_number: formData.registration_number,
      admin_name: formData.admin_name,
      admin_email: formData.admin_email,
      phone: formData.hospital_phone,
    });
    setLoading(false);

    if (error) {
      setGeneralError(error);
      return;
    }

    navigate('/pending-approval', {
      replace: true,
      state: {
        message: 'Hospital registration submitted! Your account is pending verification.',
        role: 'hospital',
      },
    });
  };

  return (
    <AuthLayout
      title="Register Hospital"
      subtitle="Create a hospital account to manage healthcare operations"
    >
      <div className="mb-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-600 to-accent-700 text-white shadow-sm">
          <Building2 className="h-6 w-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {generalError && (
          <div className="rounded-lg bg-danger-50 border border-danger-200 p-4">
            <p className="text-sm text-danger-700">{generalError}</p>
          </div>
        )}

        <div className="rounded-lg bg-accent-50 border border-accent-200 p-4 mb-2">
          <p className="text-sm text-accent-700">
            <strong>Hospital accounts require verification.</strong> After registration, your account will be reviewed by the Health Authority before access is granted.
          </p>
        </div>

        <div>
          <label htmlFor="hospital_name" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Hospital Name
          </label>
          <input
            id="hospital_name"
            type="text"
            value={formData.hospital_name}
            onChange={(e) => updateField('hospital_name', e.target.value)}
            placeholder="e.g. Government Health Centre"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.hospital_name ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
          />
          {errors.hospital_name && <p className="mt-1 text-xs text-danger-600">{errors.hospital_name}</p>}
        </div>

        <div>
          <label htmlFor="official_email" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Official Email
          </label>
          <input
            id="official_email"
            type="email"
            value={formData.official_email}
            onChange={(e) => updateField('official_email', e.target.value)}
            placeholder="admin@hospital.com"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.official_email ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
            autoComplete="email"
          />
          {errors.official_email && <p className="mt-1 text-xs text-danger-600">{errors.official_email}</p>}
        </div>

        <div>
          <label htmlFor="hospital_phone" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Hospital Phone
          </label>
          <input
            id="hospital_phone"
            type="tel"
            value={formData.hospital_phone}
            onChange={(e) => updateField('hospital_phone', e.target.value)}
            placeholder="+91 484 123 4567"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.hospital_phone ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
          />
          {errors.hospital_phone && <p className="mt-1 text-xs text-danger-600">{errors.hospital_phone}</p>}
        </div>

        <div>
          <label htmlFor="hospital_address" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Address
          </label>
          <input
            id="hospital_address"
            type="text"
            value={formData.hospital_address}
            onChange={(e) => updateField('hospital_address', e.target.value)}
            placeholder="Full address"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.hospital_address ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
          />
          {errors.hospital_address && <p className="mt-1 text-xs text-danger-600">{errors.hospital_address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hospital_city" className="mb-1.5 block text-sm font-semibold text-ink-800">
              City
            </label>
            <input
              id="hospital_city"
              type="text"
              value={formData.hospital_city}
              onChange={(e) => updateField('hospital_city', e.target.value)}
              placeholder="City"
              className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
                errors.hospital_city ? 'border-danger-400' : 'border-ink-300'
              }`}
              disabled={loading}
            />
            {errors.hospital_city && <p className="mt-1 text-xs text-danger-600">{errors.hospital_city}</p>}
          </div>
          <div>
            <label htmlFor="hospital_state" className="mb-1.5 block text-sm font-semibold text-ink-800">
              State
            </label>
            <select
              id="hospital_state"
              value={formData.hospital_state}
              onChange={(e) => updateField('hospital_state', e.target.value)}
              className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              disabled={loading}
            >
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="registration_number" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Hospital Registration / License Number
          </label>
          <input
            id="registration_number"
            type="text"
            value={formData.registration_number}
            onChange={(e) => updateField('registration_number', e.target.value)}
            placeholder="e.g. HOSP/KL/2024/12345"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.registration_number ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
          />
          {errors.registration_number && <p className="mt-1 text-xs text-danger-600">{errors.registration_number}</p>}
        </div>

        <div className="border-t border-ink-200 pt-4 mt-2">
          <p className="text-sm font-bold text-ink-800 mb-3">Administrator Account</p>
        </div>

        <div>
          <label htmlFor="admin_name" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Administrator Name
          </label>
          <input
            id="admin_name"
            type="text"
            value={formData.admin_name}
            onChange={(e) => updateField('admin_name', e.target.value)}
            placeholder="Full name of hospital administrator"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.admin_name ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
          />
          {errors.admin_name && <p className="mt-1 text-xs text-danger-600">{errors.admin_name}</p>}
        </div>

        <div>
          <label htmlFor="admin_email" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Administrator Email
          </label>
          <input
            id="admin_email"
            type="email"
            value={formData.admin_email}
            onChange={(e) => updateField('admin_email', e.target.value)}
            placeholder="admin@hospital.com"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
              errors.admin_email ? 'border-danger-400' : 'border-ink-300'
            }`}
            disabled={loading}
          />
          {errors.admin_email && <p className="mt-1 text-xs text-danger-600">{errors.admin_email}</p>}
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
              disabled={loading}
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
              disabled={loading}
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

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting registration...
            </>
          ) : (
            'Submit Registration'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/login/hospital" className="font-semibold text-primary-700 hover:text-primary-800">
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
