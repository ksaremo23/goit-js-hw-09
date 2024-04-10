// 1. Import Notify from 'notiflix/notify-aio' for displaying notifications

// 2. Select and store form and its input elements (delay, step, amount) from the DOM

// 3. Define function createPromise with parameters position and delay
//     3.1 Create a new Promise
//     3.2 Determine randomly whether the promise should resolve or reject
//     3.3 Use setTimeout to simulate asynchronous operation
//         - After the specified delay, either resolve or reject the promise
//         - Resolve with an object containing position and delay if shouldResolve is true
//         - Reject with the same object if shouldResolve is false

// 4. Define function handleSubmit to handle form submission
//     4.1 Prevent the default form submission behavior
//     4.2 Initialize delayValue with the numerical value of delay input
//     4.3 Iterate from 1 to the value of amount input
//         - For each iteration, call createPromise with current iteration as position and delayValue as delay
//         - Upon promise fulfillment, display a success notification with position and delay
//         - Upon promise rejection, display a failure notification with position and delay
//         - Increment delayValue by the numerical value of step input for the next iteration

// 5. Attach an event listener to the form for the 'submit' event, calling handleSubmit on submission

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // DOM LINKS
const forE1 = document.querySelector('.form');
const delayE1 = document.querySelector('input[name="delay"]');
const stepE1 = document.querySelector('input[name="step"]');
const amountE1 = document.querySelector('input[name="amount"]');

//--------------------------

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    // async operation
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }  
    }, delay);
  });
}

//----------------------------

function handleSubmit(event) {
  event.preventDefault();
  let delayValue = Number(delayE1.value);

  for (let i=1; i <= amountE1.value; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fullfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

      delayValue += Number(stepE1.value);
      //delayvalue = delayValue + Number(stepE1.value)
  }
}

formE1.addEventListener('submit', handleSubmit);


