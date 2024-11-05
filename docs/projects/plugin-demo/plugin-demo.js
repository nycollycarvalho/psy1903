let participantId = getCurrentTimestamp();


let jsPsych = initJsPsych();
let timeline = [];


// Welcome message
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1 class='name'>Welcome to the mirror-camera Demo!</h1>
        <p>This is just a plugin demo.</p>
        <p>Please, press <span class='key'> SPACE </span> to begin.</p>`,
    choices: [' '],
};

timeline.push(welcomeTrial);

const init_camera = {
    type: jsPsychInitializeCamera,
};

const mirror_camera = {
    type: jsPsychMirrorCamera,
};

timeline.push(init_camera);
timeline.push(mirror_camera);

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>`,
    on_start: function () {
        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'qtpiSXvcWypL';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .csv();

        console.log(results);

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        });
    },
};

timeline.push(resultsTrial);

// Debrief trial
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {

        let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_7O02KPRaFvEqNYq?experimentParticipantId=${participantId}`;

        return `<h1>Thank you!</h1><p>You can now close this tab.</p>
                <p>To complete your response, please follow <a href='${linkToQualtricsSurvey}'>this link</a> and complete the survey you see there.</p>`;
    },
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .csv();
        console.log(data);
    },
};

timeline.push(debriefTrial);

// Run the experiment
jsPsych.run(timeline);
