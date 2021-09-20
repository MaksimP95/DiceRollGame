//SELECTING ELEMENTS
const player0El = document.getElementById("score--0");
const player1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, gameOn, activePlayer;
// let currentScore = 0;
// let gameOn = true;
// let activePlayer;

const initState = function () {
  diceEl.classList.add("hidden");
  gameOn = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  player0El.textContent = 0;
  player1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};
initState();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
};

// ROLLING DICE FUNC
btnRoll.addEventListener("click", function () {
  if (gameOn) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    // 3. Check for 1 & assign rolled dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (dice === 1) {
      switchPlayer();
    }
  }
});

// SAVING CURRENT SCORE TO TOTAL
btnHold.addEventListener("click", function () {
  if (gameOn) {
    // ADD CURRENT SCORE TO TOTAL'S
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // CHECK WINNER
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.getElementById(
        `name--${activePlayer === 0 ? 1 : 0}`
      ).textContent = "Ran out of luck, Bitch!";

      // RESETING CURRENT SCORE
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      diceEl.classList.toggle("hidden");

      // SET GAME OVER STATE
      gameOn = false;
    } else {
      switchPlayer();
    }
  }
});

// RESETTING GAME
btnNew.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.getElementById(
    `name--${activePlayer === 0 ? 1 : 0}`
  ).textContent = `Player ${activePlayer === 0 ? 2 : 1}`;
  gameOn = true;
  initState();
  scores = [0, 0];
});
