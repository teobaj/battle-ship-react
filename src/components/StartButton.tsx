import { FC } from 'react';
import { useGameStore } from '../store/gameStore';

export const StartButton: FC = () => {
  const [availableShips, status] = useGameStore((state) => [
    state.previewLayout.availableShips,
    state.status,
  ]);

  const isDisabled = availableShips.length !== 0 || status === 'playing';
  const setStatus = useGameStore((state) => state.setStatus);

  return (
    <button disabled={isDisabled} onClick={() => setStatus('playing')}>
      Start Game
    </button>
  );
};
