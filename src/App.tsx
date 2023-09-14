import './App.css';
import { Cell } from './components/Cell';
import { ShipList } from './components/ShipList';
import { useGameStore } from './store/gameStore';
import styles from './styles/board.module.css';

function App() {
  const board = useGameStore((state) => state.board);
  console.log(board);
  return (
    <>
      <ShipList />
      <div
        className={styles.board}
        style={{
          gridTemplateColumns: `repeat(${board.length},  1fr)`,
          gridTemplateRows: `repeat(${board.length}, 1fr)`,
        }}
      >
        {board.map((row) => row.map((cell) => <Cell name={cell} />))}
      </div>
    </>
  );
}

export default App;
