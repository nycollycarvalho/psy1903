let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById("num1");
let num2Output = document.getElementById("num2");

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

//equation.innerHTML = ("What is" + num1 + num2 "?" )

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    //Stop the timer

    //Calculate response time

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    // Hide the form
    form.style.display = "none";
});

//let response = prompt('What is 4 + 6?');

let num3Output = document.getElementById("num3");
let num4Output = document.getElementById("num4");

let num3 = Math.floor(Math.random() * 10) + 1;
let num4 = Math.floor(Math.random() * 10) + 1;

num3Output.innerHTML = num3;
num4Output.innerHTML = num4;


let feedback = '';

if (response1 == 10) {
    feedback = 'Correct!';
} else if (response1 == 9 || response1 == 11) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}


alert(feedback + ' The expected answer is 10.');

