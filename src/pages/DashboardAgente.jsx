import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const COLOR_PRIORIDAD = {
  'Alta':  '#e74c3c',
  'Media': '#e67e22',
  'Baja':  '#27ae60'
}

const COLOR_ESTADO = {
  'Abierto':    '#2980b9',
  'En Proceso': '#e67e22',
  'Pendiente':  '#8e44ad',
  'Resuelto':   '#27ae60',
  'Cerrado':    '#7f8c8d'
}

export default function DashboardAgente() {
  const [agente, setAgente] = useState(null)
  const [ticketPrioridad, setTicketPrioridad] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/agentes/perfil').then(ticket => {
      setAgente(ticket.data)
      return api.get(`/agentes/${ticket.data.idAgente}/ticket-prioridad`)
    })
    .then(r => setTicketPrioridad(r.data))
    .catch(() => setTicketPrioridad(null))
  }, [])

  function cerrarSesion() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>Sistema de Soporte UMG — Agente</span>
        <button onClick={cerrarSesion} style={styles.logoutBtn}>Cerrar sesión</button>
      </div>

      {/* Sección 1 — Acciones */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Acciones rápidas</h3>
        <div style={styles.btnGroup}>
          <button style={styles.actionBtn} onClick={() => navigate(`/agente/tickets`)}>
            🎫 Mis tickets asignados
          </button>
          <button style={styles.actionBtn} onClick={() => navigate(`/agente/tickets/historial`)}>
            📋 Historial de tickets
          </button>
          <button style={styles.actionBtn} onClick={() => navigate('/tickets/nuevo')}>
            ➕ Crear ticket
          </button>
          {agente?.esGerencial && (
            <>
              <button style={{ ...styles.actionBtn, ...styles.actionBtnGerencial }}
                onClick={() => navigate('/agente/crear-estudiante')}>
                👤 Nuevo estudiante
              </button>
              <button style={{ ...styles.actionBtn, ...styles.actionBtnGerencial }}
                onClick={() => navigate('/agente/crear-agente')}>
                🛠️ Nuevo agente
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sección 2 — Grid */}
      <div style={styles.grid}>

        {/* 2.1 Perfil del agente */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h4 style={styles.cardTitle}>Mi perfil</h4>
            {agente?.esGerencial && (
              <span style={styles.gerencialBadge}>Gerencial</span>
            )}
          </div>
          {agente ? (
            <div>
              <InfoRow label="Nombre"       value={agente.nombreCompleto} />
              <InfoRow label="Correo"       value={agente.correoInstitucional} />
              <InfoRow label="Especialidad" value={agente.especialidad} />
              <InfoRow label="Sede"         value={agente.sedeAsignada} />
              <InfoRow label="Nivel acceso" value={agente.nivelAcceso} />
            </div>
          ) : (
            <p style={styles.loading}>Cargando...</p>
          )}
        </div>

        {/* 2.2 Ticket de mayor prioridad */}
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Ticket de mayor prioridad</h4>
          {ticketPrioridad === undefined ? (
            <p style={styles.loading}>Cargando...</p>
          ) : ticketPrioridad === null ? (
            <p style={styles.loading}>No tienes tickets abiertos asignados</p>
          ) : (
            <div>
              <InfoRow label="Ticket #" value={ticketPrioridad.idTicket} />
              <InfoRow label="Tipo"     value={ticketPrioridad.tipologiaITIL} />
              <InfoRow label="Fecha"    value={new Date(ticketPrioridad.fechaCreacion).toLocaleDateString('es-GT', {
                day: '2-digit', month: 'short', year: 'numeric'
              })} />
              {ticketPrioridad.descripcion && (
                <div style={styles.descRow}>
                  <span style={styles.rowLabel}>Descripción</span>
                  <span style={styles.descValor}>{ticketPrioridad.descripcion}</span>
                </div>
              )}
              <div style={styles.row}>
                <span style={styles.rowLabel}>Prioridad</span>
                <span style={{ ...styles.badge, background: COLOR_PRIORIDAD[ticketPrioridad.prioridadSLA] }}>
                  {ticketPrioridad.prioridadSLA}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.rowLabel}>Estado</span>
                <span style={{ ...styles.badge, background: COLOR_ESTADO[ticketPrioridad.estado] }}>
                  {ticketPrioridad.estado}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.rowLabel}>Estudiante</span>
                <span style={styles.descValor}>
                  {ticketPrioridad.carne}
                </span>
              </div>
              <button
                style={{ ...styles.actionBtn, marginTop: '1rem', width: '100%' }}
                onClick={() => navigate(`/agente/tickets`)}
              >
                Ver todos mis tickets
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
      <span style={{ fontSize: '13px', color: '#888' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a2e' }}>{value}</span>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#f4f4f4', fontFamily: 'sans-serif' },
  header: { background: '#1a1a2e', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontWeight: '500', fontSize: '15px' },
  logoutBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  section: { padding: '1.5rem 2rem 0' },
  sectionTitle: { fontSize: '15px', fontWeight: '500', color: '#1a1a2e', marginBottom: '1rem' },
  btnGroup: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  actionBtn: { padding: '10px 20px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  actionBtnGerencial: { background: '#6c3483' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.5rem 2rem' },
  card: { background: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  cardTitle: { fontSize: '14px', fontWeight: '600', color: '#1a1a2e' },
  gerencialBadge: { fontSize: '11px', padding: '2px 9px', borderRadius: '20px', background: '#6c3483', color: '#fff', fontWeight: '500' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  rowLabel: { fontSize: '13px', color: '#888' },
  badge: { fontSize: '11px', padding: '2px 10px', borderRadius: '20px', color: '#fff', fontWeight: '500' },
  descRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  descValor: { fontSize: '13px', color: '#1a1a2e', lineHeight: '1.5', textAlign: 'right', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  loading: { fontSize: '13px', color: '#aaa', textAlign: 'center', padding: '1rem 0' }
}