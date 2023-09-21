import { FC } from 'react';
import { useGameStore } from '../store/gameStore';

export const Result: FC = () => {
  const history = useGameStore((state) => state.history);
  const lastElement = history[history.length - 1];
  return <div>{lastElement?.type ?? ''}</div>;
};
