
let instantaneousTime = 0,
  countDownOn = false,
  IntervalID,
  HTML = ``,
  num = 0;

//buttons elements
const resetButton = document.querySelector('.reset-button');
const saveButton = document.querySelector('.save-button');
const startCountDown = document.querySelector('.start-button');

//display input value
const setTimer = document.querySelector('.set-timer-button');

//input elements
const inputHour = document.querySelector('.hours-input');
const inputMinute = document.querySelector('.minutes-input');
const inputSecond = document.querySelector('.seconds-input');

//output displays
const outputHour = document.querySelector('.hours');
const outputMinute = document.querySelector('.minutes');
const outputSecond = document.querySelector('.seconds');

//display output time
function DisplayOutput(hour, minute, second) {
  outputHour.innerHTML = hour;
  outputMinute.innerHTML = minute;
  outputSecond.innerHTML = second;
}

// time variables
let seconds = '', minutes = '', hours = '';

//setTimer button
setTimer.addEventListener('click', () => {
  SetTimer();
});
//start button
startCountDown.addEventListener('click', () => {
  countDown('startCountDown');
});
//reset button
resetButton.addEventListener('click', () => {
  TimeEngine('reset');
});
///save button
saveButton.addEventListener('click', () => {
  TimeEngine('saveTime');
});

//control timeflow
function countDown(mode) {
  if (!countDownOn) {
    IntervalID = setInterval(() => {
      TimeEngine(mode);
    }, 100);
    startCountDown.innerHTML = 'STOP';
    countDownOn = true;
  } else {
    clearInterval(IntervalID);
    startCountDown.innerHTML = 'START';
    countDownOn = false;
  }
}
// controls the time intervals to be displayed
function TimeEngine(command) {
  if (command === 'reset') {
    //reset output display
    hours = minutes = seconds = 0;
    DisplayOutput(0, 0, 0);

    // reset input display
    inputHour.value = '';
    inputMinute.value = '';
    inputSecond.value = '';
    //reset the saved time
    HTML = '<p class="saved-time">1). 0:0:0.0</p>';
    document.querySelector('.saved-time-container')
      .innerHTML = HTML;
    num = 1;
    //stop the count down, change start buttonLabel
    clearInterval(IntervalID);
    countDownOn = false;
    startCountDown.innerHTML = 'START';

  } else if (command === 'startCountDown') {
    if (hours <= 0 && seconds <= 0 && minutes <= 0) {
      alert('Set The Timer!');
      clearInterval(IntervalID);
      seconds = 0.1;
      startCountDown.innerHTML = 'START';
    } else if (seconds === 0 && minutes === 0 && hours !== 0) {
      hours -= 1;
      seconds = 59;
      minutes = 59;
      DisplayOutput(hours, minutes, seconds);

    } else if (seconds === 0 && minutes !== 0) {
      seconds = 59;
      minutes -= 1;
      outputMinute.innerHTML = minutes;
    } else if (minutes === 0 && hours !== 0) {
      hours -= 1;
      minutes = 59;
      outputMinute.innerHTML = minutes;
      outputHour.innerHTML = hours;
    }
    seconds = (seconds * 10 - 1) / 10;
    outputSecond.innerHTML = seconds;

  } else if (command = 'saveTime') {
    num += 1;
    HTML += `<p class="saved-time">${num}). 
        ${hours || 0}:${minutes || 0}:${seconds || 0}</p>`
    document.querySelector('.saved-time-container')
      .innerHTML = HTML;
  }
}
function SetTimer() {
  console.log(inputHour.value);
  if ((inputHour.value || 0) >= 0 && (inputMinute.value || 0) >= 0 && (inputSecond.value || 0) >= 0) {

    DisplayOutput(inputHour.value || 0, inputMinute.value || 0, inputSecond.value || 0)

    seconds = Number(outputSecond.innerHTML),
      minutes = Number(outputMinute.innerHTML),
      hours = Number(outputHour.innerHTML);

    clearInterval(IntervalID);
  } else {
    DisplayOutput(0, 0, 0);
    alert('Please, Enter a Positive Time');
  }
}