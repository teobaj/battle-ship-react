import { FC, useEffect, useState } from 'react';
import styles from '../styles/board.module.css';
import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';
import {
  calculatePath,
  isPathEmpty,
  isPathSameSizeAsShip,
  isStraightLine,
} from '../utils';

type PosState = {
  first: [number, number] | null;
  last: [number, number] | null;
};

export const Board: FC = () => {
  const board = useGameStore((state) => state.board);
  const ship = useGameStore((state) => state.previewLayout.selectedShip);
  const placeShip = useGameStore((state) => state.placeShip);
  const status = useGameStore((state) => state.status);
  const [pos, setPos] = useState<PosState>({
    first: null,
    last: null,
  });

  const handleCellClick = (position: [number, number]) => {
    switch (status) {
      case 'pregame':
        handleCellPreGame(position);
        break;
      case 'playing':
      case 'end':
      default:
        console.log('NOOP');
    }
  };

  const handleCellPreGame = (position: [number, number]) => {
    if (!ship) {
      return;
    }
    if (pos.first) {
      if (position[0] === pos.first[0] && position[1] === pos.first[1]) {
        return;
      }
    }
    setPos((state) => {
      if (state.first && !state.last) {
        return {
          first: state.first,
          last: position,
        };
      }
      return {
        first: position,
        last: null,
      };
    });
  };

  const handleCellPlaying = (position: [number, number]) => {
    attackPossition();
  };

  useEffect(() => {
    if (pos.first && pos.last && ship) {
      const path = calculatePath(pos.first, pos.last);

      if (
        isStraightLine(pos.first, pos.last) &&
        isPathSameSizeAsShip(pos.first, pos.last, ship.size) &&
        isPathEmpty(path, board)
      ) {
        placeShip(ship, path);
      } else {
        setPos({ first: null, last: null });
      }
    }
  }, [pos.first, pos.last]);

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${board.length},  32px)`,
        gridTemplateRows: `repeat(${board.length}, 32px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            onClick={() => handleCellClick([rowIndex, colIndex])}
            name={cell}
            status={board[rowIndex][colIndex]}
          />
        ))
      )}
    </div>
  );
};
