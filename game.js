// Initialize the game state
let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
let winCount = 0;
let lossCount = 0;

// Update the guesses display with the player's current guess
function displayGuesses(guess) {
    document.getElementById('guesses').textContent += 'Your guess: ' + guess + '\n';
}

// Append a number to the current guess
function appendNumber(number) {
    let guessInput = document.getElementById('guess');
    guessInput.value = guessInput.value.toString() + number.toString();
    displayGuesses(guessInput.value);  // Display the current guess as the player enters it
}

// Clear the current guess
function clearGuess() {
    document.getElementById('guess').value = '';
}

// Play the game
function playGame() {
    let guess = Number(document.getElementById('guess').value);
    let message = '';

    // If the guess is not a number, display a warning and return
    if (isNaN(guess)) {
        message = 'Please enter a number between 1 and 10.';
    }
    else if (guess < 1 || guess > 10) {
        // If the guess is not within the range, display a warning and return
        message = 'Your guess is out of range. Please enter a number between 1 and 10.';
    }
    else {
        attempts++;

        // Determine if the guess is too high, too low, or correct, and display an appropriate message
        if (guess > randomNumber) {
            message = guess + ' - Too high!';
        }
        else if (guess < randomNumber) {
            message = guess + ' - Too low!';
        }
        else {
            message = guess + ' - Correct! You won!';
            winCount++;
            document.getElementById('win-count').textContent = winCount;
            resetGame();
        }

        // If the player has had 3 attempts without guessing correctly, they lose
        if (attempts >= 3 && guess != randomNumber) {
            message += '\nYou lost! The number was ' + randomNumber + '.';
            lossCount++;
            document.getElementById('loss-count').textContent = lossCount;
            resetGame();
        }
    }

    // Display the guesses and the message
    
    document.getElementById('guesses').textContent += message + '\n';
    document.getElementById('guess').value = '';  // Clear the current guess

    // If the game is over, display the 'Play Again' button
    if (message.includes('won') || message.includes('lost')) {
        document.getElementById('play-again').style.display = 'block';
    }
}

// Reset the game state
function resetGame() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;
    document.getElementById('guess').value = '';
    document.getElementById('guesses').textContent = '';
    document.getElementById('play-again').style.display = 'none';
}

// Reset the scoreboard
function resetScoreboard() {
    winCount = 0;
    lossCount = 0;
    document.getElementById('win-count').textContent = winCount;
    document.getElementById('loss-count').textContent = lossCount;
}

// Start the game after a delay
function startGame() {
    let splashScreen = document.getElementById('splash-screen');
    splashScreen.style.opacity = '0';

    setTimeout(function() {
        splashScreen.style.display = 'none';
    }, 1000);
}
