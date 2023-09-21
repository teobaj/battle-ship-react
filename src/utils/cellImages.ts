import MissImage from '../assets/MissSm.png';
import HitImage from '../assets/HitSm.png';

export const CELL_IMAGES: Record<string, string> = {
  '-2': HitImage,
  '-1': MissImage,
  '0': '',
  '1': '',
  '2': HitImage,
} as const;
