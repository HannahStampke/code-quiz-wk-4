// buttons
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button");

// timer text
var timer = document.querySelector("#timer");

// Answers list
var options = document.querySelector(".options");

// Highscore
var viewHighscores = document.querySelector("#view-highscores");

// text fields selectors
var heading = document.querySelector("#heading");
var subheading = document.querySelector("#subheading");
var answerFeedback = document.querySelector("#answer");
var formInput = document.querySelector("#form");
var resultsDisplay = document.querySelector("#results");
var nameInput = document.querySelector("#name");
var resultsTable = document.querySelector("#results-table");

// clear lists
var optionLi = [...Array(4)];
var optionA = [...Array(4)];

// clear highscores
var highscores = [];
var liEl = [];
var lastQuestion = [];

//check and counter variables
var finalScore;
var check;
var doneCount;
var currentQuestion;
var stopTimer;

//questions
var question1 = {
  question: "Is REACT front end or back end?",
  option0: "front end",
  option1: "back end",
  rightOption: "option0",
};
var question2 = {
  question: "Which of the following is NOT a coding language:",
  option0: "Swift",
  option1: "Javascript",
  option2: "D++",
  option3: "Python",
  rightOption: "option2",
};
var question3 = {
  question: "What language would you use to make a webpge PRETTY?",
  option0: "HTML",
  option1:"CSS",
  option2: "Python",
  option3: "Cucumber Plus",
  rightOption: "option1",
};
var question4 = {
  question: 'What does HTML stand for?',
  option0: "Hypertext Markup Language",
  option1: "Hardform Text Model Language",
  option2: "Heaps Trash Made Lists",
  option3: "Heading Template Modelled Languages",
  rightOption: "option0",
};
var question5 = {
  question: "What file type is a README?",
  option0: ".pdf",
  option1: ".indd",
  option2: ".css",
  option3: ".md",
  rightOption: "option3",
};

// All questions
var questions = [
  question1,
  question2,
  question3,
  question4,
  question5,
];

// P
var pEl = document.createElement("p");

// Seconds
var seconds;

// Start the quiz from the start button
function startQuiz() {
  startButton.style.display = "none";
  heading.textContent = "";
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }

  // Start timer and change view
  startTimer();
  renderView();
}

// Show questions and options
function renderView() {
  answerFeedback.textContent = "";
  var same = true;

  // Chooses a random question
  if (lastQuestion.length === 0) {
    currentQuestion = Math.floor(Math.random() * questions.length);
    lastQuestion[0] = currentQuestion;
  } else {

    // Chooses a question from array and checks if been used
    while (same) {
      currentQuestion = Math.floor(Math.random() * questions.length);
      if (lastQuestion.includes(currentQuestion)) {
        same = true;
      } else {
        lastQuestion.push(currentQuestion);
        same = false;
      }
    }
  }
  subheading.textContent = questions[currentQuestion].question;

  //creates 'li' and 'a' for all choices
  createOptions(currentQuestion);
}

// Clear all text and tables.
function clearView() {
  heading.textContent = "";
  subheading.textContent = "";
  pEl.textContent = "";
  resultsTable.textContent = "";
  viewHighscores.textContent = "";
  timer.textContent = "";
  nameInput.textContent = "";
  if (optionA[0] !== undefined) {
    for (let j = 0; j < optionA.length; j++) {
      optionA[j].textContent = "";
    }
  }
}

// Create list of answers
function createOptions(currentQuestion) {

  //check if first question then generates or changes value
  if (doneCount === 0) {
    for (let z = 0; z < 4; z++) {
      var currentOption = "option" + z;
      optionLi[z] = document.createElement("li");
      optionA[z] = document.createElement("a");
      optionA[z].setAttribute("data-option", z);
      optionA[z].setAttribute("href", "#");
      optionA[z].textContent = questions[currentQuestion][currentOption];
      options.appendChild(optionLi[z]);
      optionLi[z].appendChild(optionA[z]);
    }
  } else {
    for (let j = 0; j < 4; j++) {
      var currentOption = "option" + j;
      optionA[j].textContent = questions[currentQuestion][currentOption];
    }
  }
}

