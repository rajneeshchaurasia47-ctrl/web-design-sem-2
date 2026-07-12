// Game State
let currentPlayer = 'red'; 
let diceValue = 0;
let hasRolled = false;

// Track positions (0 means Home, 1-6 are track cells)
let positions = {
    red: 0,
    green: 0
};

const diceBtn = document.getElementById('dice-btn');
const diceResult = document.getElementById('dice-result');
const currentPlayerText = document.getElementById('current-player');

// 1. Roll Dice Function with CSS Rotation Trigger
function rollDice() {
    if (hasRolled) return; // Prevent multiple rolls before moving

    hasRolled = true;
    
    // Trigger CSS Animation
    diceResult.classList.add('dice-rolling');
    diceBtn.disabled = true;

    setTimeout(() => {
        // Generate random number between 1 and 6
        diceValue = Math.floor(Math.random() * 6) + 1;
        diceResult.innerText = `🎲 ${diceValue}`;
        diceResult.classList.remove('dice-rolling');
        
        // Logic: If token is at home and didn't roll a 6 (simplified rule for demonstration)
        // In this mini version, we allow them to move or skip if stuck
        if (positions[currentPlayer] === 0 && diceValue !== 6) {
            setTimeout(() => {
                alert(`Rolled ${diceValue}! You need a 6 to release token from Home. Turn skips!`);
                switchTurn();
            }, 600);
        }
    }, 500);
}

// 2. Move Token Function with Event States
function moveToken(player) {
    if (!hasRolled || player !== currentPlayer) return;

    // Release from home on 6, or move if already on track
    if (positions[player] === 0 && diceValue === 6) {
        positions[player] = 1;
    } else if (positions[player] > 0) {
        positions[player] += diceValue;
    }

    // Check Win Condition (Max track length is 6 cells)
    if (positions[player] > 6) {
        positions[player] = 6; // Cap at cell 6
    }

    updateBoard();
    
    // Check if player won
    if (positions[player] === 6) {
        setTimeout(() => {
            alert(`🎉 Player ${player.toUpperCase()} Won the Game!`);
            resetGame();
        }, 400);
        return;
    }

    switchTurn();
}

// 3. UI Update Logic (Smoothly appends tokens to target cells)
function updateBoard() {
    ['red', 'green'].forEach(player => {
        const token = document.getElementById(`${player}-token`);
        const currentPos = positions[player];

        if (currentPos === 0) {
            // Put back to home zone
            document.querySelector(`.${player}-home`).appendChild(token);
        } else {
            // Move smoothly to the specific track cell
            const targetCell = document.getElementById(`cell-${currentPos}`);
            if (targetCell) {
                targetCell.appendChild(token);
            }
        }
    });
}

// 4. Turn Management
function switchTurn() {
    currentPlayer = (currentPlayer === 'red') ? 'green' : 'red';
    currentPlayerText.innerText = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    currentPlayerText.className = `player-${currentPlayer}`;
    
    // Reset states for next turn
    hasRolled = false;
    diceBtn.disabled = false;
}

// Reset Game
function resetGame() {
    positions.red = 0;
    positions.green = 0;
    currentPlayer = 'red';
    hasRolled = false;
    diceBtn.disabled = false;
    diceResult.innerText = `🎲 -`;
    updateBoard();
}