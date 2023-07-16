let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
let guessInput = document.getElementById('guess');

let winCount = localStorage.getItem('wins') || 0;
let lossCount = localStorage.getItem('losses') || 0;
document.getElementById('win-count').textContent = winCount;
document.getElementById('loss-count').textContent = lossCount;

function appendNumber(number) {
    guessInput.value += number;
}

function clearGuess() {
    guessInput.value = '';
}

function playGame() {
    let userGuess = guessInput.value;
    attempts++;

    let guessHistory = document.getElementById('guess-history');
    let guessResult = document.createElement('li');

    if (userGuess < randomNumber) {
        document.getElementById('result').innerHTML = "Too low! Try again.";
        guessResult.textContent = userGuess + " - Too low";
    } else if (userGuess > randomNumber) {
        document.getElementById('result').innerHTML = "Too high! Try again.";
        guessResult.textContent = userGuess + " - Too high";
    } else {
        document.getElementById('result').innerHTML = "Congratulations! You got it right!";
        guessResult.textContent = userGuess + " - Correct!";
        endGame(true);
    }

    if (attempts === 3 && userGuess != randomNumber) {
        document.getElementById('result').innerHTML = "Sorry, you didn't guess the number. The number was " + randomNumber;
        endGame(false);
    }

    guessHistory.appendChild(guessResult);
    guessInput.value = ""; // clear the input for the next guess
}

function endGame(isWin) {
    guessInput.disabled = true; // disable input
    document.getElementById('submit-button').style.display = 'none'; // hide submit button

    if (isWin) {
        winCount++;
        localStorage.setItem('wins', winCount);
        document.getElementById('win-count').textContent = winCount;
    } else {
        lossCount++;
        localStorage.setItem('losses', lossCount);
        document.getElementById('loss-count').textContent = lossCount;
    }

    // start the countdown
    let countdown = 3;
    let countdownDisplay = document.getElementById('countdown');
    countdownDisplay.textContent = "New game in: " + countdown;

    let countdownTimer = setInterval(function() {
        countdown -= 1;
        countdownDisplay.textContent = "New game in: " + countdown;

        if (countdown <= 0) {
            clearInterval(countdownTimer);
            countdownDisplay.textContent = "";
            resetGame();
        }
    }, 1000); // decrease the countdown every second
}

function resetGame() {
    guessInput.disabled = false; // enable input
    document.getElementById('submit-button').style.display = 'block'; // show submit button
    document.getElementById('guess-history').innerHTML = ''; // clear guess history
    document.getElementById('result').innerHTML = ''; // clear result
    randomNumber = Math.floor(Math.random() * 10) + 1; // generate new random number
    attempts = 0; // reset attempts
}

function resetScoreboard() {
    winCount = 0;
    lossCount = 0;
    document.getElementById('win-count').textContent = winCount;
    document.getElementById('loss-count').textContent = lossCount;
    localStorage.removeItem('wins');
    localStorage.removeItem('losses');
}
