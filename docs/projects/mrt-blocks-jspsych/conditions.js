let conditions = [];

for (let i = 0; i < 3; i++) {

    let numbers = [];

    for (let j = 0; j < 3; j++) {

        let min = i * 10;
        let max = min + 10;

        let num1 = getRandomNumber(min, max);
        let num2 = getRandomNumber(min, max);

        numbers.push({
            num1: num1,
            num2: num2,
            answer: num1 + num2
        })
    }

    conditions.push({
        title: `Part ${i + 1}`,
        questions: numbers
    });
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
