let jsPsych = initJsPsych();
let timeline = [];


let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='name'>Welcome to the experiment!</h1> 
    <p>In Task 1, you will watch a short video.</p>
    <p>In Task 2, categorize a series of words.</p>
    <p>In Task 3, you will answers a brief set of questions.</p>
    <p>Please answer as quickly as possible.</p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

let videos = [
    { name: 'climate-anxiety', embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/QHH3iSeDBLo?si=l2aaso7D6oZiZcHX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'school-anxiety', embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Okrqwbt-TlI?si=1RgCHdzm45NmiQLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'neutral', embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/pLVpJAVS27A?si=epz0_j1lHlWfLihe&amp;start=30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
];

let videoCondition = jsPsych.randomization.sampleWithoutReplacement(videos, 1)[0].embed;

let primingTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Task 1 of 3</h1>
    <p>In this task, you will watch the following video. Please press the video to begin. You will automatically proceed to Task 2 once the video ends.</p>
    ${videoCondition}
    `,
    trial_duration: 78000,
    choices: ['NO KEYS'],
    data: {
        collect: true,
    }
};

timeline.push(primingTrial);

let likert_scale = [
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Almost always"
];

let likertSurvey = {
    type: jsPsychSurveyLikert,
    preamble: `
    <h1 class='task3name'>Task 3</h1> 
    <p>Please answer the following 10 questions.</p>
    `,
    button_label: 'sumbmit',
    questions: [
        { prompt: "Thinking about climate change makes it difficult for me to concentrate.", labels: likert_scale },
        { prompt: "Thinking about climate change makes it difficult for me to sleep.", labels: likert_scale },
        { prompt: "My concerns about climate change make it hard for me to have fun with my family or friends.", labels: likert_scale },
        { prompt: "My concerns about climate change undermine my ability to work to my potential.", labels: likert_scale },
        { prompt: "My friends say I think about climate change too much.", labels: likert_scale },
        { prompt: "I have noticed a change in a place that is important to me due to climate change.", labels: likert_scale },
        { prompt: "I wish I behaved more sustainably.", labels: likert_scale },
        { prompt: "I recycle.", labels: likert_scale },
        { prompt: "I try to reduce my behaviors that contribute to climate change.", labels: likert_scale },
        { prompt: "I feel guilty if I waste energy.", labels: likert_scale },

    ]
};
timeline.push(likertSurvey);

let IATInstructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <p>In this task you will, you will be shown a series of words and asked to sort them into categories.</p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `,
    post_trial_gap: 250
};

timeline.push(IATInstructions);

let part1Instructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <h1>Part 1</h1>
    <p>In this, the two categories will be <b>school</b> or <b>nature</b>.</p>
    <p>If the word in the middle of the screen should be sorted into the <b>school</b> category, press <span class='key'> F </span></p>
    <p>If the word should be sorted into the <b>nature</b> category, press <span class='key'> J </span></p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `
};

timeline.push(part1Instructions);

let part2Instructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <h1>Part 2</h1>
    <p>In this, the two categories will be <b>anxiety</b> or <b>serenity</b>.</p>
    <p>If the word in the middle of the screen should be sorted into the <b>serenity</b> category, press <span class='key'> F </span></p>
    <p>If the word should be sorted into the <b>serenity</b> category, press <span class='key'> J </span></p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `
};

timeline.push(part2Instructions);

let part3Instructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <h1>Part 3</h1>
    <p>In this, the two categories will be <b>nature or anxiety</b> or <b>school or serenity</b>.</p>
    <p>If the word in the middle of the screen should be sorted into the <b>nature or anxiety</b> category, press <span class='key'> F </span></p>
    <p>If the word should be sorted into the <b>school or serenity</b> category, press <span class='key'> J </span></p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `
};

timeline.push(part3Instructions);

let part4Instructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <h1>Part 3</h1>
    <p>In this, the two categories will be <b>nature or serenity</b> or <b>school or anxiety</b>.</p>
    <p>If the word in the middle of the screen should be sorted into the <b>nature or serenity</b> category, press <span class='key'> F </span></p>
    <p>If the word should be sorted into the <b>school or anxiety</b> category, press <span class='key'> J </span></p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `
};

timeline.push(part4Instructions);

//for (let condition of conditions) {
//  let conditionTrial = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: `<h1>${condition.characters}</h1>`,
//     data:
//          characters: condition.characters,
//       category: trial.expectedCategory,
//  }
//      ;

// timeline.push(conditionTrial);
//}
//

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        let prefix = 'eco-emotions';
        let dataPipeExperimentId = 'eco-emotions';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();


        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');


        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

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

console.log(resultsTrial)

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