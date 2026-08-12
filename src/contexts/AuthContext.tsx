import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role } from '@/types';

interface AuthContextType {
  demoRole: Role | null;
  setDemoRole: (role: Role) => void;
  signOut: () => void;
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
  const [demoRole, setDemoRole] = useState<Role | null>(null);

  function signOut() {
    setDemoRole(null);
  }

  function getRoleRedirectPath(role: Role): string {
    switch (role) {
      case 'worker':
        return '/worker';
      case 'doctor':
        return '/doctor';
      case 'admin':
        return '/admin';
      default:
        return '/';
    }
  }

  const value: AuthContextType = {
    demoRole,
    setDemoRole,
    signOut,
    getRoleRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
