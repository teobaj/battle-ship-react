import { useGameStore } from '../store/gameStore';
import styles from '../styles/ship.module.css';

export const ShipHits = () => {
  const activeShips = useGameStore((state) => state.activeShips);

  const getHits = (count: number) => {
    return Array.from({ length: count }, () => 'X').toString();
  };
  if (!activeShips.length) {
    return <></>;
  }
  return (
    <ul className={styles.shiphits}>
      {activeShips.map((ship) => (
        <div
          className={
            ship.hits.length === ship.path.length ? styles.destroyed : ''
          }
        >
          {ship.name}: {getHits(ship.hits.length)}
        </div>
      ))}
    </ul>
  );
};
