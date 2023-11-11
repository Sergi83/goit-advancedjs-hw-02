// add libraries
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

// get elemets: input, button, text's spans (days, hours, minutes, seconds)
// inside input can choose calendar's days, when choose privious days start button block and warning message popup, next days - start button active
// when push start button inside spans appear time left to the day and time that choosen inside input

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

// create variable for timer
let timerId = null;

// time in ms from future date till now
let reverseClock = 0;

// iziToast library options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   time in ms from future date till now
    reverseClock = selectedDates[0] - Date.now();
    // if before now - show warning and block button, if future date - open button
    if (reverseClock < 0) {
      // block start button
      refs.startBtn.disabled = true;
      //   show warning message
      iziToast.show({
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        message: 'Please choose a date in the future',
        // close: true,
        // timeout: false,
      });
    } else {
      // unblock start button
      refs.startBtn.disabled = false;
    }
  },
};

//
flatpickr(refs.dateInput, options);

// add event listener to start button
refs.startBtn.addEventListener('click', handleClick);

// create reverse clock, block/unblock button and input
function handleClick() {
  // disable button and input after push start button
  refs.startBtn.disabled = true;
  refs.dateInput.disabled = true;

  // set interval for time rewriting every second
  timerId = setInterval(() => {
    if (reverseClock < 1000) {
      // clear interval function, unblock input and button after timer less than 1 s
      clearInterval(timerId);
      refs.startBtn.disabled = false;
      refs.dateInput.disabled = false;
    }

    // destructure days, hours, minutes, seconds culculated from total amount of time remain in ms
    const { days, hours, minutes, seconds } = convertMs(reverseClock);

    // decrement time by 1 second every every time interval (1 second)
    reverseClock -= 1000;

    // add text content for spans that count time backwards (days, hours, minutes, seconds)
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

// complete time format with 0, if just one number
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// converting time remaining
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
