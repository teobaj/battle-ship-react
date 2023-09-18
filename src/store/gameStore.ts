import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Ship } from '../models/ship.models';
import { AVAILABLE_SHIPS } from '../utils/shipTypes';
import { STATUS } from '../models/status.models';
import { CellStatus } from '../utils';

export interface GameStore {
  status: STATUS;
  board: number[][];
  previewLayout: {
    selectedShip?: Ship;
    availableShips: Ship[];
    usedShips: Ship[];
  };

  selectShip: (ship: Ship) => void;
  placeShip: (ship: Ship, positions: [number, number][]) => void;
  setStatus: (status: STATUS) => void;
  attackPosition: (position: [number, number]) => void;
}

const getInitalBoard = (length: number = 10): number[][] =>
  Array.from({ length }, () => Array.from({ length }).fill(0)) as number[][];

export const useGameStore = create<GameStore>((set, get) => ({
    board: getInitalBoard(),
    status: 'pregame',
    previewLayout: {
      availableShips: AVAILABLE_SHIPS,
      positions: {
        first: [],
        last: [],
      },
      usedShips: [] as Ship[],
    },
    selectShip: (ship: Ship) => {
      set((state) => {
        return {
          previewLayout: { ...state.previewLayout, selectedShip: ship },
        };
      });
    },
    attackPosition: (position: [number, number]) => {
      const board = get().board;
      const cellStatus = CellStatus[board[position[0]][position[1]]]
      if(cellStatus === 'EMPTY'){
        
      }
    },
    placeShip: (ship: Ship, positions: [number, number][]) => {
      set((state) => {
        const board = state.board;
        positions.forEach((pos) => {
          board[pos[0]][pos[1]] = 1;
        });
        return {
          ...state,
          board,
          previewLayout: {
            ...state.previewLayout,
            usedShips: [...state.previewLayout.usedShips, ship],
            availableShips: state.previewLayout.availableShips.filter(
              (s) => s.name !== ship.name
            ),
            selectedShip: undefined,
          },
        };
      });
    },
    setStatus: (status: STATUS) => {
      set({ status });
    },
  })
);

export const selectAvailableShips = (state: GameStore) => {
  return state.previewLayout.availableShips;
};

export const selectCurrentShip = (state: GameStore) => {
  return state.previewLayout.selectedShip;
};
