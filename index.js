let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let isPlayerX = false;
let joinCode = '';

function startGame() {
    const nickname = document.getElementById('nickname').value.trim();
    if (nickname === '') {
        alert('Please enter a nickname to start the game.');
        return;
    }
    document.getElementById('nickname').setAttribute('disabled', true);
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    isPlayerX = true;
    updatePlayerInfo(nickname);
    document.getElementById('message').innerText = '';
    generateJoinCode();
}

function joinGame() {
    const nickname = document.getElementById('nickname').value.trim();
    const codeInput = document.getElementById('inviteCode').value.trim();
    if (nickname === '' || codeInput === '') {
        alert('Please enter both nickname and invite code to join the game.');
        return;
    }
    if (codeInput !== joinCode) {
        alert('Invalid invite code. Please enter the correct code to join the game.');
        return;
    }
    document.getElementById('nickname').setAttribute('disabled', true);
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    isPlayerX = false;
    updatePlayerInfo(nickname);
    document.getElementById('message').innerText = '';
}

function resetGame() {
    document.getElementById('nickname').removeAttribute('disabled');
    document.getElementById('nickname').value = '';
    document.getElementById('inviteCode').value = '';
    document.getElementById('playerInfo').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    document.getElementById('message').innerText = '';
}

function updatePlayerInfo(nickname) {
    const playerInfo = document.getElementById('playerInfo');
    playerInfo.innerHTML = `You (${nickname}) are playing as ${isPlayerX ? 'X' : 'O'}.`;
}

function handleClick(index) {
    if (!gameActive || board[index] !== '') return;
    board[index] = isPlayerX ? 'X' : 'O';
    document.getElementsByClassName('cell')[index].innerText = board[index];
    if (checkWinner()) {
        document.getElementById('message').innerText = `Player ${board[index]} wins!`;
        gameActive = false;
    } else if (!board.includes('')) {
        document.getElementById('message').innerText = "It's a draw!";
        gameActive = false;
    } else {
        isPlayerX = !isPlayerX;
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === (isPlayerX ? 'X' : 'O');
        });
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function generateJoinCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 6;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    joinCode = code;
    document.getElementById('inviteCode').value = joinCode;
}