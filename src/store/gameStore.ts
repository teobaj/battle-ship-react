import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Ship } from '../models/ship.models';
import { AVAILABLE_SHIPS } from '../utils/shipTypes';
import { STATUS } from '../models/status.models';
import { CellStatus, calculatePath } from '../utils';

type ActiveShip = Ship & {
  path: number[][];
  hits: number[][];
  destroyed: boolean;
};

export interface GameStore {
  status: STATUS;
  board: number[][];
  previewLayout: {
    selectedShip?: Ship;
    availableShips: Ship[];
    positions: {
      first: [number, number] | null;
      last: [number, number] | null;
    };
    usedShips: Ship[];
  };
  activeShips: ActiveShip[];

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
      first: null,
      last: null,
    },
    usedShips: [] as Ship[],
  },
  activeShips: [] as ActiveShip[],

  selectShip: (ship: Ship) => {
    set((state) => {
      return {
        previewLayout: { ...state.previewLayout, selectedShip: ship },
      };
    });
  },
  attackPosition: (position: [number, number]) => {
    const board = get().board;
    const activeShips = get().activeShips;
    const cellStatus = CellStatus[board[position[0]][position[1]]];
    if (cellStatus === 'EMPTY') {
      board[position[0]][position[1]] = -1;
    } else {
      board[position[0]][position[1]] = 2;
      const shipIndex = activeShips.findIndex((ship) =>
        ship.path.find(
          (path) => path[0] === position[0] && path[1] === position[1]
        )
      );
      activeShips[shipIndex].hits.push(position);
    }
    set({ board, activeShips });
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
        activeShips: [
          ...state.activeShips,
          { ...ship, hits: [], path: positions, destroyed: false },
        ],
      };
    });
  },
  setStatus: (status: STATUS) => {
    set({ status });
  },
}));

export const selectAvailableShips = (state: GameStore) => {
  return state.previewLayout.availableShips;
};

export const selectCurrentShip = (state: GameStore) => {
  return state.previewLayout.selectedShip;
};
