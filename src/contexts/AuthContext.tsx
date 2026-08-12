import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { UserProfile, Role } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, role: Role, metadata?: Record<string, unknown>) => Promise<{ error?: string; needsVerification?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  getRoleRedirectPath: (role: Role) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: getFriendlyError(error.message) };
      }
      return {};
    } catch {
      return { error: 'Network error. Please check your connection.' };
    }
  }

  async function signUp(
    email: string,
    password: string,
    role: Role,
    metadata?: Record<string, unknown>
  ): Promise<{ error?: string; needsVerification?: boolean }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            ...metadata,
          },
        },
      });

      if (error) {
        return { error: getFriendlyError(error.message) };
      }

      if (data.user) {
        const profileData: Record<string, unknown> = {
          user_id: data.user.id,
          role,
          full_name: metadata?.full_name || '',
          email,
          phone: metadata?.phone || '',
          status: role === 'hospital' ? 'pending' : 'active',
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData);

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        if (role === 'worker' && metadata) {
          const { error: workerError } = await supabase
            .from('worker_profiles')
            .insert({
              user_id: data.user.id,
              health_id: metadata.health_id || generateHealthId(),
              native_state: metadata.native_state || '',
              current_district: metadata.current_district || '',
              blood_group: metadata.blood_group || '',
            });
          if (workerError) {
            console.error('Error creating worker profile:', workerError);
          }
        }

        if (role === 'doctor' && metadata) {
          const { error: doctorError } = await supabase
            .from('doctor_profiles')
            .insert({
              user_id: data.user.id,
              medical_license: metadata.medical_license || '',
              specialization: metadata.specialization || '',
              hospital_name: metadata.hospital_name || '',
              years_experience: metadata.years_experience || 0,
            });
          if (doctorError) {
            console.error('Error creating doctor profile:', doctorError);
          }
        }

        if (role === 'hospital' && metadata) {
          const { error: hospitalError } = await supabase
            .from('hospital_profiles')
            .insert({
              user_id: data.user.id,
              hospital_name: metadata.hospital_name || '',
              hospital_address: metadata.hospital_address || '',
              hospital_city: metadata.hospital_city || '',
              hospital_state: metadata.hospital_state || '',
              hospital_phone: metadata.hospital_phone || '',
              registration_number: metadata.registration_number || '',
              admin_name: metadata.admin_name || '',
            });
          if (hospitalError) {
            console.error('Error creating hospital profile:', hospitalError);
          }
        }

        if (data.session) {
          return { needsVerification: false };
        }
        return { needsVerification: true };
      }

      return {};
    } catch {
      return { error: 'Network error. Please check your connection.' };
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfile(user.id);
    }
  }

  function getRoleRedirectPath(role: Role): string {
    switch (role) {
      case 'worker':
        return '/worker';
      case 'doctor':
        return '/doctor';
      case 'admin':
        return '/admin';
      case 'hospital':
        return '/hospital';
      default:
        return '/';
    }
  }

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    getRoleRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function generateHealthId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `KER-MW-${num}`;
}

function getFriendlyError(errorMessage: string): string {
  if (errorMessage.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  if (errorMessage.includes('User already registered')) {
    return 'An account with this email already exists.';
  }
  if (errorMessage.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (errorMessage.includes('Unable to validate email address')) {
    return 'Please enter a valid email address.';
  }
  if (errorMessage.includes('Email rate limit exceeded')) {
    return 'Too many attempts. Please try again later.';
  }
  if (errorMessage.includes('signup is disabled')) {
    return 'Registration is currently disabled. Please contact support.';
  }
  if (errorMessage.includes('Email not confirmed')) {
    return 'Please verify your email address before logging in.';
  }
  return errorMessage || 'An unexpected error occurred. Please try again.';
}
