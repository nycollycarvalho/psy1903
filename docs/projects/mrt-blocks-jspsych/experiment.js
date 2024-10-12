let jsPsych = initJsPsych();
let timeline = [];


let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math expressions.</p>
    <p>Please answer as quickly and as accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);


for (let block of conditions) {

    let blockIntro = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${block.title}</h1><p>Press SPACE to begin.</p>`,
        choices: [' '],
    };
    timeline.push(blockIntro);


    for (let trial of block.questions) {
        let trialBlock = {
            type: jsPsychSurveyHtmlForm,
            preamble: `What is ${trial.num1} + ${trial.num2}?`,
            html: `<input type='text' name='answer' id='answer' autofocus>`,
            button_label: 'Submit',
            data: {
                collect: true,
                num1: trial.num1,
                num2: trial.num2,
                answer: trial.answer,
                block: block.title
            },
            on_finish: function (data) {
                data.answer = data.response.answer;
                if (data.answer == trial.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        };
        timeline.push(trialBlock);
    }
}


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you!</h1><p>You can now close this tab.</p>`,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['collect', 'stimulus', 'trial_type', 'trial_index', 'plugin_version'])
            .csv();

        console.log(data);
    }
};
timeline.push(debriefTrial);


jsPsych.run(timeline);
