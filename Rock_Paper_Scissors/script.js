document.addEventListener('DOMContentLoaded', () => {
  const choices = document.querySelectorAll('.choice');
  const resultDisplay = document.getElementById('result');
  const finalResultDisplay = document.getElementById('final-result');
  const playAgainBtn = document.getElementById('play-again');
  const userScoreDisplay = document.getElementById('user-score');
  const computerScoreDisplay = document.getElementById('computer-score');

  let userScore = 0;
  let computerScore = 0;
  let round = 0;
  const maxRounds = 5;

  const choicesMap = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      if (round >= maxRounds) return;

      const userChoice = choice.id;
      const computerChoice = getComputerChoice();
      const result = determineWinner(userChoice, computerChoice);
      updateScores(result);
      displayResult(userChoice, computerChoice, result);
      round++;

      if (round === maxRounds) {
        endGame();
      }
    });
  });

  playAgainBtn.addEventListener('click', resetGame);

  function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * options.length)];
  }

  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'draw';
    return choicesMap[userChoice] === computerChoice ? 'user' : 'computer';
  }

  function updateScores(result) {
    if (result === 'user') userScore++;
    if (result === 'computer') computerScore++;
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
  }

function displayResult(userChoice, computerChoice, result) {
  if (result === 'draw') {
    resultDisplay.textContent = `It's a draw! You both chose ${userChoice}.`;
  } else if (result === 'user') {
    resultDisplay.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
  } else {
    resultDisplay.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
  }

  // ✅ Play sound here
  // playResultSound(result);
}

  function endGame() {
    let finalMessage;
    if (userScore > computerScore) {
      finalMessage = "🎉 Congratulations! You won the game!";
      playResultSound('user');
    } else if (userScore < computerScore) {
      finalMessage = "💻 Game over! Computer wins the game!";
      playResultSound('computer');
    } else {
      finalMessage = "🤝 It's a tie game! Try again.";
    }
    finalResultDisplay.textContent = finalMessage;
    playAgainBtn.style.display = 'inline-block';
  }

  function resetGame() {
    userScore = 0;
    computerScore = 0;
    round = 0;
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = "Make your choice!";
    finalResultDisplay.textContent = "";
    playAgainBtn.style.display = "none";
  }
});


// Play a win or lose sound based on the game result
const winSound = new Audio('./Assests/sounds/win.mp3');
const loseSound = new Audio('./Assests/sounds/lose.mp3');

function playResultSound(result) {
  if (result === 'user') {
    winSound.currentTime = 0;
    winSound.play();
  } if (result === 'computer') {
    loseSound.currentTime = 0;
    loseSound.play();
  }
}

