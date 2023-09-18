import { FC } from 'react';
import { useGameStore } from '../store/gameStore';

export const StatusBar: FC = () => {
  const status = useGameStore((state) => state.status);
  return (
    <div>
      <span>{status}</span>
    </div>
  );
};
