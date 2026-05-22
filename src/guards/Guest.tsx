import { Navigate, Outlet } from 'react-router-dom'

import PageRouteFallback from '@/components/common/PageRouteFallback'
import { useAuth } from '@/contexts/Auth'

export default function GuestGuard() {
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <PageRouteFallback />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
