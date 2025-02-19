import { useAuth } from './authProvider';
import { useRouter } from 'next/navigation';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const router = useRouter();

  if (!token) {
    router.push('/login'); // Redirect to login if not authenticated
    return null; // or loading indicator
  }

  return children;
};

export default ProtectedRoute;