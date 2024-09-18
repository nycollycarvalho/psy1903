num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;

start4 = Date.now();
response4 = prompt("What is " + num1 + " + " + num2 + "?");

if (response4 == num1 + num2) {
    feedback = (' (correct)')
} else {
    feedback = (' (incorrect)')
}
console.log(response4)
end4 = Date.now();
responseTime4 = (end4 - start4) / 1000;
alert("You answered " + response4 + feedback + " in " + responseTime4 + " seconds.")

num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;

start5 = Date.now();
response5 = prompt("What is " + num1 + " + " + num2 + "?");

if (response5 == num1 + num2) {
    feedback = (' (correct)')
} else {
    feedback = (' (incorrect)')
}
console.log(response5)
end5 = Date.now();
responseTime5 = (end5 - start5) / 1000;
alert("You answered " + response5 + feedback + " in " + responseTime5 + " seconds.")

num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;

start6 = Date.now();
response6 = prompt("What is " + num1 + " + " + num2 + "?");

if (response6 == num1 + num2) {
    feedback = (' (correct)')
} else {
    feedback = (' (incorrect)')
}
console.log(response6)
end6 = Date.now();
responseTime6 = (end6 - start6) / 1000;
alert("You answered " + response6 + feedback + " in " + responseTime6 + " seconds.")


alert("Thank you for your participation!")
