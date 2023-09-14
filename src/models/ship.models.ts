export type ShipName =
  | 'carrier'
  | 'battleship'
  | 'cruiser'
  | 'submarine'
  | 'destroyer';

export type ShipInfo = { size: number; count: number };

export type Ship = ShipInfo & {
  name: ShipName;
};
