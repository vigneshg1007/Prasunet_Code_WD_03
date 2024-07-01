// Game variables
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Win conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

// Function to handle cell click
const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if cell is already clicked or game is paused
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Handle cell click
    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#F44336';

    // Check game status
    handleResultValidation();

    // Switch player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayer + "'s turn";
};

// Function to check if there's a winner
const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        const cellA = gameState[a];
        const cellB = gameState[b];
        const cellC = gameState[c];
        if (cellA !== '' && cellA === cellB && cellA === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = currentPlayer + ' wins!';
        gameActive = false;
        highlightWinningCells();
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }
};

// Function to highlight winning cells
const highlightWinningCells = () => {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];
        cellA.style.backgroundColor = '#4CAF50';
        cellB.style.backgroundColor = '#4CAF50';
        cellC.style.backgroundColor = '#4CAF50';
    }
};

// Function to restart the game
const handleRestartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = currentPlayer + "'s turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#ddd';
    });
};

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestartGame);
