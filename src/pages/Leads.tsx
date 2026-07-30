// ─── LEADS ────────────────────────────────────────────────────────────────────
// Listagem completa de todos os leads com filtro por status.

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useLeads } from '../hooks/useLeads'
import type { LeadStatus } from '../types'

const STATUS_LABELS: Record<LeadStatus, string> = {
  novo_contato:      'Novo contato',
  conversando:       'Conversando',
  consulta_agendada: 'Agendado',
  compareceu:        'Compareceu',
  follow_up:         'Follow-up',
  fechado:           'Fechado',
  perdido:           'Perdido',
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  novo_contato:      'var(--status-novo)',
  conversando:       'var(--status-conversa)',
  consulta_agendada: 'var(--status-agendado)',
  compareceu:        'var(--status-compareceu)',
  follow_up:         'var(--status-followup)',
  fechado:           'var(--status-fechado)',
  perdido:           'var(--status-perdido)',
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const color = STATUS_COLORS[status] ?? 'var(--text-sec)'
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      color,
      background: `${color}18`,
      border: `1px solid ${color}40`,
    }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

export default function Leads() {
  const { leads, loading } = useLeads()
  const [busca, setBusca]  = useState('')
  const [filtroStatus, setFiltroStatus] = useState<LeadStatus | 'todos'>('todos')

  const leadsFiltrados = leads.filter(lead => {
    const matchBusca = !busca ||
      lead.nome_lead?.toLowerCase().includes(busca.toLowerCase()) ||
      lead.whatsapp_lead.includes(busca)
    const matchStatus = filtroStatus === 'todos' || lead.status === filtroStatus
    return matchBusca && matchStatus
  })

  if (loading) {
    return <div style={{ color: 'var(--text-sec)', padding: 40 }}>Carregando leads...</div>
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Leads</h1>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 4 }}>
          {leads.length} contatos no total
        </p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {/* Busca */}
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={14} style={{
            position: 'absolute', left: 10, top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)',
          }} />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome ou WhatsApp..."
            style={{
              width: '100%', paddingLeft: 32, padding: '8px 12px 8px 32px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', color: 'var(--text-pri)', fontSize: 13,
              outline: 'none',
            }}
          />
        </div>

        {/* Filtro status */}
        <select
          value={filtroStatus}
          onChange={e => setFiltroStatus(e.target.value as LeadStatus | 'todos')}
          style={{
            padding: '8px 12px', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
            color: 'var(--text-pri)', fontSize: 13, cursor: 'pointer',
          }}
        >
          <option value="todos">Todos os status</option>
          {(Object.keys(STATUS_LABELS) as LeadStatus[]).map(s => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}>
        {leadsFiltrados.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-sec)' }}>
            {busca || filtroStatus !== 'todos'
              ? 'Nenhum lead encontrado com esses filtros.'
              : 'Nenhum lead ainda. Os contatos chegam automaticamente pelo WhatsApp.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Nome', 'WhatsApp', 'Status', 'Motivo', 'Data'].map(h => (
                    <th key={h} style={{
                      padding: '10px 14px', textAlign: 'left',
                      fontSize: 11, fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.map((lead, i) => (
                  <tr key={lead.id} style={{
                    borderBottom: i < leadsFiltrados.length - 1
                      ? '1px solid var(--border)' : 'none',
                  }}>
                    <td style={{ padding: '11px 14px', fontWeight: 500 }}>
                      {lead.nome_lead ?? '—'}
                    </td>
                    <td style={{ padding: '11px 14px', color: 'var(--text-sec)' }}>
                      {lead.whatsapp_lead}
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <StatusBadge status={lead.status} />
                    </td>
                    <td style={{ padding: '11px 14px', color: 'var(--text-sec)', maxWidth: 200 }}>
                      <div className="truncate">{lead.motivo_contato ?? '—'}</div>
                    </td>
                    <td style={{ padding: '11px 14px', color: 'var(--text-sec)', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
