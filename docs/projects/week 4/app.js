/*
let num1 = getRandomNumber(1, 10);
let num2 = getRandomNumber(0, 100);

console.log(num1);
console.log(num2);

displayRandomNumber();

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber
}

function displayRandomNumber() {
    alert(getRandomNumber(1, 10));
}
*/

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt('What is $(num1) + $(num2)');
    let end = Date.now();
    let time = (end - start) / 1000;
    let answer = num1 + num2;
    if (response == answer) {
        feedback = (' (correct)')
    } else {
        feedback = (' (incorrect)')
    }

    let result = {
        response: response,
        answer: answer,
        feedback: feedback,
        time: time
    }

    results.push(result);

    alert('You answered ${response} ${feedback} in ${time} seconds.');
}


console.log(results);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber
}