document.addEventListener("DOMContentLoaded", function() {
    const timerDisplay = document.getElementById('timer');
    let startTime;
    let timerInterval;
    let solved = false;

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
                input.addEventListener('input', () => {
                    checkSudoku(grid);
                });
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    function generateSudoku() {
        solved = false;
        startTime = new Date().getTime();
        clearInterval(timerInterval);
        updateTimer();
        
        const grid = generateFullGrid();
        const puzzle = removeNumbers(grid, 30); 
        createGrid(puzzle);
    }

    function generateFullGrid() {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        solve(grid);
        return grid;
    }

    function removeNumbers(grid, count) {
        const puzzle = grid.map(row => row.slice());
        let attempts = count;
        while (attempts > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                const temp = puzzle[row][col];
                puzzle[row][col] = 0;

                
                const tempGrid = puzzle.map(row => row.slice());
                tempGrid[row][col] = temp;
                if (!hasUniqueSolution(tempGrid)) {
                    puzzle[row][col] = temp; 
                } else {
                    attempts--;
                }
            }
        }
        return puzzle;
    }

    function solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    const possibleNumbers = shuffle([...Array(9).keys()].map(x => x + 1));
                    for (let num of possibleNumbers) {
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

    function hasUniqueSolution(grid) {
        const tempGrid = grid.map(row => row.slice());
        return solve(tempGrid);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateTimer() {
        timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;
            const minutes = Math.floor(elapsedTime / (1000 * 60));
            const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
            const formattedTime = `${padTime(minutes)}:${padTime(seconds)}`;
            timerDisplay.textContent = formattedTime;
        }, 1000);
    }

    function padTime(val) {
        return val < 10 ? `0${val}` : val;
    }

    function checkSudoku(grid) {
        if (solved) return;

        const currentGrid = getCurrentGrid();
        if (isSudokuSolved(currentGrid)) {
            clearInterval(timerInterval);
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;
            const minutes = Math.floor(elapsedTime / (1000 * 60));
            const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
            const formattedTime = `${padTime(minutes)}:${padTime(seconds)}`;
            showCongratulationsScreen(formattedTime);
            solved = true;
        }
    }

    function getCurrentGrid() {
        const grid = [];
        const table = document.getElementById("sudoku-grid");
        const rows = table.getElementsByTagName("tr");
        for (let i = 0; i < 9; i++) {
            grid.push([]);
            const cells = rows[i].getElementsByTagName("td");
            for (let j = 0; j < 9; j++) {
                const input = cells[j].getElementsByTagName("input")[0];
                grid[i][j] = parseInt(input.value) || 0;
            }
        }
        return grid;
    }

    function isSudokuSolved(grid) {
        
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set();
            const colSet = new Set();
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0 || grid[j][i] === 0) {
                    return false; 
                }
                if (rowSet.has(grid[i][j]) || colSet.has(grid[j][i])) {
                    return false; 
                }
                rowSet.add(grid[i][j]);
                colSet.add(grid[j][i]);
            }
        }

        
        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                const subgridSet = new Set();
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        if (grid[i + k][j + l] === 0) {
                            return false; 
                        }
                        if (subgridSet.has(grid[i + k][j + l])) {
                            return false; 
                        }
                        subgridSet.add(grid[i + k][j + l]);
                    }
                }
            }
        }

        return true;
    }

    function showCongratulationsScreen(time) {
        const congratulationsScreen = document.getElementById('congratulations-screen');
        const congratulationsTime = document.getElementById('congratulations-time');
        congratulationsTime.textContent = time;
        congratulationsScreen.classList.remove('hidden');

        
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', () => {
            congratulationsScreen.classList.add('hidden');
            generateSudoku();
        });
    }
});
