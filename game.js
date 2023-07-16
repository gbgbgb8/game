let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;

function playGame() {
  let userGuess = document.getElementById('guess').value;
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
    endGame();
  }

  if (attempts === 3 && userGuess != randomNumber) {
    document.getElementById('result').innerHTML = "Sorry, you didn't guess the number. The number was " + randomNumber;
    endGame();
  }

  guessHistory.appendChild(guessResult);
  document.getElementById('guess').value = ""; // clear the input for the next guess
}

function endGame() {
    document.getElementById('guess').disabled = true; // disable input
    document.getElementById('submit-button').style.display = 'none'; // hide submit button

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
    document.getElementById('guess').disabled = false; // enable input
    document.getElementById('submit-button').style.display = 'block'; // show submit button
    document.getElementById('guess-history').innerHTML = ''; // clear guess history
    document.getElementById('result').innerHTML = ''; // clear result
    randomNumber = Math.floor(Math.random() * 10) + 1; // generate new random number
    attempts = 0; // reset attempts
}
