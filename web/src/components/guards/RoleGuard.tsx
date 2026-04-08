import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { UserRole } from '../../constants/roles'
import { ROUTES } from '../../constants/routes'

type Props = {
  // Esto obliga a que solo puedas pasar 'ADMINISTRADOR', 'AGENTE' o 'SOLICITANTE'
  allowedRoles: UserRole[]
}

function RoleGuard({ allowedRoles }: Props) {
  const user = useAuthStore((state) => state.user)
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  return allowedRoles.includes(user.role)
    ? <Outlet />
    : <Navigate to={ROUTES.TICKETS} replace />
}

export default RoleGuard