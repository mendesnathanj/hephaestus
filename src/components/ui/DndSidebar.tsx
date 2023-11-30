import { DragSourceMonitor, useDrag } from 'react-dnd';

export default function DndSidebar() {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ComponentChild',
      item: { id: -1 },
    }),
    [],
  )

  return (
    <div className="w-1/3 flex flex-wrap gap-4 h-screen border-r border-neutral-300">
      <div ref={drag} style={{ backgroundColor: 'purple', height: '100px', width: '100px'}} />
      Sidebar
    </div>
  )
}
