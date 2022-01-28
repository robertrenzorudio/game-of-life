type Props = {
  grid: number[][];
  gridDim: { n: number; m: number };
  onGridUpdate: (i: number, j: number) => void;
};

const Board = ({ grid, gridDim, onGridUpdate }: Props) => {
  const { m } = gridDim;
  return (
    <div className="mx-auto w-auto overflow-hidden">
      <div
        className="border border-red-1100"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${m}, 32px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((_, j) => (
            <div
              key={`${i},${j}`}
              onClick={onGridUpdate.bind(this, i, j)}
              className={`w-8 h-8 border-gray-300  ${
                grid[i][j] ? 'animate-boxGrow bg-red-1000' : 'border'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
