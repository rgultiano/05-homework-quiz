//init page vars
var currQuestion; 
var currQuestionIndex;
var incorrectPenalty = 10;
var score = 60;
var timer;

// init element vars
var elScore = document.getElementById('countdown');
var secIntro = document.getElementById('intro');
var secQuiz = document.getElementById('quiz');
var secSaveScore = document.getElementById('save-score');
var secQuizFeedback = document.getElementById('quiz-feedback');
var elFeedbackText = document.getElementById('feedback-text');
var divAnswers = document.getElementById('answers');
var elQuestionText = document.getElementById('question-text');
var inpPlayerInitials = document.getElementById('player-initials');


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


// start the game by initialising game values
function startGame(){
    currQuestionIndex = -1;
    nextQuestion();
    score = 60;
    timer = window.setInterval(countdownScore, 1000);
}

function endGame(){
    if(timer)
        window.clearInterval(timer);

    // show saveScore
    secIntro.style.display = 'none';
    secSaveScore.style.display = 'block';
    secQuiz.style.display = 'none';
}

// save the score with the given initials
function saveScore(){
    // first load the high score table
    let hs = JSON.parse(localStorage.getItem("QuizHighScore"));
    hs = hs ? hs : [];
    const inserted = false;
    //iterate through and if the score is higher then insert
    for(i = 0; i < hs.length && !inserted; i++){
        if(hs[i] < score){
            hs.splice(i, 0, {"player": inpPlayerInitials.value, "score": score});
        }
    }
    if(!inserted){
        // wasn't higher than any score! put at the end
        hs.push({"player": inpPlayerInitials.value, "score": score})
    }

    // save the score
    localStorage.setItem("QuizHighScore", JSON.stringify(hs));
    window.location.href = 'highscore.html';
}