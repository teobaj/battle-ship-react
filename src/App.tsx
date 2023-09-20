import { Board } from './components/Board';
import { Result } from './components/Result';
import { ShipHits } from './components/ShipHits';
import { ShipList } from './components/ShipList';
import { StartButton } from './components/StartButton';
import { StatusBar } from './components/StatusBar';
import { selectCurrentShip, useGameStore } from './store/gameStore';
import styles from './styles/layout.module.css';

function App() {
  const selectedShip = useGameStore(selectCurrentShip);
  const state = useGameStore((state) => state);
  console.log(state);
  return (
    <div className={styles.app}>
      <StatusBar />
      <ShipList />
      <ShipHits />
      <span>{selectedShip?.name}</span>
      <Board />
      <StartButton />
      <Result />
    </div>
  );
}

export default App;
