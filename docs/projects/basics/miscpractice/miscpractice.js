let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let response = prompt('What is ' + num1 + ' + ' + num2 + ' ? ');

let feedback = '';

if (response == (num1 + num2)) {
    feedback = 'Correct!';
} else if (response == (num1 + num2) - 1 || response == (num1 + num2) + 1) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + (num1 + num2) + '.');

let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
if (age >= 12 && age <= 17) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
}

let number = prompt('Please enter a whole number below:');

if (number % 2 === 0) {
    alert('The number entered is even')
} else {
    alert('The number entered is odd')
}