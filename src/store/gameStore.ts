import { create } from 'zustand';
import { ActiveShip, Ship, ShipName } from '../models/ship.models';
import { AVAILABLE_SHIPS } from '../utils/shipTypes';
import { STATUS } from '../models/status.models';
import { CellStatus, calculatePath } from '../utils';



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
  history: {ship: ShipName | null, pos: [number, number], type: 'HIT' | 'MISS'}[]

  selectShip: (ship: Ship) => void;
  placeShip: (ship: Ship, positions: [number, number][]) => void;
  setStatus: (status: STATUS) => void;
  attackPosition: (position: [number, number]) => void;
  resetGame: () => void
}

const getInitalBoard = (length: number = 10): number[][] =>
  Array.from({ length }, () => Array.from({ length }).fill(0)) as number[][];


const intialState: Pick<GameStore, 'board' | 'status' | 'previewLayout' | 'activeShips'| 'history'> = {
  board: getInitalBoard(),
  status: 'pregame',
  previewLayout: {
    availableShips: AVAILABLE_SHIPS,
    positions: {
      first: null,
      last: null,
    },
    usedShips: [] satisfies Ship[],
  },
  activeShips: [] satisfies ActiveShip[],
  history: [] satisfies { ship: ShipName, pos: [number, number], type: 'HIT' | 'MISS' }[],

}

export const useGameStore = create<GameStore>((set, get) => ({
  ...intialState,
  selectShip: (ship: Ship) => {
    set((state) => {
      return {
        previewLayout: { ...state.previewLayout, selectedShip: ship },
      };
    });
  },
  attackPosition: (position: [number, number]) => {
    const {board, activeShips, history} = get();
    const cellStatus = CellStatus[board[position[0]][position[1]]];
    let status = get().status;
    if (cellStatus === 'EMPTY') {
      board[position[0]][position[1]] = -1;
      history.push({
        ship: null,
        pos: position,
        type: 'MISS'
      })
    } else {
      board[position[0]][position[1]] = 2;
    
      const shipIndex = activeShips.findIndex((ship) =>
        ship.path.find(
          (path) => path[0] === position[0] && path[1] === position[1]
        )
      );
      activeShips[shipIndex].hits.push(position);
      activeShips[shipIndex].destroyed =
        activeShips[shipIndex].hits.length ===
        activeShips[shipIndex].path.length;

      if (activeShips[shipIndex].destroyed) {
        activeShips[shipIndex].path.forEach(
          (pos) => (board[pos[0]][pos[1]] = -2)
        );
      }
        history.push({
        ship: activeShips[shipIndex].name,
        pos: position,
        type: 'HIT'
      })
    }
    if (activeShips.map((ship) => ship.destroyed).every((value) => value)) {
      status = 'end';
    }

    set({ board, activeShips, status });
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
  resetGame: () => {
    intialState.board = getInitalBoard()
    set({...intialState})
  }
}));

export const selectAvailableShips = (state: GameStore) => {
  return state.previewLayout.availableShips;
};

export const selectCurrentShip = (state: GameStore) => {
  return state.previewLayout.selectedShip;
};
