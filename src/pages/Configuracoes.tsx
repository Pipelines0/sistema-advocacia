import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../lib/supabase'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  color: 'var(--text-pri)',
  fontSize: 14,
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-sec)',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
}

export default function Configuracoes() {
  const [nome, setNome]   = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase
      .from('office_config')
      .select('nome')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data) setNome(data.nome)
      })
  }, [])

  const handleSave = async () => {
    await supabase
      .from('office_config')
      .upsert({ id: 1, nome })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Configurações</h1>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 4 }}>
          Dados gerais do escritório
        </p>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        maxWidth: 480,
      }}>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Nome do escritório</label>
          <input
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Ex: Silva & Associados Advocacia"
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '9px 18px',
            background: saved ? 'var(--status-fechado)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          <Save size={14} />
          {saved ? 'Salvo!' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
