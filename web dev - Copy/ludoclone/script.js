let turn = 'red';
let rolledValue = 0;
let canRoll = true;

const diceUI = document.getElementById('dice-ui');
const diceNumDisplay = document.getElementById('dice-number-display');
const turnTitle = document.getElementById('turn-title');
const statusLog = document.getElementById('status-log');

const diceIcons = ['🎲', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const colorMap = {
    red: '#e74c3c',
    green: '#2ecc71',
    blue: '#3498db',
    yellow: '#f1c40f'
};
const turnOrder = ['red', 'green', 'yellow', 'blue'];

function rollDice() {
    if (!canRoll) return;
    canRoll = false;

    diceUI.classList.add('dice-shake');
    diceNumDisplay.innerText = "Rolling...";
    
    setTimeout(() => {
        rolledValue = Math.floor(Math.random() * 6) + 1;
        
        // Update both Icon and Exact Number clearly
        diceUI.innerText = diceIcons[rolledValue];
        diceNumDisplay.innerText = `Number: ${rolledValue}`;
        diceUI.classList.remove('dice-shake');
        
        statusLog.innerText = `Rolled a ${rolledValue}!`;

        // Simplified Turn Rule: Skip if not a 6 (For full game logic deployment)
        if (rolledValue !== 6) {
            statusLog.innerText = `Need a 6 to open! Next Turn.`;
            setTimeout(() => {
                switchTurn();
            }, 1200);
        } else {
            statusLog.innerText = `Click any ${turn.toUpperCase()} token to release!`;
        }
    }, 500);
}

function movePawn(color, pawnId) {
    if (color !== turn || rolledValue === 0) return;

    if (rolledValue === 6) {
        const selectedPawn = document.getElementById(`${color}-${pawnId}`);
        // Finds an open path track cell to deploy the clicked pawn
        const trackCell = document.querySelector(`.cell`);
        if (trackCell) {
            trackCell.appendChild(selectedPawn);
            statusLog.innerText = `${color.toUpperCase()} Token ${pawnId} Deployed!`;
        }
    }
    
    setTimeout(() => {
        switchTurn();
    }, 1000);
}

function switchTurn() {
    let currentIndex = turnOrder.indexOf(turn);
    let nextIndex = (currentIndex + 1) % turnOrder.length;
    turn = turnOrder[nextIndex];

    // UI Updates
    turnTitle.innerText = turn.charAt(0).toUpperCase() + turn.slice(1);
    turnTitle.style.color = colorMap[turn];
    
    rolledValue = 0;
    canRoll = true;
    diceNumDisplay.innerText = `Number: -`;
    statusLog.innerText = `Roll the dice!`;
}