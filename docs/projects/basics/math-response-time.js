alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.")

start1 = Date.now();
response1 = prompt("What is 3+5?")
console.log(response1)
alert("You answered " + response1)
end1 = Date.now();
responseTime1 = (end1 - start1) / 1000; //number
alert("You answered " + response1 + " in " + responseTime1 + " seconds.");

start2 = Date.now();
response2 = prompt("What is 5+2?")
console.log(response1)
alert("You answered " + response2)
end2 = Date.now();
responseTime2 = (end2 - start2) / 1000;
alert("You answered " + response2 + " in " + responseTime2 + " seconds.");

start3 = Date.now();
response3 = prompt("What is 6+4?")
console.log(response3)
alert("You answered " + response3)
end3 = Date.now();
responseTime3 = (end3 - start3) / 1000;
alert("You answered " + response3 + " in " + responseTime3 + " seconds.");

num1_1 = Math.floor(Math.random() * 10) + 1;
num1_2 = Math.floor(Math.random() * 10) + 1;

start4 = Date.now();
response4 = prompt("What is " + num1_1 + " + " + num1_2 + "?");
console.log(response4)
alert("You answered " + response4)
end4 = Date.now();
responseTime4 = (end4 - start4) / 1000;
alert("You answered " + response4 + " in " + responseTime4 + " seconds.")


alert("Thank you for your participation!")


