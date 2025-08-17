let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restart-btn');
const guessForm = document.getElementById('guess-form');

const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
progressBar.style.height = '10px';
progressBar.style.width = '100%';
progressBar.style.background = 'rgba(255,255,255,0.2)';
progressBar.style.borderRadius = '6px';
progressBar.style.margin = '18px 0 0 0';
progressBar.innerHTML = '<div id="progress-inner" style="height:100%;width:0;background:linear-gradient(90deg,#ff9800,#4caf50);border-radius:6px;transition:width 0.4s;"></div>';

const attemptsDiv = document.getElementById('attempts');
attemptsDiv.parentNode.insertBefore(progressBar, attemptsDiv);

function animateFeedback() {
    feedback.style.opacity = 0;
    setTimeout(() => { feedback.style.opacity = 1; }, 100);
}

function shakeInput() {
    guessInput.style.transition = 'transform 0.2s';
    guessInput.style.transform = 'translateX(-8px)';
    setTimeout(() => {
        guessInput.style.transform = 'translateX(8px)';
        setTimeout(() => {
            guessInput.style.transform = 'translateX(0)';
        }, 100);
    }, 100);
}

function showConfetti() {
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎊🎉';
    confetti.style.position = 'absolute';
    confetti.style.top = '30%';
    confetti.style.left = '50%';
    confetti.style.transform = 'translate(-50%, -50%) scale(2)';
    confetti.style.fontSize = '3em';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = '0.8';
    document.body.appendChild(confetti);
    setTimeout(() => { confetti.remove(); }, 1200);
}

function updateProgressBar(guess) {
    const diff = Math.abs(randomNumber - guess);
    let percent = 100 - Math.min(diff, 100);
    document.getElementById('progress-inner').style.width = percent + '%';
}

function setFeedback(message, color, icon) {
    feedback.innerHTML = icon ? `<span class='icon'>${icon}</span> ${message}` : message;
    feedback.style.color = color;
    animateFeedback();
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    setFeedback('', '', '');
    attemptsDisplay.textContent = 'Attempts: 0';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    restartBtn.style.display = 'none';
    document.getElementById('progress-inner').style.width = '0';
    guessInput.focus();
}

guessForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userGuess = parseInt(guessInput.value, 10);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setFeedback('Please enter a valid number between 1 and 100.', '#ff3b3b', '❗');
        shakeInput();
        return;
    }
    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    updateProgressBar(userGuess);
    if (userGuess > randomNumber) {
        setFeedback('Too high! Try again.', '#ff9800', '⬆️');
        shakeInput();
    } else if (userGuess < randomNumber) {
        setFeedback('Too low! Try again.', '#ff9800', '⬇️');
        shakeInput();
    } else {
        setFeedback(`Congratulations! You guessed the right number in ${attempts} attempts.`, '#4caf50', '🎉');
        guessInput.disabled = true;
        guessBtn.disabled = true;
        restartBtn.style.display = 'inline-block';
        showConfetti();
        document.getElementById('progress-inner').style.width = '100%';
    }
});

restartBtn.addEventListener('click', resetGame);
window.addEventListener('DOMContentLoaded', () => guessInput.focus());
