import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingState } from '@/components/ui/Feedback';
import type { Role } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, allowedRoles, requireAuth = true }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState message="Verifying access..." />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAuth && user && profile && allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(profile.role)) {
      const redirectPath = getRoleHomePath(profile.role);
      return <Navigate to={redirectPath} replace />;
    }
  }

  if (requireAuth && user && profile && profile.status === 'pending') {
    return <Navigate to="/pending-approval" replace />;
  }

  return <>{children}</>;
}

export function getRoleHomePath(role: Role): string {
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
