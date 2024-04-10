// 1. Define function createChangerColor with parameters for start button, stop button, and body element
//     1.1 Initialize onChange to null

//     1.2 Define function getRandomHexColor
//         1.2.1 Initialize a string with hexadecimal characters
//         1.2.2 Initialize color string with "#"
//         1.2.3 For each of 6 iterations, append a random character from the hexadecimal string to color
//         1.2.4 Return the color string

//     1.3 Define function btnToggle with parameter btn
//         1.3.1 Toggle the disabled state of btn

//     1.4 Define function start
//         1.4.1 Disable the start button and enable the stop button
//         1.4.2 Set an interval to change the background color of the body element every 1000 milliseconds using getRandomHexColor
//         1.4.3 Store the interval ID in onChange

//     1.5 Define function stop
//         1.5.1 Disable the stop button and enable the start button
//         1.5.2 Clear the interval identified by onChange

//     1.6 Initially disable the stop button

//     1.7 Return an object exposing the start and stop functions

// 2. Define refs object containing the start button, stop button, and body element selected from the DOM

// 3. Destructure the start and stop functions from the object returned by createChangerColor called with refs

// 4. Add click event listeners to the start and stop buttons, calling the respective functions when clicked

function createChangeColor({ btnStartE1, btnStopE1, bodyE1 }) {
    let onChange = null;

    function getRandomHexColor() {
        let letters = '0123456789ABCDEF'
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function btnToggle(btn) {
        btn.disabled = !btn.disabled;
    }

    function start() {
        btnToggle(btnStartE1);
        btnToggle(btnStopE1);

        onChange = setInterval(() =>  {
            bodyE1.style.backgroundColor = getRandomHexColor();
        }, 1000);
    }

    // Initialize
    btnToggle(btnStopE1);

    //Return an object to expose the start and stop functions
    return { start, stop };
}


// Usage

const refs = {
    btnStartE1: document.querySelector('button[data-start]'),
    btnStopE1: document.querySelector('button[data-stop]'),
    bodyE1: document.body,
};

const { start, stop } = createChangerColor(refs);

refs.btnStartE1.addEventListener('click', start);
refs.addEventListener('click', stop);



















