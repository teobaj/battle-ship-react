import './App.css';
import { Board } from './components/Board';
import { Result } from './components/Result';
import { ShipHits } from './components/ShipHits';
import { ShipList } from './components/ShipList';
import { StartButton } from './components/StartButton';
import { StatusBar } from './components/StatusBar';
import { selectCurrentShip, useGameStore } from './store/gameStore';

function App() {
  const selectedShip = useGameStore(selectCurrentShip);
  const state = useGameStore((state) => state);
  console.log(state);
  return (
    <>
      <StatusBar />
      <ShipList />
      <br />
      <span>{selectedShip?.name}</span>
      <br />
      <Board />
      <br />
      <ShipHits />
      <StartButton />
      <Result />
    </>
  );
}

export default App;
