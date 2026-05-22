import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardEstudiante from './pages/DashboardEstudiante';
import CrearTicket from './pages/CrearTicket';
import HistorialTickets from './pages/HistorialTickets';
import DashboardAgente from './pages/DashboardAgente';
import TicketsAsignados from './pages/TicketsAsignados';
import DetalleTicket from './pages/DetalleTicket';
import HistorialTicketsAgente from './pages/HistorialTicketsAgente';

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
      </Routes>
    </BrowserRouter>
  )
}

export default App