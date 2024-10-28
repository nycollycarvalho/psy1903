let jsPsych = initJsPsych();
let timeline = [];


let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='name'>Welcome to the experiment!</h1> 
    <p>In this experiment, you will have to complete the three folllowing tasks:<p>
    <ul class='list'>
    <li>In Task 1, you will watch a short video.</li>
    <li>In Task 2, categorize a series of words.</li>
    <li>In Task 3, you will answers a brief set of questions.</li>
    </ul>

    <p>If you are doing this experiment in a mobile device, please, change to a computer.</p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

let videos = [
    { name: 'climate-anxiety', embed: `<iframe width="650" height="400" src="https://www.youtube.com/embed/QHH3iSeDBLo?si=l2aaso7D6oZiZcHX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'school-anxiety', embed: `<iframe width="650" height="400" src="https://www.youtube.com/embed/Okrqwbt-TlI?si=1RgCHdzm45NmiQLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'neutral', embed: `<iframe width="650" height="400" src="https://www.youtube.com/embed/pLVpJAVS27A?si=epz0_j1lHlWfLihe&amp;start=30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
];

let video = jsPsych.randomization.sampleWithoutReplacement(videos, 1)[0].embed;
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

let IATInstructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <h1 class='taskHeading'>Task 2 of 3</h1>
    <p>In this task you will, you will be shown a series of words and asked to sort them into categories.</p>
    <p>Press <span class='key'> SPACE </span> to begin.</p>
    `,
    post_trial_gap: 250
};

timeline.push(IATInstructions);

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
        let dataPipeExperimentId = 'qtpiSXvcWypL';
        let forceOSFSave = true;

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