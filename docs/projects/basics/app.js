let courseName = 'programming for psychologists';
console.log(courseName.length); // Output: 29

// Output the value for courseName translated to all capital letters.
// Expected result: PROGRAMMING FOR PSYCHOLOGISTS
console.log([courseName.toUpperCase()]);

// Output the index position of the word 'Psychologists' within the string stored in courseName.
// Expected result: 16
console.log(courseName.indexOf("psychologists"));

// Output the value for courseName with the word 'Programming' replaced with the word 'Coding'.
// Expected result: "Coding for Psychologists"
console.log(courseName.replace("programming", "coding"));