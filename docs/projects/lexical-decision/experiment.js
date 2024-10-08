let jsPsych = initJsPsych();

let timeline = [];

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task!</h1> 
    <p>You are about to see a series of characters.</p>
    <p>If the characters make up a word, press the F key.</p>
    <p>If the characters do not make up a word, press the J key.</p>
    <p>Press SPACE to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

jsPsych.run(timeline);

let conditions = [
    { characters: 'cat', isWord: true },
    { characters: 'pin', isWord: true },
    { characters: 'jgb', isWord: false },
    { characters: 'mub', isWord: false },
];

conditions = jsPsych.randomization.repeat(conditions, 1);

for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${condition.characters}</h1>`,


        choices: ['f', 'j'],
    };

    timeline.push(conditionTrial);
}

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: ['NO KEYS'],

    on_start: function () {
        let data = jsPsych.data.get().csv();
        console.log(data);
    }
}

timeline.push(debriefTrial);