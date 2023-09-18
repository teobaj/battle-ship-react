import { FC, MouseEventHandler } from 'react';
import styles from '../styles/board.module.css';
import { CellStatus } from '../utils';
import { useGameStore } from '../store/gameStore';

type CellProps = {
  name: string | number;
  onClick?: MouseEventHandler;
  status: number;
};

export const Cell: FC<CellProps> = ({ name, onClick, status }) => {
  const getCssClass = (): string => {
    if (CellStatus[status] === 'EMPTY') return '';
    return CellStatus[status].toLowerCase();
  };

  return (
    <button
      className={`${styles.cell} ${styles[getCssClass()]}`}
      onClick={onClick}
    ></button>
  );
};
