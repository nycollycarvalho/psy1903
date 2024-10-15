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

let likert_scale = [
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Almost always"
];
let likertSurvey = {
    type: jsPsychSurveyLikert,
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

jsPsych.run(timeline);