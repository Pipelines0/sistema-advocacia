// ─── APP — ROTEAMENTO ─────────────────────────────────────────────────────────
// Este arquivo define as rotas do sistema (qual URL abre qual página).
// Para adicionar uma página nova:
//   1. Crie o arquivo em src/pages/NomeDaPagina.tsx
//   2. Adicione a rota abaixo
//   3. Adicione o item no menu em src/config/pages.ts

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout      from './components/Layout'
import Dashboard   from './pages/Dashboard'
import Leads       from './pages/Leads'
import Kanban      from './pages/Kanban'
import Agendamentos from './pages/Agendamentos'
import Clientes    from './pages/Clientes'
import Configuracoes from './pages/Configuracoes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"              element={<Dashboard />}    />
          <Route path="/leads"         element={<Leads />}        />
          <Route path="/kanban"        element={<Kanban />}       />
          <Route path="/agendamentos"  element={<Agendamentos />} />
          <Route path="/clientes"      element={<Clientes />}     />
          <Route path="/configuracoes" element={<Configuracoes />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
