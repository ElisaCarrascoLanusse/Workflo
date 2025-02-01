const startBtn = document.querySelector('.btn-start'); 
const breakBtn = document.querySelector('.btn-break'); 
const resetBtn = document.querySelector('.btn-reset'); 
const submitBtn = document.querySelector('#submit');
const session = document.querySelector('.minutes'); 
const inputTime = document.querySelector('#time');
let myInterval; 
let totalSeconds;
let workedSeconds = 0;

const updateDisplay = (minutes, seconds) => {
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');
  minuteDiv.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondDiv.textContent = seconds < 10 ? '0' + seconds : seconds;
};

const updateSeconds = () => {
  totalSeconds--;
  workedSeconds++;
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;
  updateDisplay(minutesLeft, secondsLeft);

  if (minutesLeft === 0 && secondsLeft === 0) {
    clearInterval(myInterval);
  }
};

const appTimer = () => {
  clearInterval(myInterval);
  totalSeconds = Number.parseInt(inputTime.value) * 60;
  workedSeconds = 0;

  myInterval = setInterval(updateSeconds, 1000);
};

const takeBreak = () => {
  clearInterval(myInterval);
  const breakTime = Math.floor((workedSeconds * 7) / 24); // Calculates the break time based on 7/24ths of the worked time
  totalSeconds = breakTime;

  const updateBreakSeconds = () => {
    totalSeconds--;
    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;
    updateDisplay(minutesLeft, secondsLeft);
    
    if (minutesLeft === 0 && secondsLeft === 0) {
      clearInterval(myInterval);

      // Calculate remaining time and update the display
      const remainingTime = Number.parseInt(inputTime.value) * 60 - workedSeconds;
      totalSeconds = remainingTime;
      minutesLeft = Math.floor(totalSeconds / 60);
      secondsLeft = totalSeconds % 60;
      updateDisplay(minutesLeft, secondsLeft);

      // Start a new interval with the remaining time
      myInterval = setInterval(updateSeconds, 1000);
    }
  };

  myInterval = setInterval(updateBreakSeconds, 1000);
};

const resetTimer = () => {
  clearInterval(myInterval);
  workedSeconds = 0;
  updateDisplay(0, 0);
};

startBtn.addEventListener('click', appTimer);
breakBtn.addEventListener('click', takeBreak);
resetBtn.addEventListener('click', resetTimer);