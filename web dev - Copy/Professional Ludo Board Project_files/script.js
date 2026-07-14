let turn = 'red';
let rolledValue = 0;
let canRoll = true;

const diceUI = document.getElementById('dice-ui');
const turnTitle = document.getElementById('turn-title');
const statusLog = document.getElementById('status-log');

const diceIcons = ['🎲', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function rollDice() {
    if (!canRoll) return;
    canRoll = false;

    diceUI.classList.add('dice-shake');
    
    setTimeout(() => {
        rolledValue = Math.floor(Math.random() * 6) + 1;
        diceUI.innerText = diceIcons[rolledValue];
        diceUI.classList.remove('dice-shake');
        
        statusLog.innerText = `Rolled a ${rolledValue}!`;

        // If not 6 and token is at home, automatic skip to test logic
        if (rolledValue !== 6) {
            setTimeout(() => {
                switchTurn();
            }, 1000);
        } else {
            statusLog.innerText = `Click your token to deploy!`;
        }
    }, 400);
}

function movePawn(color) {
    if (color !== turn || rolledValue === 0) return;

    // Mini simulation: Release pawn into the board grid on 6
    if (rolledValue === 6) {
        const activePawn = document.getElementById(`${color}-1`);
        // Find the first open path cell to drop the pawn dynamically
        const firstCell = document.querySelector(`.cell`);
        if (firstCell) {
            firstCell.appendChild(activePawn);
            statusLog.innerText = `Token Deployed Successfully!`;
        }
    }
    
    setTimeout(() => {
        switchTurn();
    }, 800);
}

function switchTurn() {
    turn = (turn === 'red') ? 'green' : 'red'; // Toggles between active players
    turnTitle.innerText = turn.charAt(0).toUpperCase() + turn.slice(1);
    turnTitle.style.color = (turn === 'red') ? '#e74c3c' : '#2ecc71';
    
    rolledValue = 0;
    canRoll = true;
    statusLog.innerText = `Roll the dice!`;
}