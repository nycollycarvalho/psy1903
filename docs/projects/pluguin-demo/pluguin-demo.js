let jsPsych = initJsPsych();

let timeline = [];

// Welcome message
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
  <h1 class='name'>Welcome to the mirror-camera Demo!</h1>
  <p>This is just a pluguin demo.</p>
  <p>Please, press <span class='key'> SPACE </span> to begin.</p>`,
    choices: [' '],
}

timeline.push(welcomeTrial);


const init_camera = {
    type: jsPsychInitializeCamera,
}

const mirror_camera = {
    type: jsPsychMirrorCamera,
}


// Results trial
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
      <h1>Please wait...</h1>
      <p>We are saving the results of your inputs.</p>
      `,
    on_start: function () {
        let prefix = 'pluguin-demo';
        let dataPipeExperimentId = 'qtpiSXvcWypL';
        let forceOSFSave = false;


        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .csv();

        console.log(results)

        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let fileName = prefix + '-' + participantId + '.csv'

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })

    }
}

timeline.push(resultsTrial);

// Debrief trial 
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you!</h1><p>You can now close this tab.</p>`,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .csv();


        console.log(data);
    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline);