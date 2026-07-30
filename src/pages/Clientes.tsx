import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Cliente } from '../types'

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading]   = useState(true)
  const [busca, setBusca]       = useState('')

  useEffect(() => {
    supabase
      .from('clientes_adv')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setClientes(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtrados = clientes.filter(c =>
    !busca ||
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email?.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone?.includes(busca)
  )

  if (loading) return <div style={{ color: 'var(--text-sec)', padding: 40 }}>Carregando...</div>

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Clientes</h1>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 4 }}>
          {clientes.length} clientes cadastrados
        </p>
      </div>

      <div style={{ position: 'relative', maxWidth: 320, marginBottom: 20 }}>
        <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar cliente..."
          style={{ width: '100%', paddingLeft: 32, padding: '8px 12px 8px 32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-pri)', fontSize: 13, outline: 'none' }}
        />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {filtrados.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-sec)' }}>
            {busca ? 'Nenhum cliente encontrado.' : 'Nenhum cliente ainda.'}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Nome', 'E-mail', 'Telefone', 'Cadastrado em'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < filtrados.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '11px 14px', fontWeight: 500 }}>{c.nome}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--text-sec)' }}>{c.email ?? '—'}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--text-sec)' }}>{c.telefone ?? '—'}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--text-sec)', fontSize: 12 }}>
                    {new Date(c.created_at).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
