// ─── KANBAN ───────────────────────────────────────────────────────────────────
// Quadro Kanban com arrastar e soltar para mover leads entre etapas.

import { useState } from 'react'
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useLeads } from '../hooks/useLeads'
import type { Lead, LeadStatus } from '../types'

// Colunas do Kanban — você pode renomear os títulos aqui
const COLUNAS: { status: LeadStatus; title: string; color: string }[] = [
  { status: 'novo_contato',      title: 'Novos',      color: 'var(--status-novo)'      },
  { status: 'conversando',       title: 'Conversando', color: 'var(--status-conversa)'  },
  { status: 'consulta_agendada', title: 'Agendados',  color: 'var(--status-agendado)'  },
  { status: 'compareceu',        title: 'Compareceu', color: 'var(--status-compareceu)' },
  { status: 'follow_up',         title: 'Follow-up',  color: 'var(--status-followup)'  },
  { status: 'fechado',           title: 'Fechados',   color: 'var(--status-fechado)'   },
]

function LeadCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        background: 'var(--bg-base)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '10px 12px',
        marginBottom: 8,
        display: 'flex',
        gap: 8,
        alignItems: 'flex-start',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div {...attributes} {...listeners} style={{ color: 'var(--text-muted)', marginTop: 2, flexShrink: 0 }}>
        <GripVertical size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-pri)' }}>
          {lead.nome_lead ?? 'Sem nome'}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-sec)', marginTop: 3 }}>
          {lead.whatsapp_lead}
        </div>
        {lead.motivo_contato && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }} className="truncate">
            {lead.motivo_contato}
          </div>
        )}
      </div>
    </div>
  )
}

function Coluna({ status, title, color, leads }: {
  status: LeadStatus; title: string; color: string; leads: Lead[]
}) {
  const { setNodeRef } = useSortable({ id: status })

  return (
    <div style={{
      width: 220,
      flexShrink: 0,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 180px)',
    }}>
      {/* Header da coluna */}
      <div style={{
        padding: '12px 14px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-pri)' }}>{title}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700,
          color, background: `${color}18`,
          padding: '1px 7px', borderRadius: 20,
        }}>
          {leads.length}
        </span>
      </div>

      {/* Cards */}
      <div ref={setNodeRef} style={{ flex: 1, overflowY: 'auto', padding: '10px 10px 4px' }}>
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
        </SortableContext>
        {leads.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
            Vazio
          </div>
        )}
      </div>
    </div>
  )
}

export default function KanbanBoard() {
  const { leads } = useLeads()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  }))

  const activeLead = leads.find(l => l.id === activeId)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    // Descobrir qual coluna o card foi solto
    const novoStatus = COLUNAS.find(c => c.status === over.id)?.status
    if (!novoStatus) return

    // Atualizar status no banco
    await supabase
      .from('leads_adv')
      .update({ status: novoStatus })
      .eq('id', active.id)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 16 }}>
        {COLUNAS.map(col => (
          <Coluna
            key={col.status}
            {...col}
            leads={leads.filter(l => l.status === col.status)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead && <LeadCard lead={activeLead} isDragging />}
      </DragOverlay>
    </DndContext>
  )
}
