import { create } from 'zustand';

export type LayoutState = {
  cellSize: number;
  setSmScreen: () => void;
  setLgScreen: () => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  cellSize: 32,
  setSmScreen: () => {
    set({ cellSize: 24 });
  },
  setLgScreen: () => {
    set({ cellSize: 32 });
  },
}));
