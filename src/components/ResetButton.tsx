import { FC } from 'react';
import { useGameStore } from '../store/gameStore';

export const ResetButton: FC = () => {
  const resetGame = useGameStore((state) => state.resetGame);
  return <button onClick={resetGame}>Reset Game</button>;
};
