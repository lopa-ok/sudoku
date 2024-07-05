document.addEventListener("DOMContentLoaded", function() {
    generateSudoku();

    function createGrid(grid) {
        const table = document.getElementById("sudoku-grid");
        table.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                if (grid[i][j] !== 0) {
                    input.value = grid[i][j];
                    input.disabled = true;
                }
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    function generateSudoku() {
        const grid = generateFullGrid();
        const puzzle = removeNumbers(grid, 40); // Adjust the number of removed numbers as needed
        createGrid(puzzle);
    }

    function generateFullGrid() {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        solve(grid);
        return grid;
    }

    function solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function isSafe(grid, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num || grid[x][col] === num || grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                return false;
            }
        }
        return true;
    }

    function removeNumbers(grid, count) {
        const puzzle = grid.map(row => row.slice());
        let attempts = count;
        while (attempts > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                attempts--;
            }
        }
        return puzzle;
    }
});
