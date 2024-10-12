let conditions = [];


for (let i = 0; i < 3; i++) {

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = num1 + num2;

    conditions.push({ num1: num1, num2: num2, answer: answer });

}

console.log('Conditions:', conditions);