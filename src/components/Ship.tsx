import { FC } from 'react';
import { ShipName } from '../models/ship.models';

type ShipProps = {
  isSelected?: boolean;
  name: ShipName;
};

export const Ship: FC<ShipProps> = ({ name }) => {
  return (
    <li>
      <button>{name}</button>
    </li>
  );
};
