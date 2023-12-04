// filename: sophisticatedCode.js

// This code generates a random maze using a depth-first search algorithm
// The maze is represented as a grid of cells, where each cell can have walls on any of its four sides
// The starting point is the top-left corner, and the end point is the bottom-right corner
// The code also includes a solver function to find a path from the starting point to the end point

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.walls = [true, true, true, true]; // [top, right, bottom, left]
    this.visited = false;
  }
}

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
    this.current = this.grid[0][0];
    this.stack = [];
    this.solution = [];
  }

  generateMaze() {
    this.current.visited = true;
    while (true) {
      const unvisitedNeighbors = this.getUnvisitedNeighbors();
      if (unvisitedNeighbors.length > 0) {
        const next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.removeWalls(this.current, next);
        this.stack.push(this.current);
        this.current = next;
        this.current.visited = true;
      } else if (this.stack.length > 0) {
        this.current = this.stack.pop();
      } else {
        break;
      }
    }
  }

  getUnvisitedNeighbors() {
    const { row, col } = this.current;
    const neighbors = [];

    if (row > 0 && !this.grid[row - 1][col].visited) {
      neighbors.push(this.grid[row - 1][col]);
    }
    if (col < this.cols - 1 && !this.grid[row][col + 1].visited) {
      neighbors.push(this.grid[row][col + 1]);
    }
    if (row < this.rows - 1 && !this.grid[row + 1][col].visited) {
      neighbors.push(this.grid[row + 1][col]);
    }
    if (col > 0 && !this.grid[row][col - 1].visited) {
      neighbors.push(this.grid[row][col - 1]);
    }

    return neighbors;
  }

  removeWalls(current, next) {
    const rowDiff = current.row - next.row;
    const colDiff = current.col - next.col;

    if (rowDiff === 1) {
      current.walls[0] = false;
      next.walls[2] = false;
    } else if (colDiff === 1) {
      current.walls[3] = false;
      next.walls[1] = false;
    } else if (rowDiff === -1) {
      current.walls[2] = false;
      next.walls[0] = false;
    } else if (colDiff === -1) {
      current.walls[1] = false;
      next.walls[3] = false;
    }
  }

  solveMaze() {
    const start = this.grid[0][0];
    const end = this.grid[this.rows - 1][this.cols - 1];

    const solve = (current) => {
      current.visited = true;
      if (current === end) {
        this.solution.push(current);
        return true;
      }

      const neighbors = this.getValidNeighbors(current);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (!neighbor.visited) {
          if (solve(neighbor)) {
            this.solution.push(current);
            return true;
          }
        }
      }

      return false;
    };

    solve(start);
    this.solution.reverse();
  }

  getValidNeighbors(current) {
    const { row, col } = current;
    const neighbors = [];

    if (!current.walls[0] && row > 0) {
      neighbors.push(this.grid[row - 1][col]);
    }
    if (!current.walls[1] && col < this.cols - 1) {
      neighbors.push(this.grid[row][col + 1]);
    }
    if (!current.walls[2] && row < this.rows - 1) {
      neighbors.push(this.grid[row + 1][col]);
    }
    if (!current.walls[3] && col > 0) {
      neighbors.push(this.grid[row][col - 1]);
    }

    return neighbors;
  }
}

// Usage Example:

const rows = 20;
const cols = 20;

const maze = new Maze(rows, cols);
maze.generateMaze();
maze.solveMaze();

console.log('Generated Maze:');
console.log(maze.grid);
console.log('Solution Path:');
console.log(maze.solution);