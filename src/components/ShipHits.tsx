import { useGameStore } from '../store/gameStore';

export const ShipHits = () => {
  const activeShips = useGameStore((state) => state.activeShips);

  const getHits = (count: number) => {
    return Array.from({ length: count }, () => 'X').toString();
  };

  return (
    <ul>
      {activeShips.map((ship) => (
        <div className={ship.hits.length === ship.path.length ? 'destroyed' : ''}>
          {ship.name}: {getHits(ship.hits.length)}
        </div>
      ))}
    </ul>
  );
};
