let difficulty = 'easy';
let randomNumber, maxAttempts;

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

    if (attempts === maxAttempts && userGuess != randomNumber) {
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
    setDifficultyParameters(); // set parameters according to the selected difficulty level
    attempts = 0; // reset attempts
}

function startGame() {
    let splashScreen = document.getElementById('splash-screen');
    splashScreen.style.opacity = '0';

    setTimeout(function() {
        splashScreen.style.display = 'none';
    }, 1000);

    setDifficultyParameters();
    document.getElementById('splash-text').textContent = "We have selected a random number for the " + difficulty + " level. You have " + maxAttempts + " attempts to guess it:";
}

function setDifficultyParameters() {
    let difficultySelect = document.getElementById('difficulty');
    difficulty = difficultySelect.options[difficultySelect.selectedIndex].value;

    if (difficulty === 'easy') {
        randomNumber = Math.floor(Math.random() * 10) + 1;
        maxAttempts = 3;
        guessInput.setAttribute('max', '10');
    } else if (difficulty === 'medium') {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        maxAttempts = 7;
        guessInput.setAttribute('max', '100');
    } else {
        randomNumber = Math.floor(Math.random() * 1000) + 1;
        maxAttempts = 9;
        guessInput.setAttribute('max', '1000');
    }
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
