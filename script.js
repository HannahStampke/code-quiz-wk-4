var questions = [{
  question: "What 'end' is REACT?",
  choices: ["Front-end", "Back-end", "Rear-end", "Right-end"],
  answer: "Front-end"
},

{
  question: "Which of the following is NOT a coding language?",
  choices: ["CSS", "Javascript", "D++", "Python", ],
  answer: "D++"
},

{
  question: "What language would you use to make a web page PRETTY?",
  choices: ["HTML", "CSS", "Javascript", "Cucumber Plus"],
  answer: "CSS"
},

{
  question: "What does HTML stand for?",
  choices: ["Hardform Text Model Language", "Heaps Trash Made Lists", "Heading Template Modelled Languages", "Hypertext Markup Language"],
  answer: "Hypertext Markup Language"
},

{
  question: "What file type is a README?",
  choices: [".md", ".css", ".pdf", ".rm"],
  answer: ".md"
}

]

// Variables
var startContainer = document.getElementById("startcontainer");
var score = 0;
var questionIndex = 0;
var startBtn = document.getElementById("startbtn");
var submitBtn = document.getElementById("sumbitbtn");
var restartBtn = document.getElementById("restartbtn");
var backBtn = document.getElementById("backbtn");

var questionDiv = document.getElementById("quizContainer");
var questionTitle = document.getElementById("questionTitle");
var answer1 = document.getElementById("btn1");
var answer2 = document.getElementById("btn2");
var answer3 = document.getElementById("btn3");
var answer4 = document.getElementById("btn4");
var answerCheck = document.getElementById("answerCheck");

var timeLeft = document.getElementById("timeLeft");
var secsLeft = 75;
var timer = document.getElementById("timer");
var timesOver = document.getElementById("timesover")

var highscores = document.getElementById("highscores");
var viewHighScore = document.getElementById("get-score");
var scoreList = document.getElementById("scoreList");

var summary = document.getElementById("summary");
var finalScore = document.getElementById("finalScore");
var initials = document.getElementById("initials");

var correctAns = 0;
var questionNum = 0;
var scoreResult = 0;
var questionIndex = 0;
var questionRandom;

// Show the initial screen
homeScreen();
function homeScreen() {
startContainer.style.display = "block"
summary.style.display = "none"
highscores.style.display = "none"
questionDiv.style.display = "none"
timesOver.style.display = "none"
}

//newquiz function for the timer to start and quiz to begin
function newQuiz() {
questionIndex = 0;
scoreResult = 0;
secsLeft = 75;
timeLeft.textContent = secsLeft;
initials.textContent = "";
startContainer.style.display = "none";
summary.style.display = "none";
questionDiv.style.display = "block";

var timerCount = setInterval(function() {
  secsLeft--;
  timeLeft.textContent = secsLeft;
  if (secsLeft === 0) {
      console.log("timer")
      clearInterval(secsLeft);
      clearInterval(timerCount);
      timesOver.style.display = "block";
      timer.style.display = "none";
      timeLeft.style.display = "none";
      gameOver();
  }
}, 1000);

showQuiz();
}

function showQuiz() {
nextQuestion();
console.log("working")
}

// Show questions
function nextQuestion() {
questionTitle.textContent = questions[questionIndex].question;
answer1.textContent = questions[questionIndex].choices[0];
answer2.textContent = questions[questionIndex].choices[1];
answer3.textContent = questions[questionIndex].choices[2];
answer4.textContent = questions[questionIndex].choices[3];
}

// Check answers
function checkAns(answer) {
if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
  scoreResult++;
  answerCheck.textContent = "Correct"
  answerCheck.style.color = "green";
  console.log("corr")
} else {
  secsLeft -= 5;
  answerCheck.textContent = "Incorrect";
  answerCheck.style.color = "red";
  console.log("incorr")
}
questionIndex++;
if (questionIndex < questions.length) {
  nextQuestion();
} else {
  gameOver();
  timesOver.style.display = "block"
  timer.style.display = "none";
  timeLeft.style.display = "none"
}
if (secsLeft === 0) {
  gameOver();
}
}

// Display answers
function choose0() { checkAns(0) };

function choose1() { checkAns(1) };

function choose2() { checkAns(2) };

function choose3() { checkAns(3) };

// Display score
function gameOver() {
console.log("jkjkjkkjkj")
startContainer.style.display = "none";
summary.style.display = "block";
highscores.style.display = "none";
questionDiv.style.display = "none";
timer.style.display = "none";
timesOver.style.display = "block";
finalScore.textContent = scoreResult
}

// Save to local storage.
function storeScores(event) {
event.preventDefault();

var storeHighScore = localStorage.getItem("high scores");
var arrayScores;
if (!storeHighScore) {
  arrayScores = [];
} else {
  arrayScores = JSON.parse(storeHighScore)
}
var userScore = {
  initials: initials.value,
  score: finalScore.textContent
};
console.log(userScore)
arrayScores.push(userScore);

var scoreString = JSON.stringify(arrayScores);
window.localStorage.setItem("high scores", scoreString);

showScore();
}

var i = 0

function showScore() {
startContainer.style.display = "none";
summary.style.display = "none";
highscores.style.display = "block";
questionDiv.style.display = "none";
timesOver.style.display = "none";
timer.style.display = "none";
var saveScore = localStorage.getItem("high scores");
if (saveScore === null) {
  return;
}
console.log(scoreList)
var storeHighScore = JSON.parse(saveScore);

for (; i < storeHighScore.length; i++) {
  var newScore = document.createElement("p");
  newScore.innerHTML = storeHighScore[i].initials + " - Score:" + storeHighScore[i].score;

  scoreList.appendChild(newScore);
}
}

//addEventListeners
startBtn.addEventListener("click", newQuiz);
answer1.addEventListener("click", choose0);
answer2.addEventListener("click", choose1);
answer3.addEventListener("click", choose2);
answer4.addEventListener("click", choose3);
submitBtn.addEventListener("click", function(event) {
storeScores(event)
});

// Restart the quiz.
restartBtn.addEventListener("click", function() {
startContainer.style.display = "block";
highscores.style.display = "none";
});

// View highscores.
viewHighScore.addEventListener("click", function(event) {
showScore(event)
});

// Return to quiz.
backBtn.addEventListener("click", function() {
startContainer.style.display = "block";
highscores.style.display = "none";
})