// ─── TIPOS DO SISTEMA ────────────────────────────────────────────────────────
// Este arquivo define a estrutura dos dados usados em todo o sistema.
// Cada tipo corresponde a uma tabela no banco de dados (Supabase).

export type LeadStatus =
  | 'novo_contato'
  | 'conversando'
  | 'consulta_agendada'
  | 'compareceu'
  | 'follow_up'
  | 'fechado'
  | 'perdido'

export type AgendamentoStatus =
  | 'agendado'
  | 'confirmado'
  | 'compareceu'
  | 'faltou'
  | 'cancelado'

// Lead: contato que chegou pelo WhatsApp
export interface Lead {
  id: string
  whatsapp_lead: string
  nome_lead: string | null
  status: LeadStatus
  motivo_contato: string | null
  resumo_conversa: string | null
  data_agendamento: string | null
  follow_up_date: string | null
  follow_up_message: string | null
  inicio_atendimento: string | null
  updated_at: string
  created_at: string
}

// Cliente: lead que virou cliente
export interface Cliente {
  id: string
  lead_id: string | null
  nome: string
  email: string | null
  telefone: string | null
  cpf: string | null
  observacoes: string | null
  created_at: string
  updated_at: string
}

// Advogado
export interface Advogado {
  id: string
  nome: string
  email: string | null
  telefone: string | null
  ativo: boolean
  created_at: string
}

// Agendamento: consulta marcada
export interface Agendamento {
  id: string
  lead_id: string | null
  advogado_id: string | null
  data_hora_inicio: string
  data_hora_fim: string
  status: AgendamentoStatus
  google_event_id: string | null
  observacoes: string | null
  created_at: string
  updated_at: string
  // relações
  lead?: Lead
  advogado?: Advogado
}

// Configuração do escritório
export interface OfficeConfig {
  id: number
  nome: string
  logo_url: string | null
  favicon_url: string | null
  updated_at: string
}
