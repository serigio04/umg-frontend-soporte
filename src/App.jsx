import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardEstudiante from './pages/DashboardEstudiante';
import CrearTicket from './pages/CrearTicket';
import HistorialTickets from './pages/HistorialTickets';
import DashboardAgente from './pages/DashboardAgente';
import TicketsAsignados from './pages/TicketsAsignados';
import DetalleTicket from './pages/DetalleTicket';
import HistorialTicketsAgente from './pages/HistorialTicketsAgente';
import CrearAgente from './pages/CrearAgente';
import CrearEstudiante from './pages/CrearEstudiante';
import DashboardCoordinador from './pages/DashboardCoordinador';
import TicketsCoordinador from './pages/HistorialTicketsCoordinador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudiante/dashboard" element={<DashboardEstudiante />} />
        <Route path="/estudiante/tickets"        element={<HistorialTickets />} />
        <Route path="/tickets/nuevo"  element={<CrearTicket />} /> 
        <Route path="/agente/dashboard" element={<DashboardAgente />} />
        <Route path="/agente/tickets" element={<TicketsAsignados />} />
        <Route path="/tickets/:idTicket" element={<DetalleTicket />} />
        <Route path="/agente/tickets/historial" element={<HistorialTicketsAgente />} />
        <Route path="/agente/crear-agente" element={<CrearAgente />} />
        <Route path="/agente/crear-estudiante" element={<CrearEstudiante />} />
        <Route path="/coordinador/dashboard" element={<DashboardCoordinador />} />
        <Route path="/coordinador/tickets" element={<TicketsCoordinador />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App