document.addEventListener("DOMContentLoaded", function() {
    const initialGrid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    function createGrid(grid) {
        const table = document.getElementById("sudoku-grid");
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

    createGrid(initialGrid);
});
