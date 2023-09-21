export enum CellStatus {
  DESTROYED = -2,
  MISSED = -1,
  EMPTY = 0,
  OCCUPIED = 1,
  HIT = 2,
}

export const isStraightLine = (
  pos1: [number, number],
  pos2: [number, number]
): boolean => {
  if (pos1[0] === pos2[0]) return true;
  if (pos1[1] === pos2[1]) return true;
  return false;
};

/**
 * Calculate the path between two points
 */
export const calculatePath = (
  pos1: [number, number],
  pos2: [number, number]
): [number, number][] => {
  if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
    return [pos1];
  }
  const newArr = [pos1];
  if (pos1[0] === pos2[0]) {
    for (let i = 0; i < Math.abs(pos1[1] - pos2[1]) - 1; i++) {
      newArr.push([pos1[0], pos1[1] + i + 1]);
    }
  }
  if (pos1[1] === pos1[1]) {
    for (let i = 0; i < Math.abs(pos1[0] - pos2[0]) - 1; i++) {
      newArr.push([pos1[0] + i + 1, pos1[1]]);
    }
  }
  newArr.push(pos2);
  return newArr;
};

export const isPathSameSizeAsShip = (
  pos1: [number, number],
  pos2: [number, number],
  shipSize: number
): boolean => {
  if (pos1[0] === pos2[0]) {
    return shipSize === Math.abs(pos1[1] - pos2[1]) + 1;
  }
  return shipSize === Math.abs(pos1[0] - pos2[0]) + 1;
};

export const isPathEmpty = (
  path: [number, number][],
  board: number[][]
): boolean => {
  path.forEach((pos) => {
    if (board[pos[0]][pos[1]]) {
      return false;
    }
  });

  return true;
};
