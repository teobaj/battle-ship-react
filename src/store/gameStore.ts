import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface GameStore {
  board: number[][];
}

const getInitalBoard = (): number[][] =>
  Array.from({ length: 10 }, () =>
    Array.from({ length: 0 }).fill(0)
  ) as number[][];

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (_) => ({
        board: getInitalBoard(),
      }),
      {
        name: 'game-storage',
      }
    )
  )
);
