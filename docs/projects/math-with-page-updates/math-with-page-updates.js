let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById("num1");
let num2Output = document.getElementById("num2");

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

start = Date.now();

form.addEventListener('submit', function (event) {


    event.preventDefault();

    let response = form.elements['response'].value;

    if (response == num1 + num2) {
        feedback = (' (correct)')
    } else {
        feedback = (' (incorrect)')
    }

    end = Date.now();
    responseTime = (end - start) / 1000;

    results.innerHTML = ('You answered ' + response + feedback + ' in ' + responseTime + ' seconds.')

    form.style.display = "none";
});