import CarrierImage from '../assets/Carrier Shape.png';
import CruiserImage from '../assets/Cruiser Shape.png';
import AircraftImage from '../assets/Aircraft Shape.png';
import BattleShipImage from '../assets/Battleship Shape.png';
import SubmarineImage from '../assets/Submarine Shape.png';
import { ShipName } from '../models/ship.models';

export const SHIP_IMAGES: Record<ShipName, string> = {
  carrier: CarrierImage,
  cruiser: CruiserImage,
  battleship: BattleShipImage,
  submarine: SubmarineImage,
  destroyer: AircraftImage,
} as const;
