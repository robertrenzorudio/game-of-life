import { useCallback, useRef, useState, useMemo, useReducer } from 'react';
import Board from './Board';
import Controls from './Controls';
import { calcNeighbors } from '../lib/calcNeighbors';
import produce from 'immer';
import { ControlState, ControlAction } from '../types/ControlState';

type Props = {};

const controlReduer = (state: ControlState, action: ControlAction) => {
  switch (action.type) {
    case 'SPEED_INPUT':
      return {
        ...state,
        speed: action.payload,
      };
    case 'MAX_GENERATION_INPUT':
      let maxGen = Math.min(1000, action.payload);
      if (isNaN(maxGen)) {
        maxGen = 0;
      }
      return {
        ...state,
        maxGen,
      };
    default:
      return state;
  }
};

const defaultControl = { speed: 600, maxGen: 100 };

const Game = (props: Props) => {
  // Control states and handlers
  const [control, dispatchControl] = useReducer(controlReduer, defaultControl);
  const handleControlChange = (data: ControlAction) => {
    dispatchControl(data);
  };

  // Grid variables and handlers
  const { n, m } = useMemo(() => {
    const { innerWidth, innerHeight } = window;
    const n = ((innerHeight * 0.75) / 32) | 0;
    const m = ((innerWidth * 0.9) / 32) | 0;
    return { n, m };
  }, []);

  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from(Array(n), (_) => Array(m).fill(0))
  );

  const handleGridUpdate = (i: number, j: number) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][j] = 1 - grid[i][j];
    });
    setGrid(newGrid);
  };

  // Generation state
  const [generation, setGeneration] = useState(0);
  const [lastGen, setLastGen] = useState(false);

  // Simulation variables and handlers
  const speedRef = useRef(control.speed);
  speedRef.current = control.speed;

  const maxGenRef = useRef(control.maxGen);
  maxGenRef.current = control.maxGen;

  const curGenRef = useRef(generation);
  curGenRef.current = generation;

  const simulate = useCallback(() => {
    if (maxGenRef.current <= curGenRef.current) {
      setSimulating(false);
      setGeneration(0);
      setLastGen(true);
      return;
    }

    if (!simulatingRef.current) {
      setSimulating(false);
      return;
    }

    setGrid((currGrid) => {
      return produce(currGrid, (newGrid) => {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            let numNeighbors = 0;
            calcNeighbors.forEach((c) => {
              const { ni, nj } = c(i, j);
              if (0 <= ni && ni < n && 0 <= nj && nj < m) {
                numNeighbors += currGrid[ni][nj];
              }
            });
            if (numNeighbors < 2 || numNeighbors > 3) {
              newGrid[i][j] = 0;
            } else if (currGrid[i][j] === 0 && numNeighbors === 3) {
              newGrid[i][j] = 1;
            }
          }
        }
      });
    });

    setGeneration((p) => p + 1);
    setTimeout(simulate, speedRef.current);
  }, [n, m]);

  const simulateOnce = useCallback(() => {
    setGrid((currGrid) => {
      return produce(currGrid, (newGrid) => {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            let numNeighbors = 0;
            calcNeighbors.forEach((c) => {
              const { ni, nj } = c(i, j);
              if (0 <= ni && ni < n && 0 <= nj && nj < m) {
                numNeighbors += currGrid[ni][nj];
              }
            });
            if (numNeighbors < 2 || numNeighbors > 3) {
              newGrid[i][j] = 0;
            } else if (currGrid[i][j] === 0 && numNeighbors === 3) {
              newGrid[i][j] = 1;
            }
          }
        }
      });
    });
    setGeneration((p) => p + 1);
    if (maxGenRef.current <= curGenRef.current) {
      setSimulating(false);
      setGeneration(0);
      setLastGen(true);
      return;
    }
  }, [n, m]);

  const [simulating, setSimulating] = useState(false);
  const simulatingRef = useRef(simulating);
  simulatingRef.current = simulating;

  const handleSimulate = () => {
    setSimulating(!simulating);
    if (!simulating) {
      simulatingRef.current = true;
      simulate();
    }
  };

  const handleReset = () => {
    setLastGen(false);
    setGeneration(0);
  };

  return (
    <div className="flex flex-col space-y-8">
      <Controls
        onSimulate={handleSimulate}
        onSimulateOnce={simulateOnce}
        isSimulating={simulating}
        controlState={control}
        onControlChange={handleControlChange}
        onReset={handleReset}
        isLastGen={lastGen}
      />
      <Board grid={grid} gridDim={{ n, m }} onGridUpdate={handleGridUpdate} />
    </div>
  );
};

export default Game;
