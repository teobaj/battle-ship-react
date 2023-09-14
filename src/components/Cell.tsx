import { FC } from 'react';

type CellProps = {
  name: string | number;
};

export const Cell: FC<CellProps> = ({ name }) => {
  return <button>{name}</button>;
};
