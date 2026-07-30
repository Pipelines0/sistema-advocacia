// ─── CONFIGURAÇÃO DAS PÁGINAS ─────────────────────────────────────────────────
// Este é o arquivo central para gerenciar as páginas do sistema.
//
// Para REMOVER uma página: comente ou apague a linha correspondente.
// Para ADICIONAR uma página: adicione um novo objeto seguindo o mesmo padrão.
//
// Cada página precisa ter:
//   - path: o endereço da página (ex: "/leads")
//   - label: o nome que aparece no menu lateral
//   - icon: o nome do ícone (da biblioteca lucide-react)

export const PAGES = [
  { path: '/',              label: 'Dashboard',     icon: 'LayoutDashboard' },
  { path: '/leads',         label: 'Leads',         icon: 'Users'           },
  { path: '/kanban',        label: 'Kanban',        icon: 'Kanban'          },
  { path: '/agendamentos',  label: 'Agendamentos',  icon: 'Calendar'        },
  { path: '/clientes',      label: 'Clientes',      icon: 'Briefcase'       },
  { path: '/configuracoes', label: 'Configurações', icon: 'Settings'        },
] as const

export type PagePath = typeof PAGES[number]['path']
