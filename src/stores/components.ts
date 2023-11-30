import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const id1 = uuidv4();

const TEST_DATA = [
  {
    id: id1,
    parentId: null,
    styles: {
      'background-color': 'red',
      padding: '1rem',
    },
  },
  {
    id: uuidv4(),
    parentId: id1,
    styles: {
      'background-color': 'blue',
      padding: '1rem',
    },
  },
  {
    id: uuidv4(),
    parentId: id1,
    styles: {
      'background-color': 'yellow',
      padding: '1rem',
    },
  },
];

const useComponentsStore = create((set) => ({
  components: TEST_DATA,
  children: (id) => {
    // return
  },
  setComponents: (newComponents) => set(() => ({ components: newComponents })),
  updateComponent: (id, newData) => set((state) => {
    const component = state.components.find((c) => c.id === id);
    const updated = { ...component, ...newData };

    console.log('updated: ', updated);

    const updatedComponents = state.components.map((c) => {
      if (c.id !== id) return c;

      return updated;
    });

    return ({ components: updatedComponents });
  }),
  addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
  addComponents: (newItems) => set((state) => ({ selections: [...state.selections, ...newItems] })),
  clearSelections: () => set(() => ({ selections: [] })),
}));

export default useComponentsStore;
