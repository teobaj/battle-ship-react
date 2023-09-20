import { FC } from 'react';
import { useGameStore } from '../store/gameStore';
import styles from '../styles/layout.module.css';

export const StatusBar: FC = () => {
  const status = useGameStore((state) => state.status);
  return (
    <div className={styles.statusbar}>
      <span>{status.toUpperCase()}</span>
    </div>
  );
};
