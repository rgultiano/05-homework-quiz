//init page vars
var currQuestion; 
var currQuestionIndex;
var incorrectPenalty = 10;
var score = 60;

// init element vars
var elScore = document.getElementById('countdown');
var secIntro = document.getElementById('intro');
var secQuiz = document.getElementById('quiz');
var secSaveScore = document.getElementById('save-score');
var secQuizFeedback = document.getElementById('quiz-feedback');
var elFeedbackText = document.getElementById('feedback-text');
var divAnswers = document.getElementById('answers');
var elQuestionText = document.getElementById('question-text');


//load questions
var questions = [
    {
        question: "The answer is 3",
        answers: [
            {
                id: '1',
                text: "Answer 1"
            },
            {
                id: '2',
                text: "Answer 2"
            },
            {
                id: '3',
                text: "Answer 3"
            },
            {
                id: '4',
                text: "Answer 4"
            },
            {
                id: '5',
                text: "Answer 5"
            },
        ],
        correct: '3',
    },{
        question: "The answer is 2",
        answers: [
            {
                id: '1',
                text: "Answer 1"
            },
            {
                id: '2',
                text: "Answer 2"
            },
            {
                id: '3',
                text: "Answer 3"
            },
            {
                id: '4',
                text: "Answer 4"
            },
            {
                id: '5',
                text: "Answer 5"
            },
        ],
        correct: '2',
    },{
        question: 'The answer is 5',
        answers: [
            {
                id: '1',
                text: 'Answer 1'
            },
            {
                id: '2',
                text: 'Answer 2'
            },
            {
                id: '3',
                text: 'Answer 3'
            },
            {
                id: '4',
                text: 'Answer 4'
            },
            {
                id: '5',
                text: 'Answer 5'
            },
        ],
        correct: '5',
    },
];

// function that loads the question and an array of answers to the page
function loadQuestion(question){
    //clear all previous answers
    divAnswers.innerHTML='';
    elQuestionText.innerText = question.question;
    question.answers.forEach( answer => {
        //create the button with value and text from the question
        let btnAnswer = document.createElement('button');
        btnAnswer.className="answer";
        btnAnswer.value = answer.id;
        btnAnswer.innerText = answer.text;
        btnAnswer.onclick = checkAnswer;

        //append the answer to the html page
        divAnswers.appendChild(btnAnswer);
    })
}

// function that handles an answer being selected
function checkAnswer(event){
    const btnAnswer = event.target;
    if(btnAnswer.value !== currQuestion.correct){
        //answer was incorrect
        incorrectAnswer();
        showFeedback('Wrong!');
    } else{
        showFeedback('Correct!');
    }
    nextQuestion();
}

// function for when the next question needs to be loaded (or quiz end)
function nextQuestion(){
    currQuestionIndex++;
    if(currQuestionIndex < questions.length)
    {    
        currQuestion = questions[currQuestionIndex];

        loadQuestion(currQuestion);
    } else {
        // out of questions. End the game
        endGame();
    }
}

// function to handle penalties incorrect answers
function incorrectAnswer(){
    // reduce the timer
    setScore(score-incorrectPenalty)

}

// function to handle the countdown of the score
function countdownScore(){
    //tick the score down by 1
    setScore(score-1);
}

// init
function quizInit(){
    //hide intro and endgame sections
    secIntro.style.display = 'none';
    secSaveScore.style.display = 'none';
    secQuizFeedback.style.display = 'none';
    secQuiz.style.display = 'block';

    //show quiz section
    startGame();
}

function setScore(value){
    // score can't be less than zero, if so set to zero
    score = value < 0 ? 0 : value;
    elScore.innerText = score;
}

// show feedback for a few seconds
function showFeedback(text){
    elFeedbackText.innerText = text;
    secQuizFeedback.style.display = 'block';

    //hide feedback after 1 seconds
    window.setTimeout(hideFeedback, 1000)
}

function hideFeedback(){
    secQuizFeedback.style.display = 'none';
}


// start the game
function startGame(){
    currQuestionIndex = -1;
    nextQuestion();
    score = 60;
    window.setInterval(countdownScore, 1000);
}

function endGame(){
    window.clearInterval(countdownScore);
    
    // show saveScore
    secIntro.style.display = 'none';
    secSaveScore.style.display = 'block';
    secQuiz.style.display = 'none';
}