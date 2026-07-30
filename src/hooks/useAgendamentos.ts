import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Agendamento } from '../types'

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState<string | null>(null)

  useEffect(() => {
    const fetchAgendamentos = async () => {
      const { data, error } = await supabase
        .from('agendamentos_adv')
        .select('*, lead:leads_adv(nome_lead, whatsapp_lead)')
        .order('data_hora_inicio', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setAgendamentos(data ?? [])
      }
      setLoading(false)
    }

    fetchAgendamentos()

    const channel = supabase
      .channel('agendamentos-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agendamentos_adv',
      }, () => { fetchAgendamentos() })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { agendamentos, loading, error }
}
