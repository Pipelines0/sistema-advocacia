// ─── DASHBOARD ────────────────────────────────────────────────────────────────
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react'
import { useLeads } from '../hooks/useLeads'
import { useAgendamentos } from '../hooks/useAgendamentos'
import type { Lead } from '../types'

function MetricCard({ label, value, icon: Icon, color }: {
  label: string; value: number | string
  icon: React.ComponentType<{ size?: number; color?: string }>; color: string
}) {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 44, height: 44, background: `${color}18`, border: `1px solid ${color}40`, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-pri)' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--text-sec)', marginTop: 2 }}>{label}</div>
      </div>
    </div>
  )
}

const STATUS_COLORS: Record<string, string> = {
  novo_contato: 'var(--status-novo)', conversando: 'var(--status-conversa)',
  consulta_agendada: 'var(--status-agendado)', compareceu: 'var(--status-compareceu)',
  follow_up: 'var(--status-followup)', fechado: 'var(--status-fechado)',
  perdido: 'var(--status-perdido)',
}
const STATUS_LABELS: Record<string, string> = {
  novo_contato: 'Novo', conversando: 'Conversando', consulta_agendada: 'Agendado',
  compareceu: 'Compareceu', follow_up: 'Follow-up', fechado: 'Fechado', perdido: 'Perdido',
}

function LeadTableRow({ lead, last }: { lead: Lead; last: boolean }) {
  const color = STATUS_COLORS[lead.status] ?? 'var(--text-sec)'
  return (
    <tr style={{ borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <td style={{ padding: '11px 14px', fontWeight: 500 }}>{lead.nome_lead ?? 'Sem nome'}</td>
      <td style={{ padding: '11px 14px', color: 'var(--text-sec)' }}>{lead.whatsapp_lead}</td>
      <td style={{ padding: '11px 14px' }}>
        <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, color, background: `${color}18`, border: `1px solid ${color}40` }}>
          {STATUS_LABELS[lead.status] ?? lead.status}
        </span>
      </td>
      <td style={{ padding: '11px 14px', color: 'var(--text-sec)', fontSize: 12 }}>
        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
      </td>
    </tr>
  )
}

export default function Dashboard() {
  const { leads, loading: loadingLeads }               = useLeads()
  const { agendamentos, loading: loadingAgendamentos } = useAgendamentos()

  const hoje      = new Date().toDateString()
  const agendHoje = agendamentos.filter(a => new Date(a.data_hora_inicio).toDateString() === hoje).length
  const novos     = leads.filter(l => l.status === 'novo_contato').length
  const fechados  = leads.filter(l => l.status === 'fechado').length
  const recentes  = leads.slice(0, 8)

  if (loadingLeads || loadingAgendamentos) {
    return <div style={{ color: 'var(--text-sec)', padding: 40 }}>Carregando...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 4 }}>Visão geral do atendimento</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
        <MetricCard label="Total de leads"    value={leads.length} icon={Users}       color="var(--accent)"          />
        <MetricCard label="Novos contatos"    value={novos}        icon={Clock}       color="var(--status-novo)"     />
        <MetricCard label="Agendamentos hoje" value={agendHoje}    icon={Calendar}    color="var(--status-agendado)" />
        <MetricCard label="Clientes fechados" value={fechados}     icon={TrendingUp}  color="var(--status-fechado)"  />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>
          Leads recentes
        </div>
        {recentes.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-sec)' }}>
            Nenhum lead ainda. Os contatos chegam automaticamente pelo WhatsApp.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Nome', 'WhatsApp', 'Status', 'Data'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentes.map((lead, i) => (
                  <LeadTableRow key={lead.id} lead={lead} last={i === recentes.length - 1} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
