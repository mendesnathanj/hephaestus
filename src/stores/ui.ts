import { create } from 'zustand'

const useUiStore = create((set) => ({
  zoom: 1,
  setZoom: (zoom) => set(() => ({ zoom })),
  selections: [],
  addSelections: (newItems) => set((state) => ({ selections: [...state.selections, ...newItems] })),
  clearSelections: () => set(() => ({ selections: [] })),
}));

export default useUiStore;
