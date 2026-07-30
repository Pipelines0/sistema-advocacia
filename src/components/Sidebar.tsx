// ─── SIDEBAR (Menu Lateral) ───────────────────────────────────────────────────
// Para adicionar ou remover itens do menu, edite o arquivo:
// src/config/pages.ts

import { NavLink } from 'react-router-dom'
import { PAGES } from '../config/pages'
import * as Icons from 'lucide-react'

type IconName = keyof typeof Icons

function NavIcon({ name }: { name: string }) {
  const Icon = Icons[name as IconName] as React.ComponentType<{ size?: number; strokeWidth?: number }>
  if (!Icon) return null
  return <Icon size={16} strokeWidth={1.75} />
}

export default function Sidebar() {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      height: '100vh',
      position: 'fixed',
      left: 0, top: 0,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo / Nome do sistema */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 30, height: 30,
          background: 'var(--accent)',
          borderRadius: 'var(--radius)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icons.Scale size={16} strokeWidth={2} color="#fff" />
        </div>
        <div>
          {/* 
            Para mudar o nome do sistema no menu:
            altere o texto abaixo entre as tags <span>
          */}
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-pri)' }}>
            Sistema Adv.
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Painel Administrativo</div>
        </div>
      </div>

      {/* Itens de navegação */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {PAGES.map(page => (
          <NavLink
            key={page.path}
            to={page.path}
            end={page.path === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 'var(--radius)',
              marginBottom: 2,
              color: isActive ? 'var(--accent)' : 'var(--text-sec)',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              fontWeight: isActive ? 500 : 400,
              fontSize: 13,
              transition: 'all 0.15s',
              border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent',
            })}
          >
            <NavIcon name={page.icon} />
            {page.label}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé do sidebar */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        fontSize: 11,
        color: 'var(--text-muted)',
      }}>
        v1.0.0
      </div>
    </aside>
  )
}
