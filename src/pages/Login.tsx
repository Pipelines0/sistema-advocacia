// ─── TELA DE LOGIN ────────────────────────────────────────────────────────────
// Aparece quando o usuário não está autenticado.
// Para mudar o logo ou nome do sistema nesta tela, edite a seção "Cabeçalho" abaixo.

import { useState, type FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { signIn }          = useAuth()
  const [email, setEmail]   = useState('')
  const [senha, setSenha]   = useState('')
  const [erro, setErro]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    const { error } = await signIn(email, senha)

    if (error) {
      setErro('E-mail ou senha incorretos. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>

        {/* Cabeçalho — altere aqui o nome do sistema */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 48, height: 48,
            background: 'var(--accent)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 22,
          }}>
            ⚖️
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-pri)', marginBottom: 6 }}>
            {/* Para mudar o nome, edite o texto abaixo */}
            Sistema de Advocacia
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-sec)' }}>
            Faça login para acessar o painel
          </p>
        </div>

        {/* Formulário */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 24px',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-sec)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 12px',
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--text-pri)',
                  fontSize: 14, outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-sec)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 12px',
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--text-pri)',
                  fontSize: 14, outline: 'none',
                }}
              />
            </div>

            {erro && (
              <div style={{
                padding: '10px 12px',
                background: 'rgba(239,68,68,.1)',
                border: '1px solid rgba(239,68,68,.3)',
                borderRadius: 'var(--radius)',
                color: '#f87171',
                fontSize: 13,
                marginBottom: 16,
              }}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                background: loading ? 'var(--border)' : 'var(--accent)',
                color: loading ? 'var(--text-muted)' : '#fff',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
          Acesso restrito ao escritório
        </p>
      </div>
    </div>
  )
}
