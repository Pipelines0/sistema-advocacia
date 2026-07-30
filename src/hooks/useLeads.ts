// ─── HOOK DE LEADS ───────────────────────────────────────────────────────────
// Este hook busca os leads do banco e escuta atualizações em tempo real.
// Qualquer componente que precisar dos leads deve usar este hook.

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Lead } from '../types'

export function useLeads() {
  const [leads, setLeads]       = useState<Lead[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    // Busca inicial
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('leads_adv')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setLeads(data ?? [])
      }
      setLoading(false)
    }

    fetchLeads()

    // Escuta mudanças em tempo real — atualiza a tela automaticamente
    const channel = supabase
      .channel('leads-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'leads_adv',
      }, () => {
        // Quando qualquer mudança ocorrer, rebusca todos os leads
        fetchLeads()
      })
      .subscribe()

    // Limpa a conexão quando o componente for desmontado
    return () => { supabase.removeChannel(channel) }
  }, [])

  return { leads, loading, error }
}
