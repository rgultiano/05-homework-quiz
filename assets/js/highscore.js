init();


function init(){
    const elHighScoreList = document.getElementById('highscore-list');
    //retrieve the HighScores
    let hs = JSON.parse(localStorage.getItem("QuizHighScore"));
    hs = hs ? hs : [];
    elHighScoreList.innerHTML = '';

    hs.forEach((score, index) => {
    // populate the highscores
    const elScore = document.createElement('li');
    elScore.innerText = "" + (index + 1) + ". " + score["player"] + " - " + score["score"];
    elHighScoreList.appendChild(elScore);
    });
    
}

function clearScores(){
    localStorage.removeItem('QuizHighScore');
    init();
}

function back(){
    window.location.href = 'index.html';
}