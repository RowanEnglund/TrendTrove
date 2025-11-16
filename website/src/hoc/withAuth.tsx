'use client';
import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function WithAuth(props: P) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user || !allowedRoles.includes(user.role)) {
        router.push('/');
      }
    }, [user, router]);

    if (!user || !allowedRoles.includes(user.role)) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
