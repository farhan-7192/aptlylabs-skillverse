import { Navigate, Outlet, useLocation } from 'react-router-dom'

import PageRouteFallback from '@/components/common/PageRouteFallback'
import { useAuth } from '@/contexts/Auth'

export default function AuthGuard() {
  const { isAuthenticated, isBootstrapping } = useAuth()
  const location = useLocation()

  if (isBootstrapping) {
    return <PageRouteFallback />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
