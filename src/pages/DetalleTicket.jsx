import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

const COLOR_ESTADO = {
  'Abierto': '#2980b9',
  'EnProceso': '#e67e22',
  'Pendiente': '#8e44ad',
  'Resuelto': '#27ae60',
  'Cerrado': '#7f8c8d'
}

export default function DetalleTicket() {
  const { idTicket } = useParams()
  const [ticket, setTicket] = useState(null)
  const [nuevoEstado, setNuevoEstado] = useState('')
  const [comentario, setComentario] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/tickets/${idTicket}`)
      .then(r => {
        setTicket(r.data)
        setNuevoEstado(r.data.estado)
      })
      .catch(() => setTicket(null))
      .finally(() => setLoading(false))
  }, [idTicket])

  async function handleCambiarEstado(e) {
    e.preventDefault()
    if (nuevoEstado === ticket.estado) return
    
    setEnviando(true)
    try {
      await api.put(`/tickets/${idTicket}/estado`, { nuevoEstado, comentario })
      navigate(-1)
    } catch (err) {
      alert(err.response?.data?.message || 'Error al cambiar estado')
    } finally {
      setEnviando(false)
    }
  }

  if (loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</p>
  if (!ticket) return <p style={{ padding: '2rem', textAlign: 'center' }}>Ticket no encontrado</p>

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Volver</button>
        <span style={styles.title}>Ticket #{ticket.idTicket}</span>
        <span />
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Detalles del ticket</h3>
          <InfoRow label="Tipología" value={ticket.tipologiaITIL} />
          <InfoRow label="Descripción" value={ticket.descripcion} />
          <InfoRow label="Fecha creación" value={new Date(ticket.fechaCreacion).toLocaleDateString('es-GT')} />
          <div style={styles.row}>
            <span style={styles.label}>Estado actual</span>
            <span style={{ ...styles.badge, background: COLOR_ESTADO[ticket.estado] }}>
              {ticket.estado}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Horas restantes</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: ticket.vencido ? '#c0392b' : '#27ae60' }}>
              {ticket.vencido ? '⚠️ Vencido' : `${ticket.horasRestantes}h`}
            </span>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Cambiar estado</h3>
          <form onSubmit={handleCambiarEstado}>
            <div style={styles.field}>
              <label style={styles.label}>Nuevo estado</label>
              <select
                style={styles.select}
                value={nuevoEstado}
                onChange={e => setNuevoEstado(e.target.value)}
              >
                <option value="Abierto">Abierto</option>
                <option value="EnProceso">En Proceso</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Resuelto">Resuelto</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Comentario (opcional)</label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                placeholder="Comentario técnico..."
              />
            </div>
            <button type="submit" style={{ ...styles.btn, opacity: enviando ? 0.7 : 1 }} disabled={enviando}>
              {enviando ? 'Guardando...' : 'Cambiar estado'}
            </button>
          </form>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Historial de cambios</h3>
          {ticket.historial.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '13px' }}>Sin cambios registrados</p>
          ) : (
            <div style={styles.timeline}>
              {ticket.historial.map((h, i) => (
                <div key={i} style={styles.timelineItem}>
                  <span style={{ ...styles.timelineDot, background: COLOR_ESTADO[h.estado] }} />
                  <div style={styles.timelineContent}>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{h.estado}</span>
                    <span style={{ fontSize: '12px', color: '#aaa' }}>
                      {new Date(h.fecha).toLocaleString('es-GT')}
                    </span>
                    {h.comentario && <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0' }}>{h.comentario}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span style={{ fontSize: '13px', color: '#1a1a2e' }}>{value}</span>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#f4f4f4', fontFamily: 'sans-serif' },
  header: { background: '#1a1a2e', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  title: { fontWeight: '500', fontSize: '15px' },
  container: { maxWidth: '600px', margin: '1.5rem auto', padding: '0 1rem' },
  card: { background: '#fff', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize: '14px', fontWeight: '600', color: '#1a1a2e', marginBottom: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  label: { fontSize: '13px', color: '#888' },
  badge: { fontSize: '11px', padding: '2px 10px', borderRadius: '20px', color: '#fff', fontWeight: '500' },
  field: { marginBottom: '1rem' },
  select: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'sans-serif' },
  btn: { width: '100%', padding: '10px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  timeline: { display: 'flex', flexDirection: 'column', gap: '12px' },
  timelineItem: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  timelineDot: { width: '12px', height: '12px', borderRadius: '50%', marginTop: '2px', flexShrink: 0 },
  timelineContent: { display: 'flex', flexDirection: 'column', gap: '2px' }
}