// Start and stop timer
function startTimer() {
  var timerInterval = setInterval(function () {
    console.log(stopTimer);
    if (stopTimer !== true) {
      if (seconds > 0) {
        seconds--;
        timer.textContent = "Timer: " + seconds;
      } else {

        //if time runs out then run outOfTime
        clearInterval(timerInterval);
        outOfTime();
      }
    } else if (stopTimer === true) {
      timer.textContent = "";
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Displays the highscores
function displayResults() {
  clearView();
  viewHighscores.style.display = "none";
  for (let i = 0; i < highscores.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = highscores[i];
    resultsTable.appendChild(liEl);
  }
  subheading.textContent = "Highscores";
  resultsDisplay.classList.remove("hide");
}

// Shows final score and updates highscores
function postResults(name) {
  formInput.classList.add("hide");
  highscores.unshift(name + " - " + finalScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayResults();
}

// User is prompted to enter name and save score
function quizComplete() {
  stopTimer = true;
  clearView();
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  finalScore = seconds;
  subheading.textContent = "Quiz complete!";
  pEl.textContent = "Your score is " + finalScore;
  subheading.appendChild(pEl);
  formInput.classList.remove("hide");
}

// Check answer
function checkAnswer(selected) {
  var chosenOption = "option" + selected;

  // Next question or end quiz
  if (chosenOption === questions[currentQuestion].rightOption) {
    doneCount++;
    if (doneCount < questions.length) {
      renderView();
    } else {
      quizComplete();
    }
  } else if (chosenOption !== questions[currentQuestion].rightOption) {

    // Wrong answer penalty
    seconds = seconds - 5;
    answerFeedback.textContent = "Oh dear...";
  }
}

//outOfTime function
function outOfTime() {
  clearView();
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  timer.textContent = "Time is up";
  subheading.textContent = "Sorry you ran out of time. Better luck next time";
  resultsDisplay.classList.remove("hide");
  clearButton.style.display = "none";
}

// Main view
function initialRender() {
  heading.textContent = "Try your luck: Coding Quiz";
  subheading.textContent =
    "Each wrong answer will deduct 5 seconds from your time! the more time left, the higher the score... Good luck!";
  startButton.style.display = "block";
  clearButton.style.display = "inline-block";
  answerFeedback.textContent = "";
  nameInput.textContent = "";
  timer.textContent = "Timer: " + seconds;
  viewHighscores.style.display = "inline-block";
  viewHighscores.textContent = "Highscores";
  resultsDisplay.classList.add("hide");
}

//clear highscore
function clearHighscores() {
  localStorage.clear();
  highscores = [];
  while (resultsTable.firstChild) {
    resultsTable.removeChild(resultsTable.firstChild);
  }
}

// Start
function init() {
  doneCount = 0;
  seconds = 75;
  lastQuestion = [];
  stopTimer = false;
  initialRender();
}

// View highscore
viewHighscores.addEventListener("click", function (event) {
  stopTimer = true;
  startButton.style.display = "none";
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  displayResults();
});

// CLick clear
clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearHighscores();
});

// CLick back
backButton.addEventListener("click", init);

//event listener for choices
options.addEventListener("click", function (e) {
  var node = e.target;
  if (node && node.nodeName == "A") {
    check = checkAnswer(node.dataset.option);
  }
});

// Click add highscore
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var nameText = nameInput.value.trim();
  if (nameText === "") {
    window.alert("Please enter your name");
  } else {
    postResults(nameText);
  }
});

//event listener on the start button
startButton.addEventListener("click", startQuiz);

//initialise the quiz when the JS finished loading
init();