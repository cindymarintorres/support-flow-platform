import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../../components/guards/ProtectedRoute'
// import RoleGuard from '../../components/guards/RoleGuard'
import AppLayout from '../../components/layout/AppLayout'
import AuthLayout from '../../components/layout/AuthLayout'

// Pages — importar cuando existan
import LoginPage from '../../pages/auth/LoginPage'
// import TicketsPage from '../../pages/tickets/TicketsPage'
// import TicketDetailPage from '@/pages/tickets/TicketDetailPage'
// import CreateTicketPage from '@/pages/tickets/CreateTicketPage'
// import DashboardPage from '@/pages/dashboard/DashboardPage'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Si el usuario entra a la raíz "/" y ESTÁ autenticado, va a tickets */}
          {/* <Route path="/" element={<Navigate to="/tickets" replace />} /> */}
          {/* La ruta real de tickets, 100% protegida */}
          {/* <Route path="/tickets" element={<TicketsPage />} /> */}
          {/* <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailPage />} /> */}

          {/* Solo ADMIN y AGENT */}
          {/* <Route element={<RoleGuard allowedRoles={['ADMINISTRADOR', 'AGENTE']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route> */}
        </Route>
      </Route>

      {/*FALLBACK (Cualquier ruta que no exista) */}
      {/* Te manda a la raíz "/", y la raíz evaluará si tienes sesión o no */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter