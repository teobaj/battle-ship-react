import { FC, MouseEventHandler } from 'react';
import styles from '../styles/board.module.css';
import { CellStatus } from '../utils';
import { useGameStore } from '../store/gameStore';
import { CELL_IMAGES } from '../utils/cellImages';

type CellProps = {
  name: string | number;
  onClick?: MouseEventHandler;
  status: number;
  pos: [number, number];
  selected: [number, number] | null;
};

export const Cell: FC<CellProps> = ({ name, onClick, status, selected, pos }) => {
  const gameStatus = useGameStore((state) => state.status);
  const getCssClass = (): string => {
    if (gameStatus === 'pregame') {
      if (selected && selected[0] === pos[0] && selected[1] === pos[1]) {
        return 'selected';
      }
      if (CellStatus[status] === 'EMPTY') return '';
      return CellStatus[status]?.toLowerCase();
    }
    if (CellStatus[status] === 'OCCUPIED') {
      return '';
    }
    if (CellStatus[status] === 'EMPTY') return '';
    return CellStatus[status]?.toLowerCase();
  };
  return (
    <button
      className={`${styles.cell} ${styles[getCssClass()]}`}
      style={{ backgroundImage: `url(${CELL_IMAGES[status]})` }}
      onClick={onClick}
    ></button>
  );
};
