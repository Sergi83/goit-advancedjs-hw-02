//
// get buttons
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

// get body for changing background
const body = document.querySelector('body');

// create variable for setInterval (change/stop body bg colog)
let timerId = null;

// disabl spop button until push start button
stopBtn.setAttribute('disabled', true);

// start button activate random color changing with 1 second interval
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  // when push button it disabled until push other button
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
  // stop changing background color
  clearInterval(timerId);

  // when push button it disabled until push other button
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
});

// generate random colors
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
