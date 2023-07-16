let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
let guessInput = document.getElementById('guess');
let winCount = Number(localStorage.getItem('wins')) || 0;
let lossCount = Number(localStorage.getItem('losses')) || 0;

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
    document.getElementById('message').innerHTML = "Too low! Try again.";
    guessResult.textContent = userGuess + " - Too low";
  } else if (userGuess > randomNumber) {
    document.getElementById('message').innerHTML = "Too high! Try again.";
    guessResult.textContent = userGuess + " - Too high";
  } else {
    showPopup("Congratulations! You got it right!");
    guessResult.textContent = userGuess + " - Correct!";
    winCount++;
    localStorage.setItem('wins', winCount);
    document.getElementById('win-count').textContent = winCount;
    endGame();
  }

  if (attempts === 3 && userGuess != randomNumber) {
    showPopup("Sorry, you didn't guess the number. The number was " + randomNumber);
    lossCount++;
    localStorage.setItem('losses', lossCount);
    document.getElementById('loss-count').textContent = lossCount;
    endGame();
  }

  guessHistory.appendChild(guessResult);
  guessInput.value = ""; // clear the input for the next guess
}

function endGame() {
    guessInput.disabled = true; // disable input
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
    guessInput.disabled = false; // enable input
    document.getElementById('submit-button').style.display = 'block'; // show submit button
    document.getElementById('guess-history').innerHTML = ''; // clear guess history
    document.getElementById('result').innerHTML = ''; // clear result
    document.getElementById('message').innerHTML = ''; // clear message
    randomNumber = Math.floor(Math.random() * 10) + 1; // generate new random number
    attempts = 0; // reset attempts
}

function resetScoreboard() {
  winCount = 0;
  lossCount = 0;
  localStorage.setItem('wins', winCount.toString());
  localStorage.setItem('losses', lossCount.toString());
  document.getElementById('win-count').textContent = winCount;
  document.getElementById('loss-count').textContent = lossCount;
}

// Popup function
function showPopup(message) {
    let popup = document.createElement('div');
    popup.id = "popup-message";
    popup.textContent = message;

    // CSS for the popup
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #333';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';

    document.body.appendChild(popup);

    setTimeout(function() {
        popup.style.display = 'none';
    }, 3000);
}
