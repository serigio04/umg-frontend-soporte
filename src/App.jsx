import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import DashboardEstudiante from './pages/DashboardEstudiante'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estudiante/dashboard" element={<DashboardEstudiante />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App