import { useLayoutEffect } from 'react';
import { Board } from './components/Board';
import { ResetButton } from './components/ResetButton';
import { Result } from './components/Result';
import { ShipHits } from './components/ShipHits';
import { ShipList } from './components/ShipList';
import { StartButton } from './components/StartButton';
import { StatusBar } from './components/StatusBar';
import { selectCurrentShip, useGameStore } from './store/gameStore';
import styles from './styles/layout.module.css';
import { useLayoutStore } from './store/layoutStore';

function App() {
  const selectedShip = useGameStore(selectCurrentShip);
  const state = useGameStore((state) => state);
  const [setSmScreen, setLgScreen] = useLayoutStore((state) => [state.setSmScreen, state.setLgScreen]);
  const handleWindowResize = () => {
    if (window.innerWidth <= 600) {
      setSmScreen();
      console.log('hi');
    } else {
      setLgScreen();
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  console.log(state);
  return (
    <div className={styles.app}>
      <StatusBar />
      <ShipList />
      <span>{selectedShip?.name}</span>
      <div className={styles.wrapper}>
        <ShipHits />
        <Board />
      </div>
      <Result />
      <StartButton />
      <ResetButton />
    </div>
  );
}

export default App;
