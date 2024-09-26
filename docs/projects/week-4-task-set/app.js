/*function celsiusToFahrenheit(C, F) {
    let temp = (F = (C * 1.8) + 32);
    return temp;
}

console.log(celsiusToFahrenheit(10));
console.log(celsiusToFahrenheit(-5));
*/

function convertTemp(temp, converTo) {

    if (converTo == "c") {
        return ((temp - 32) / 1.8)
    } else if (converTo == "f") {
        return ((temp * 1.8) + 32)
    }

}

console.log(convertTemp(10, 'c'));
console.log(convertTemp(10, 'f')); 