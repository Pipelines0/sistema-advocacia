import KanbanBoard from '../components/KanbanBoard'

export default function Kanban() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Kanban</h1>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 4 }}>
          Arraste os cards para mover leads entre as etapas
        </p>
      </div>
      <KanbanBoard />
    </div>
  )
}
