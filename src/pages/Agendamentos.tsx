import { useAgendamentos } from '../hooks/useAgendamentos'
import type { AgendamentoStatus, Agendamento } from '../types'

const STATUS_LABELS: Record<AgendamentoStatus, string> = {
  agendado: 'Agendado', confirmado: 'Confirmado',
  compareceu: 'Compareceu', faltou: 'Faltou', cancelado: 'Cancelado',
}
const STATUS_COLORS: Record<AgendamentoStatus, string> = {
  agendado: 'var(--status-agendado)', confirmado: 'var(--status-compareceu)',
  compareceu: 'var(--status-fechado)', faltou: 'var(--status-perdido)',
  cancelado: 'var(--status-perdido)',
}

function Tabela({ items, titulo }: { items: Agendamento[]; titulo: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-sec)', marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
        {titulo} ({items.length})
      </div>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {items.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            Nenhum agendamento
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Lead', 'Data', 'Horário', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((ag, i) => {
                const inicio = new Date(ag.data_hora_inicio)
                const fim    = new Date(ag.data_hora_fim)
                const color  = STATUS_COLORS[ag.status] ?? 'var(--text-sec)'
                const lead   = ag as Agendamento & { lead?: { nome_lead: string | null } }
                return (
                  <tr key={ag.id} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '11px 14px', fontWeight: 500 }}>{lead.lead?.nome_lead ?? 'Sem nome'}</td>
                    <td style={{ padding: '11px 14px', color: 'var(--text-sec)' }}>{inicio.toLocaleDateString('pt-BR')}</td>
                    <td style={{ padding: '11px 14px', color: 'var(--text-sec)' }}>
                      {inicio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} –{' '}
                      {fim.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, color, background: `${color}18`, border: `1px solid ${color}40` }}>
                        {STATUS_LABELS[ag.status]}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default function Agendamentos() {
  const { agendamentos, loading } = useAgendamentos()
  if (loading) return <div style={{ color: 'var(--text-sec)', padding: 40 }}>Carregando...</div>

  const hoje         = new Date().toDateString()
  const agendHoje    = agendamentos.filter(a => new Date(a.data_hora_inicio).toDateString() === hoje)
  const agendFuturos = agendamentos.filter(a => new Date(a.data_hora_inicio) > new Date() && new Date(a.data_hora_inicio).toDateString() !== hoje)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Agendamentos</h1>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 4 }}>{agendamentos.length} agendamentos no total</p>
      </div>
      <Tabela items={agendHoje}    titulo="Hoje"     />
      <Tabela items={agendFuturos} titulo="Próximos" />
    </div>
  )
}
