import { FC, useState } from 'react';
import { selectAvailableShips, useGameStore } from '../store/gameStore';
import { Ship } from './Ship';
import styles from '../styles/ship.module.css';

export const ShipList: FC = () => {
  const ships = useGameStore(selectAvailableShips);
  const [direction, setDirection] = useState<'row' | 'column'>('column');

  const changeDirection = () => {
    setDirection((state) => (state === 'column' ? 'row' : 'column'));
  };
  return (
    <div>
      {/* <button onClick={changeDirection}>🔄</button> */}
      <ul style={{ flexDirection: direction }} className={styles.shiplist}>
        {ships.map(({ name, size }) => (
          <li className={direction === 'row' ? styles.rotate : ''}>
            <Ship name={name} length={size} />
          </li>
        ))}
      </ul>
    </div>
  );
};
