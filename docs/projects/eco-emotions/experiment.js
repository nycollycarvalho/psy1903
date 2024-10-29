let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the experiment!</h1> 
    <p>In this experiment, you will complete the following three tasks:</p>
    <ul class='list'>
      <li>In Task 1, you will watch a short video.</li>
      <li>In Task 2, you will categorize a series of words.</li>
      <li>In Task 3, you will answer a brief set of questions.</li>
    </ul>
    <p>Please use a desktop, not mobile, device to complete this experiment.</p>
    <p>Press the <span class='key'>SPACE</span> key to begin Task 1.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

// Priming
let videos = [
    { name: 'climate-anxiety', embed: `<iframe width="650" height="400" src="https://www.youtube.com/embed/QHH3iSeDBLo?si=l2aaso7D6oZiZcHX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'school-anxiety', embed: `<iframe width="650" height="400" src="https://www.youtube.com/embed/Okrqwbt-TlI?si=1RgCHdzm45NmiQLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'neutral', embed: `<iframe width="650" height="400" src="https://www.youtube.com/embed/pLVpJAVS27A?si=epz0_j1lHlWfLihe&amp;start=30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
];

let video = jsPsych.randomization.sampleWithoutReplacement(videos, 1)[0];
let primeCondition = video.embed;
let whichPrime = video.name;

let primingTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='taskHeading'>Task 1 of 3</h1>
    <p class='instructions'>
        In this task, you will watch the following video. Please press the video to begin.<br>
        Please do not skip or change the speed; you will not be able to move on if you do so.<br>
        You will automatically proceed to Task 2 once the video ends.
    </p>
    ${primeCondition}
    `,
    trial_duration: 78000,
    choices: ['NO KEYS'],
    data: {
        collect: true,
        trialType: 'prime',
        whichPrime: whichPrime
    }
};
timeline.push(primingTrial);

// IAT
let iatWelcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1 class='taskHeading'>Task 2 of 3</h1>
        <p>You will use the <span class='key'>F</span> and <span class='key'>J</span> keys to categorize words into groups as quickly and accurately as you can.</p>
        <p>There will be 4 parts. The directions will change for each part.</p>
        <p>Press the <span class='key'>SPACE</span> key to begin.</p>
        `,
    choices: [' '],
};
timeline.push(iatWelcome);

for (let block of conditions) {

    // Instructions
    let blockInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h2>Part ${conditions.indexOf(block) + 1} of 4</h2>
        <p>In this part, the two categories will be: <b>${block.categories[0]}</b> and <b>${block.categories[1]}</b>.</p>
        <p>If the word should be categorized into the <b>${block.categories[0]}</b> category, then press <span class='key'>F</span>.</p>
        <p>If the word should be categorized into the <b>${block.categories[1]}</b> category, then press <span class='key'>J</span>.</p>
        <p>Press <span class='key'>SPACE</span> to start.</p>
    `,
        choices: [' '],
    };
    timeline.push(blockInstructions);

    // Trials
    let blockConditions = jsPsych.randomization.repeat(block.trial, 1);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <p class='category1'><b>${block.categories[0]}</b> (press 'F')</p>
            <p class='category2'><b>${block.categories[1]}</b> (press 'J')</p>
            <p class='stimulusWord'>${condition.word}</p>
            `,
            choices: ['f', 'j'],
            data: {
                trialType: 'iat',
                word: condition.word,
                expectedCategory: condition.expectedCategory,
                expectedCategoryAsDisplayed: condition.expectedCategoryAsDisplayed,
                leftCategory: block.categories[0],
                rightCategory: block.categories[1],
                collect: true,
            },
            on_finish: function (data) {
                if (data.response === data.expectedResponse) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);

        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p class='fixation'>+</p>`,
            choices: ['NO KEYS'],
            trial_duration: 250
        };
        timeline.push(fixationTrial);
    }
}

// Questionnaire
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
    <h1 class='taskHeading'>Task 3 of 3</h1>
    <p>Please answer the following 10 questions.</p>
    `,
    button_label: 'Submit',
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
    ],
    data: {
        collect: true,
        trialType: 'questionnaire',
    }
};
timeline.push(likertSurvey);

// Results
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
    <h1>Please wait...</h1>
    <span class='loader'></span>
    <p>We are saving the results of your inputs.</p>
    `,
    on_start: function () {
        // ⭐ Update the following three values as appropriate ⭐
        let prefix = 'eco-emotions';
        let dataPipeExperimentId = 'R3IeWxvW6LgG';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
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

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1>
    <p>You can close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['collect', 'stimulus', 'trial_type', 'plugin_version'])
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

jsPsych.run(timeline);