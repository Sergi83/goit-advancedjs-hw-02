// add library for alert messages
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// 1 - delay in ms
// 2 - step of growing delay for every promise after first
// 3 - promises' quantity that you create

// get form
const form = document.querySelector('.form');

// get form's elements
const { delay, step, amount } = form.elements;

// get value from form on sumbit
form.addEventListener('submit', handlerSubmitForm);

// create submit function
function handlerSubmitForm(e) {
  // prevent rerendering after submit
  e.preventDefault();

  // get input values in numbers
  let timeDelayNumber = Number(delay.value);
  let timeStepNumber = Number(step.value);
  let repeatAmountNumber = Number(amount.value);

  // check if input values were right
  if (timeDelayNumber < 0 || timeStepNumber < 0 || repeatAmountNumber <= 0) {
    // error message
    iziToast.error({
      position: 'topRight',
      message:
        'Negative time delays or amount <= 0! Delays should be positive numbers and amount more than 0.',
      messageColor: 'white',
      backgroundColor: 'red',
    });
  }

  // create promises multiple amount of times
  for (let i = 1; i <= repeatAmountNumber; i += 1) {
    createPromise(i, timeDelayNumber)
      .then(({ position, delay }) => {
        // success message
        iziToast.show({
          position: 'topRight',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          messageColor: 'white',
          backgroundColor: 'green',
        });
      })
      .catch(({ position, delay }) => {
        // error message
        iziToast.error({
          position: 'topRight',
          message: `Rejected promise ${position} in ${delay}ms`,
          messageColor: 'white',
          backgroundColor: 'red',
        });
      });

    // correct delay for every step
    timeDelayNumber += timeStepNumber;
  }

  // reset form after submit and all operations
  form.reset();
}

// create promises 30% success, 70% error
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
