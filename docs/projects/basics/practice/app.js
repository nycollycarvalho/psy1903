//console.log(5 == 5 && 10 > 1);
//console.log(5 == 5 && 10 > 1);
//console.log('red' == 'blue' || 1 < 10);
//console.log(20 > 15 < 15);
//console.log(12 % 2 == 0);
//console.log('red' != 'green' || 'orange' == 'purple');
//console.log((10 >= 10) && (false == false) && (20 !== 19));
//console.log(true && true || false);

//let response = prompt('What is 4 + 6');

//let correctAnswer = 'The answer is 10.'

//let feedback = '';

//if (response == 10) {
feedback = ('You got it correct!')
//} else if (response > 8 && response < 12) {
feedback = ('You almost got it correct!')
//} else {
feedback = ('You got it incorret.')
//}

//alert(feedback + ' The expected answer is 10!');

// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let response = form.elements['name'].value;

    let over18 = form.elements['age'].checked;

    let resultsMessage = '';

    if (over18) {
        resultsMessage = 'Hello ' + response + '!'
    } else {
        resultsMessage = 'Thank you for your interest but this experiement is for individuals over 18 only.'
    }

    // Report the results
    results.innerHTML = resultsMessage;
});


var likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

var trial = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", labels: likert_scale },
        { prompt: "I find math easy.", labels: likert_scale },

};