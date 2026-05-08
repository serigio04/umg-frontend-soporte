import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const COLOR_PRIORIDAD = {
  'Alta':  '#e74c3c',
  'Media': '#e67e22',
  'Baja':  '#27ae60'
}

export default function TicketsAsignados() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [idAgente, setIdAgente] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/agentes/perfil')
      .then(r => {
        setIdAgente(r.data.idAgente)
        return api.get(`/agentes/${r.data.idAgente}/tickets`)
      })
      .then(r => setTickets(r.data.filter(t => t.estado === 'Abierto')))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/agente/dashboard')}>← Volver</button>
        <span style={styles.headerTitle}>Mis tickets asignados</span>
        <span />
      </div>

      <div style={styles.container}>
        <p style={styles.contador}>
          {loading ? 'Cargando...' : `${tickets.length} ticket${tickets.length !== 1 ? 's' : ''} abierto${tickets.length !== 1 ? 's' : ''}`}
        </p>

        {!loading && tickets.length === 0 && (
          <p style={styles.empty}>No tienes tickets abiertos asignados</p>
        )}

        <div style={styles.lista}>
          {tickets.map(t => (
            <div key={t.idTicket} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.ticketId}>Ticket #{t.idTicket}</span>
                <span style={{ ...styles.badge, background: COLOR_PRIORIDAD[t.prioridadSLA] || '#999' }}>
                  {t.prioridadSLA}
                </span>
              </div>

              <div style={styles.cardMid}>
                <span style={styles.tipologia}>{t.tipologiaITIL}</span>
                {t.descripcion && <p style={styles.descripcion}>{t.descripcion}</p>}
              </div>

              <div style={styles.cardBottom}>
                <span style={styles.fecha}>
                  {new Date(t.fechaCreacion).toLocaleDateString('es-GT', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </span>
                <button style={styles.verBtn}>Ver detalle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#f4f4f4', fontFamily: 'sans-serif' },
  header: { background: '#1a1a2e', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontWeight: '500', fontSize: '15px' },
  backBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  container: { maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' },
  contador: { fontSize: '13px', color: '#888', marginBottom: '1rem' },
  empty: { textAlign: 'center', color: '#aaa', fontSize: '14px', padding: '3rem 0' },
  lista: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: { background: '#fff', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  ticketId: { fontSize: '14px', fontWeight: '600', color: '#1a1a2e' },
  badge: { fontSize: '11px', padding: '2px 9px', borderRadius: '20px', color: '#fff', fontWeight: '500' },
  cardMid: { marginBottom: '10px' },
  tipologia: { fontSize: '13px', color: '#555', display: 'block' },
  descripcion: { fontSize: '13px', color: '#666', margin: '4px 0 0', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '8px' },
  fecha: { fontSize: '12px', color: '#aaa' },
  verBtn: { fontSize: '12px', padding: '5px 12px', borderRadius: '6px', border: '1px solid #ddd', background: 'transparent', cursor: 'pointer', color: '#555' }
}