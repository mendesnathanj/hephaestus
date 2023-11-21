import { create } from 'zustand'

const useUiStore = create((set) => ({
  zoom: 1,
  setZoom: (zoom) => set(() => ({ zoom })),
  selections: [],
  items: [],
  mousePos: { x: 0, y: 0 },
  setMousePos: (mousePos) => set(() => ({ mousePos })),
  addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
  addSelections: (newItems) => set((state) => ({ selections: [...state.selections, ...newItems] })),
  clearSelections: () => set(() => ({ selections: [] })),
}));

export default useUiStore;
