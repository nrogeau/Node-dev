import React, { useState, useEffect } from 'react';

const GameOfLife = () => {

  const gridSize = 10;
  const [running, setRunning] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [numCells, setNumCells] = useState(25);
  const numRows = numCells;
  const numColumns = numCells;
  const [grid, setGrid] = useState(Array.from({ length: numRows }, () => Array(numColumns).fill(false)));

  const handleMouseDown = (x, y) => {
    const newGrid = [...grid];
    newGrid[y][x] = !newGrid[y][x]; // Toggle cell state
    setGrid(newGrid);
  };

  const handleMouseEnter = (x, y) => {
    if (mouseDown) {
      const newGrid = [...grid];
      newGrid[y][x] = true; // Mark cell as alive
      setGrid(newGrid);
    }
  };

  const calculateNextGeneration = () => {
    setGrid(prevGrid => {
      return prevGrid.map((row, y) =>
        row.map((cell, x) => {
          const neighbors = countNeighbors(x, y);

          // Apply Conway's rules
          if (cell) {
            return neighbors >= 2 && neighbors <= 3; // Cell survives if neighbors are between threshold and 3
          } else {
            return neighbors === 3; // Cell becomes alive if exactly 3 neighbors
          }
        })
      );
    });
  };

  const countNeighbors = (x, y) => {
    let neighbors = 0;

    // Loop through all the neighbors (including diagonals)
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Skip the cell itself

        const newX = x + i;
        const newY = y + j;

        if (newX >= 0 && newX < numColumns && newY >= 0 && newY < numRows) {
          if (grid[newY][newX]) {
            neighbors++;
          }
        }
      }
    }

    return neighbors;
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        calculateNextGeneration();
      }, speed);

      return () => clearInterval(interval);
    }
  }, [running, grid]);

  return (
    <div
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
    >
      <h2>Game of Life Grid</h2>

      {/* Slider to control simulation speed */}
      <div>
        <label>Simulation speed: {speed}</label>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          value={speed} 
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
      </div>

      {/* Slider to control grid size */}
      <div>
        <label>Number of cells: {numCells}</label>
        <input 
          type="range" 
          min="10" 
          max="25" 
          value={numCells} 
          onChange={(e) => setNumCells(parseInt(e.target.value))}
        />
      </div>

      <figure>
        <svg viewBox={`0 0 ${gridSize * numColumns} ${gridSize * numRows}`}>
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <rect
                key={`${x}-${y}`}
                x={x * gridSize + 0.5}
                y={y * gridSize + 0.5}
                width={gridSize - 1}
                height={gridSize - 1}
                fill={cell ? 'rgb(50, 150, 150)' : 'hsl(250 10% 93%)'}
                onMouseDown={() => handleMouseDown(x, y)}
                onMouseEnter={() => handleMouseEnter(x, y)}
              />
            ))
          )}
        </svg>
      </figure>

      {/* Play/Pause button */}
      <button onClick={() => setRunning(prev => !prev)}>
        {running ? 'Pause' : 'Play'}
      </button>

      {/* Clean button */}
      <button onClick={() => setGrid(Array.from({ length: numRows }, () => Array(numColumns).fill(false)))}>
        Clean
      </button>

    </div>
  );
};

export default GameOfLife;
