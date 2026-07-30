// ─── APP — ROTEAMENTO ─────────────────────────────────────────────────────────
// Define as rotas e protege o acesso — usuário não autenticado vê o Login.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout        from './components/Layout'
import Login         from './pages/Login'
import Dashboard     from './pages/Dashboard'
import Leads         from './pages/Leads'
import Kanban        from './pages/Kanban'
import Agendamentos  from './pages/Agendamentos'
import Clientes      from './pages/Clientes'
import Configuracoes from './pages/Configuracoes'

function ProtectedRoutes() {
  const { session, loading } = useAuth()

  // Enquanto verifica se há sessão ativa, mostra tela em branco
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
        Carregando...
      </div>
    )
  }

  // Sem sessão → vai para o login
  if (!session) return <Navigate to="/login" replace />

  return (
    <Layout>
      <Routes>
        <Route path="/"              element={<Dashboard />}     />
        <Route path="/leads"         element={<Leads />}         />
        <Route path="/kanban"        element={<Kanban />}        />
        <Route path="/agendamentos"  element={<Agendamentos />}  />
        <Route path="/clientes"      element={<Clientes />}      />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
        Carregando...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login — se já estiver logado, redireciona para o dashboard */}
        <Route
          path="/login"
          element={session ? <Navigate to="/" replace /> : <Login />}
        />
        {/* Todas as outras rotas são protegidas */}
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
