import { FC } from 'react';
import { useGameStore } from '../store/gameStore';

export const StartButton: FC = () => {
  const availableShips = useGameStore(
    (state) => state.previewLayout.availableShips
  );
  const isDisabled = availableShips.length !== 0;
  const setStatus = useGameStore((state) => state.setStatus);

  return (
    <button disabled={isDisabled} onClick={() => setStatus('playing')}>
      Start Game
    </button>
  );
};
