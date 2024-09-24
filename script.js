const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const playerXWinsElement = document.getElementById('playerXWins');
const playerOWinsElement = document.getElementById('playerOWins');

let currentPlayer = 'X';
let gameActive = true;
let playerXWins = 0;
let playerOWins = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

let gameState = Array(9).fill(null);

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== null || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        updateScore();
        gameActive = false;
    } else if (!gameState.includes(null)) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const checkWinner = () => {
    return winningCombinations.some(combination => {
        const isWinningCombo = combination.every(index => gameState[index] === currentPlayer);
        if (isWinningCombo) {
            highlightWinningCells(combination);
        }
        return isWinningCombo;
    });
};

const highlightWinningCells = (combination) => {
    combination.forEach(index => {
        cells[index].style.backgroundColor = '#aaffaa'; // Highlight winning cells
    });
};


const updateScore = () => {
    if (currentPlayer === 'X') {
        playerXWins++;
        playerXWinsElement.textContent = playerXWins;
    } else {
        playerOWins++;
        playerOWinsElement.textContent = playerOWins;
    }
};

const restartGame = () => {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });
    gameActive = true;
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
