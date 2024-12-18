let jsPsych = initJsPsych();
let timeline = [];


let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='name'>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math expressions.</p>
    <p>Please answer as quickly and as accurately as possible.</p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

let likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];
let likertSurvey = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", labels: likert_scale },
        { prompt: "I find math easy.", labels: likert_scale },
    ]
};
timeline.push(likertSurvey);


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
            preamble: `
            <p class='equation'>What is <span class='number'>${trial.num1}</span> + <span class='number'>${trial.num2}</span>?</p>
            `,
            html: `<p><input type='text' name='answer' id='answer'></p>`,
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

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'mrt';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

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
