let blocksA = [
    ['nature', 'school'],
    ['anxiety', 'serenity']
];


let blocksB = [
    ['nature or anxiety', 'school or serenity'],
    ['nature or serenity', 'school or anxiety']
];


// There should be 10 words per category
let words = {
    nature: ['ecosystem', 'carbon', 'biodiversity', 'polar', 'rainforest', 'desert', 'ocean', 'flora', 'atmosphere', 'mountains'],
    school: ['curriculum', 'homework', 'semester', 'syllabus', 'textbook', 'assignment', 'exam', 'graduation', 'library', 'professor'],
    anxiety: ['panic', 'worry', 'tension', 'fear', 'stress', 'dread', 'agitation', 'sweating', 'discomfort', 'avoidance'],
    serenity: ['tranquility', 'peace', 'relaxation', 'quietude', 'balance', 'ease', 'composure', 'soothing', 'contentment', 'calm'],
};




let count = 4;



// The following code will process the above information into a `conditions` array you
// can use to structure your experiment.
//
// !! DO NOT MODIFY ANY OF THE FOLLOWING CODE !!
//
let conditions = generateConditions();
console.log(conditions);


function generateConditions() {


    let conditions = [];


    let blocks = shuffle(blocksA).concat(shuffle(blocksB));


    for (let categories of blocks) {


        let trials = [];


        for (let category of shuffle(categories)) {


            let wordChoices = [];


            if (category.includes('or')) {
                let parts = category.split(' or ');
                wordChoices = shuffle(words[parts[0]].concat(words[parts[1]]));
            } else {
                wordChoices = shuffle(words[category]);
            }


            let wordsLeft = [...wordChoices];


            for (let i = 0; i < count / 2; i++) {


                if (wordsLeft.length == 0) {
                    wordsLeft = shuffle([...wordChoices]);
                }


                let word = sample(wordsLeft);
                remove(wordsLeft, (element) => element === word);


                if (categories[0] == category) {
                    expectedResponse = 'f';
                } else {
                    expectedResponse = 'j';
                }


                trials.push({
                    word: word,
                    expectedCategory: searchObject(words, word),
                    expectedCategoryAsDisplayed: category,
                    expectedResponse: expectedResponse
                })
            }
        }


        conditions.push({
            categories: categories,
            trials: shuffle(trials)
        });
    }


    return conditions;
}




function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Remove an element from an array
function remove(array, predicate) {
    const index = array.findIndex(predicate);
    if (index !== -1) {
        array.splice(index, 1);
    }
}


// Select a random element from an array
function sample(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}


// Search an object for a string
function searchObject(haystack, needle) {
    for (let key in haystack) {
        if (haystack[key].includes(needle)) {
            return key; // Return the key where the string was found
        }
    }
}
