import { useGameStore } from '../store/gameStore';
import styles from '../styles/ship.module.css';
import { SHIP_IMAGES } from '../utils/shipImages';
import HitImage from '../assets/HitSm.png';

export const ShipHits = () => {
  const activeShips = useGameStore((state) => state.activeShips);

  const getHits = (count: number) => {
    return Array.from({ length: count }, () => (
      <img src={HitImage} className={styles.shiphits_hit} />
    ));
  };
  if (!activeShips.length) {
    return <></>;
  }
  return (
    <ul className={styles.shiphits_list}>
      {activeShips.map((ship) => (
        <div
          className={`${
            ship.hits.length === ship.path.length ? styles.destroyed : ''
          }`}
        >
          <div className={styles.shiphits_item}>
            <img
              className={styles.shiphits_ship}
              src={SHIP_IMAGES[ship.name]}
            />
            : {getHits(ship.hits.length)}
          </div>
        </div>
      ))}
    </ul>
  );
};
