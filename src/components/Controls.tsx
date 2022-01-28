import { ControlState, ControlAction } from '../types/ControlState';

type Props = {
  onSimulate: () => void;
  onSimulateOnce: () => void;
  isSimulating: boolean;
  controlState: ControlState;
  onControlChange: (data: ControlAction) => void;
  onReset: () => void;
  isLastGen: boolean;
  generation: number;
};

const Controls = ({
  onSimulate,
  isSimulating,
  controlState,
  onControlChange,
  onSimulateOnce,
  onReset,
  isLastGen,
  generation,
}: Props) => {
  return (
    <div className="flex items-center mx-auto border  rounded-3xl h-16 shadow-lg w-3/5">
      <div className="w-full h-full flex flex-col p-5 rounded-3xl hover:bg-gray-200 justify-center space-y-1">
        <label htmlFor="speed" className="text-gray-700 font-semibold">
          Speed
        </label>
        <input
          onChange={(e) => {
            onControlChange({
              type: 'SPEED_INPUT',
              payload: parseInt(e.target.value),
            });
          }}
          name="speed"
          type="range"
          min="200"
          max="1800"
          step="100"
          value={controlState.speed}
        />
      </div>

      <div className="group w-full h-full flex flex-col  p-5 rounded-3xl hover:bg-gray-200 justify-center space-y-1">
        <label htmlFor="max-gen" className="text-gray-700 font-semibold">
          Max Generation
        </label>
        <input
          disabled={isSimulating}
          onChange={(e) => {
            onControlChange({
              type: 'MAX_GENERATION_INPUT',
              payload: parseInt(e.target.value),
            });
          }}
          name="max-gen"
          type="input"
          value={controlState.maxGen}
          className="bg-gray-100 group-hover:bg-gray-200 text-gray-700 focus:outline-none w-full"
        />
      </div>

      <div className="group w-full h-full flex flex-col p-5 rounded-3xl hover:bg-gray-200 justify-center space-y-1">
        <p className="text-gray-700 font-semibold">Current Generation</p>
        <p className="text-gray-700">{generation}</p>
      </div>

      <div className="flex space-x-4 p-5 h-full rounded-3xl hover:rounded-3xl hover:bg-gray-200 items-center">
        <button
          onClick={onReset}
          className="rounded-full bg-red-1000 hover:bg-red-1100 h-12 w-12 disabled:bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 24 24"
            className="stroke-gray-100 h-4 w-4  mx-auto"
          >
            <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
          </svg>
        </button>
        <button
          onClick={onSimulateOnce}
          disabled={isSimulating || isLastGen}
          className="rounded-full bg-red-1000 hover:bg-red-1100 h-12 w-12 disabled:bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 24 24"
            className="stroke-gray-100 h-4 w-4  mx-auto"
          >
            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
          </svg>
        </button>
        <button
          disabled={isLastGen}
          onClick={onSimulate}
          className="group rounded-full bg-red-1000 hover:bg-red-1100  disabled:bg-gray-500"
        >
          <div className="group flex items-center h-12 w-12">
            {!isSimulating ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 24 24"
                className="stroke-gray-100 h-4 w-4  mx-auto"
              >
                <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 24 24"
                className="stroke-gray-100 h-4 w-4  mx-auto"
              >
                <path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Controls;
