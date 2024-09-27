/*function celsiusToFahrenheit(C, F) {
    let temp = (F = (C * 1.8) + 32);
    return temp;
}

console.log(celsiusToFahrenheit(10));
console.log(celsiusToFahrenheit(-5));
*/

/*function convertTemp(temp, converTo) {

    if (converTo == "c") {
        return ((temp - 32) / 1.8)
    } else if (converTo == "f") {
        return ((temp * 1.8) + 32)
    }

}

console.log(convertTemp(10, 'c'));
console.log(convertTemp(10, 'f')); 
*/


/*function getWordLength(words) {
    let length = [];
    words.forEach(word => {
        length.push(word.length);
    });
    return length;
}

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getWordLength(words));*/


/*let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getLongestWord(words));

function getLongestWord(words) {
    let longestWord = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length)
            longestWord = words[i];
    }
    return longestWord
}*/


/*console.log(getOddNumbers([1, 2, 3, 4, 5]));
console.log(getOddNumbers([12, 45, 10, 11, 61]));

function getOddNumbers(numbers) {
    let results = [];
    numbers.forEach(number => {
        if (number % 2 !== 0) {
            results.push(number);
        }
    });

    return results

}*/

/*alert('Welcome to the even/odd response time task.\n\nYou are about to see a series of numbers.\n\nIf the number you see is EVEN, type the letter "e".\nIf the number you see is ODD, type the letter "o"\n\nPlease answer as quickly and as accuratly as possible.')

let results = [];

function getRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

for (let i = 0; i < 5; i++) {
    let number = getRandomNumber();
    let startTime = Date.now();

    let response = prompt(`Trial ${i + 1}:\n\nNumber: ${number}\n\nType the letter 'e' for EVEN.\n\nType the letter 'o' for ODD.`);

    let endTime = Date.now();
    let responseTime = (endTime - startTime) / 1000;

    let isEven = number % 2 === 0;
    let correct = (isEven && response === 'e') || (!isEven && response === 'o');

    results.push({
        number: number,
        response: response,
        correct: correct,
        responseTime: responseTime
    });
}


alert("Thank you for your time!");

console.log(results);
*/

console.log(filterNumbers([1, 2, 3, 4, 5], 'even'));
console.log(filterNumbers([1, 2, 3, 4, 5], 'odd'));

function filterNumbers(numbers, evenOrOdd) {

    let filterNumbers = [];

    numbers.forEach(numbers => {
        if (evenOrOdd === 'even' && numbers % 2 === 0) {
            filterNumbers.push(numbers);
        } else if (evenOrOdd === 'odd' && numbers % 2 !== 0) {
            filterNumbers.push(numbers);
        }

    })

    return filterNumbers

}



