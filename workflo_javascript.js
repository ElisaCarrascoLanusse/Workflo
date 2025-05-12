// Circular countdown timer JavaScript logic for Workflo
const timerText = document.getElementById("timerText");
const progressCircle = document.getElementById("progressCircle");
const inputTime = document.getElementById("time");

let totalSeconds = 0;
let workedSeconds = 0;
let initialTotalSeconds = 0;
let timerInterval = null;
let isOnBreak = false;

const FULL_DASH_ARRAY = 282.6; // 2 * Math.PI * r (r = 45)

function updateTimerDisplay(minutes, seconds) {
  const m = minutes < 10 ? `0${minutes}` : minutes;
  const s = seconds < 10 ? `0${seconds}` : seconds;
  timerText.textContent = `${m}:${s}`;
}

function updateCircleProgress() {
  const current = isOnBreak ? totalSeconds : initialTotalSeconds - totalSeconds;
  const base = isOnBreak ? workedSeconds : initialTotalSeconds;
  const progress = current / base;
  const dashOffset = FULL_DASH_ARRAY * (1 - progress);
  progressCircle.setAttribute("stroke-dashoffset", dashOffset);
}

function tickTimer(callback) {
  totalSeconds--;
  if (!isOnBreak) workedSeconds++;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  updateTimerDisplay(minutes, seconds);
  updateCircleProgress();

  if (totalSeconds <= 0) {
    clearInterval(timerInterval);
    if (callback) callback();
  }
}

function startTimer() {
  clearInterval(timerInterval);

  const input = parseInt(inputTime.value);
  if (isNaN(input) || input <= 0) return;

  totalSeconds = input * 60;
  initialTotalSeconds = totalSeconds;
  workedSeconds = 0;
  isOnBreak = false;

  updateTimerDisplay(Math.floor(totalSeconds / 60), totalSeconds % 60);
  updateCircleProgress();

  timerInterval = setInterval(() => tickTimer(), 1000);
}

function takeBreak() {
  clearInterval(timerInterval);

  const breakLength = Math.floor((workedSeconds * 7) / 24); // 7/24ths rule
  totalSeconds = breakLength;
  isOnBreak = true;

  updateTimerDisplay(Math.floor(totalSeconds / 60), totalSeconds % 60);
  updateCircleProgress();

  timerInterval = setInterval(() => {
    tickTimer(() => {
      // Resume working timer after break ends
      totalSeconds = initialTotalSeconds - workedSeconds;
      isOnBreak = false;
      updateTimerDisplay(Math.floor(totalSeconds / 60), totalSeconds % 60);
      updateCircleProgress();
      timerInterval = setInterval(() => tickTimer(), 1000);
    });
  }, 1000);
}

function reset() {
  clearInterval(timerInterval);
  totalSeconds = 0;
  workedSeconds = 0;
  isOnBreak = false;
  updateTimerDisplay(0, 0);
  progressCircle.setAttribute("stroke-dashoffset", FULL_DASH_ARRAY);
}

// Optional: attach events to buttons if not inline in HTML
document.querySelector("button[onclick='startTimer()']").addEventListener("click", startTimer);
document.querySelector("button[onclick='takeBreak()']").addEventListener("click", takeBreak);
document.querySelector("button[onclick='reset()']").addEventListener("click", reset);

// Initial setup
updateTimerDisplay(0, 0);
progressCircle.setAttribute("stroke-dasharray", FULL_DASH_ARRAY);
progressCircle.setAttribute("stroke-dashoffset", FULL_DASH_ARRAY);