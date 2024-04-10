// 1. Import flatpickr, its styles, and Notify from notiflix

// 2. Define function convertMs to convert milliseconds into days, hours, minutes, seconds

// 3. Define function addLeadingZero to format numbers with leading zeros

// 4. Select necessary DOM elements (datetime picker, start button, and time display elements)

// 5. Disable the start button initially

// 6. Define options for flatpickr with:
//    - Time enabled and set to 24-hour format
//    - Default date set to now
//    - Minute increment set to 1
//    - onClose function that:
//      a. Validates the selected date is in the future
//      b. Enables the start button if valid
//      c. Attaches a click event listener to the start button to start the countdown, which:
//         - Disables start button and datetime picker
//         - Sets an interval to update the countdown every second
//         - Stops the interval and re-enables the datetime picker when countdown ends
//         - Updates the countdown display with formatted time

// 7. Initialize flatpickr with the datetime picker element and defined options

//  Described in documentation
import flatpickr from 'flatpickr'
//  Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

//  Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//DOM
const datetimePickerE1 = document.querySelector('#datetime-picker');
const  startButtonE1 = document.querySelector('button[dtata-start]');
const daysE1 = document.querySelector('span[data-days]');
const hoursE1 = document.querySelector('span[data-hours]');
const minutesE1 = document.querySelector('span[data-minutes]');
const secondsE1 = document = document.querySelector('span[data-seconds');

//  disable button by default
startButtonE1.disable = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // IMPLEMENT OUR LOGIC
        const selectedDate = selectedDates[0];
        const dateNow = Date.now();

        if (selectedDate < dateNow) {
            Notify.failure('Please choose a date in the future');
            startButtonE1.disabled = true;
            datetimePickerE1.disabled = true;
            return;
        }

        // if the date is in the future -> enable the button
        startButtonE1.disabled = false;

        // Begin Countdown
        let timerID = null;

        // Countdown Handler
        function handleCountdown() {
            startButtonE1.disabled = true;
            datetimePickerE1.disabled = true;

            // run every 1000ms (1 second)
            timerID = setinterval(() => {
                const currentTime = Date.now();

                // when countdown ends -> clear timer
                if (selectedDate < currentTime) {
                    clearInterval(timerID);
                    datetimePickerE1.disabled = false;
                    return;
                }

                const timeDifference = selectedDate - currentTime;

                const { days, hours, minutes, seconds } = convertMs(timeDifference);

                daysE1.textContent = adddLeadingZero(days);
                hoursE1.textContent = addLeadingZer0(hours);
                minutesE1.textContent = addLeadingZero(minutes);
                secondsE1.textConent = addLeadingZero(seconds);
            }, 1000);
        }
        startButtonE1.addEventListener('click', handleCountdown);
    },
};

// Create flatpickr
flatpickr('#datetime-picker', options);

// ---------------------------------
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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}