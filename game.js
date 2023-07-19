let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
let guessInput = document.getElementById('guess');
let winCount = 0;
let lossCount = 0;

let winEmojis = ["🥳", "🎉", "🏆", "💪"];
let loseEmojis = ["😢", "💔", "👎", "🙁"];
let tieEmojis = ["😐", "🤝", "😶", "🤷"];

function getRandomEmoji(emojiArray) {
    let randomIndex = Math.floor(Math.random() * emojiArray.length);
    return emojiArray[randomIndex];
}

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
        document.getElementById('message').innerHTML = "Too low! Try again. " + getRandomEmoji(loseEmojis);
        guessResult.textContent = userGuess + " - Too low";
    } else if (userGuess > randomNumber) {
        document.getElementById('message').innerHTML = "Too high! Try again. " + getRandomEmoji(loseEmojis);
        guessResult.textContent = userGuess + " - Too high";
    } else {
        showPopup("Congratulations! You got it right! " + getRandomEmoji(winEmojis));
        guessResult.textContent = userGuess + " - Correct!";
        winCount++;
        document.getElementById('win-count').textContent = winCount;
        endGame();
    }

    if (attempts === 3 && userGuess != randomNumber) {
        showPopup("Sorry, you didn't guess the number. The number was " + randomNumber + " " + getRandomEmoji(loseEmojis));
        lossCount++;
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

// Popup function
function showPopup(message) {
    let popup = document.createElement('div');
    popup.id = "popup-message";
    popup.innerHTML = message;

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

    let countdown = 3;
    let countdownElement = document.createElement('p');
    countdownElement.textContent = "New game in: " + countdown;
    popup.appendChild(countdownElement);

    document.body.appendChild(popup);

    let countdownTimer = setInterval(function() {
        countdown -= 1;
        countdownElement.textContent = "New game in: " + countdown;

        if (countdown <= 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = "";
            popup.style.display = 'none';
            resetGame();
        }
    }, 1000); // decrease the countdown every second
}
