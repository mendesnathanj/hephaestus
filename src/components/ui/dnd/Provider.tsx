import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Provider({ children }) {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  )
}
