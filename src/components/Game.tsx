import { useCallback, useRef, useState, useMemo, useReducer } from 'react';
import Board from './Board';
import Controls from './Controls';
import { calcNeighbors } from '../lib/calcNeighbors';
import produce from 'immer';
import { ControlState, ControlAction } from '../types/ControlState';
import { generateGrid } from '../lib/generateGrid';

type Props = {};

const controlReduer = (state: ControlState, action: ControlAction) => {
  switch (action.type) {
    case 'SPEED_INPUT':
      return {
        ...state,
        speed: Math.max(action.payload, 200),
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

const defaultControl = { speed: 200, maxGen: 100 };

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

  const [grid, setGrid] = useState<number[][]>(() => generateGrid(n, m));

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
    if (maxGenRef.current <= curGenRef.current) {
      setSimulating(false);
      setLastGen(true);
      return;
    }
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
    if (maxGenRef.current <= curGenRef.current + 1) {
      setSimulating(false);
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
    setSimulating(false);
    setLastGen(false);
    setGeneration(0);
    setGrid(generateGrid(n, m));
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
        generation={generation}
      />
      <Board grid={grid} gridDim={{ n, m }} onGridUpdate={handleGridUpdate} />
    </div>
  );
};

export default Game;
