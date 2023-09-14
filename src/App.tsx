import './App.css';
import { useGameStore } from './store/gameStore';

function App() {
  const board = useGameStore((state) => state.board);
  console.log(board);
  return <></>;
}

export default App;
