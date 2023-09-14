import { ShipInfo, ShipName } from '../models/ship.models';

export const SHIP_TYPES: Record<ShipName, ShipInfo> = {
  carrier: { size: 5, count: 1 },
  battleship: { size: 4, count: 1 },
  cruiser: { size: 3, count: 1 },
  submarine: { size: 3, count: 1 },
  destroyer: { size: 2, count: 1 },
};
