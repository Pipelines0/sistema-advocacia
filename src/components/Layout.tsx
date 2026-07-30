// ─── LAYOUT PRINCIPAL ────────────────────────────────────────────────────────
// Este componente envolve todas as páginas.
// Ele monta o sidebar + a área de conteúdo principal.

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        padding: '28px 32px',
        minHeight: '100vh',
        overflow: 'auto',
      }}>
        <Outlet />
      </main>
    </div>
  )
}
