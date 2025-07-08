const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const finalScoreDisplay = document.getElementById('final-score');
const gameOverScreen = document.querySelector('.game-over');

let score = 0;
let timeLeft = 30;
let gameTimer = null;
let moleTimer = null;
let currentHole = null;
let moleSpeed = 1000;

function randomHole() {
  holes.forEach(hole => hole.classList.remove('mole'));
  const index = Math.floor(Math.random() * holes.length);
  currentHole = holes[index];
  currentHole.classList.add('mole');
}

function startGame() {
  score = 0;
  timeLeft = 30;
  moleSpeed = 1000;
  updateScore();
  updateTime();
  gameOverScreen.style.display = 'none';

  // First mole appears immediately
  randomHole();

  // Start the game timer
  gameTimer = setInterval(() => {
    timeLeft--;
    updateTime();

    if (timeLeft <= 0) {
      endGame();
    } else if (timeLeft % 10 === 0) {
      increaseDifficulty();
    }
  }, 1000);

  moleTimer = setInterval(randomHole, moleSpeed);
}

function increaseDifficulty() {
  moleSpeed = Math.max(300, moleSpeed - 200);
  clearInterval(moleTimer);
  moleTimer = setInterval(randomHole, moleSpeed);
}

function endGame() {
  clearInterval(gameTimer);
  clearInterval(moleTimer);
  holes.forEach(hole => hole.classList.remove('mole'));
  finalScoreDisplay.textContent = score;
  gameOverScreen.style.display = 'block';
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeDisplay.textContent = timeLeft;
}

function resetGame() {
  clearInterval(gameTimer);
  clearInterval(moleTimer);
  holes.forEach(hole => hole.classList.remove('mole'));
  score = 0;
  timeLeft = 30;
  moleSpeed = 100;
  updateScore();
  updateTime();
  gameOverScreen.style.display = 'none';
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole === currentHole && hole.classList.contains('mole')) {
      score++;
      updateScore();
      hole.classList.remove('mole');
    }
  });
});

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('play-again').addEventListener('click', () => {
  resetGame();
  startGame();
});
