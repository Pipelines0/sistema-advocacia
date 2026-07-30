// ─── SIDEBAR (Menu Lateral) ───────────────────────────────────────────────────
// Para adicionar ou remover itens do menu, edite: src/config/pages.ts

import { NavLink } from 'react-router-dom'
import { PAGES } from '../config/pages'
import { useAuth } from '../hooks/useAuth'
import {
  LayoutDashboard, Users, Kanban, Calendar, Briefcase, Settings, LogOut,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, Users, Kanban, Calendar, Briefcase, Settings,
}

export default function Sidebar() {
  const { signOut } = useAuth()

  return (
    <aside style={{
      width: 'var(--sidebar-w)', background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)', height: '100vh',
      position: 'fixed', left: 0, top: 0,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Logo / Nome do sistema */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, background: 'var(--accent)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Briefcase size={16} strokeWidth={2} color="#fff" />
        </div>
        <div>
          {/* Para mudar o nome no menu lateral, altere o texto abaixo */}
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-pri)' }}>Sistema Adv.</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Painel Administrativo</div>
        </div>
      </div>

      {/* Itens de navegação */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {PAGES.map(page => {
          const Icon = ICON_MAP[page.icon]
          return (
            <NavLink
              key={page.path}
              to={page.path}
              end={page.path === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 'var(--radius)', marginBottom: 2,
                color: isActive ? 'var(--accent)' : 'var(--text-sec)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                fontWeight: isActive ? 500 : 400, fontSize: 13,
                border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent',
              })}
            >
              {Icon && <Icon size={16} strokeWidth={1.75} />}
              {page.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Botão de logout */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={signOut}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '8px 10px',
            background: 'none', border: '1px solid transparent',
            borderRadius: 'var(--radius)', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: 13,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#ef4444'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,.08)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'none'
          }}
        >
          <LogOut size={16} strokeWidth={1.75} />
          Sair
        </button>
      </div>
    </aside>
  )
}
