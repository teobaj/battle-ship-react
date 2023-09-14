import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ShipInfo, ShipName } from '../models/ship.models';
import { SHIP_TYPES } from '../utils/shipTypes';

export interface GameStore {
  board: number[][];
  previewLayout: {
    selectedShip?: ShipName;
    availableShips: Record<ShipName, ShipInfo>;
  };
}

const getInitalBoard = (length: number = 10): number[][] =>
  Array.from({ length }, () => Array.from({ length }).fill(0)) as number[][];

export const useGameStore = create<GameStore>()(
  devtools((_) => ({
    board: getInitalBoard(),
    previewLayout: {
      availableShips: SHIP_TYPES,
    },
  }))
);

export const selectAvailableShips = (state: GameStore) => {
  return state.previewLayout.availableShips;
};
