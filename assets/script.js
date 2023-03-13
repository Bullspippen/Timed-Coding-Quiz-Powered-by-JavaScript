const questionsArray = [
  {
    question: "Which of the following is not javascript data types?",
    answersArray: [
      "Null type",
      "Undefined type",
      "Number type",
      "All of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question:
      "Which of the following can be used to call a JavaScript Code Snippet?",
    answersArray: [
      "Function/Method",
      "Preprocessor",
      "Triggering Event",
      "RMI",
    ],
    correctAnswer: "Function/Method",
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    answersArray: ["var", "constant", "let", "const"],
    correctAnswer: "const",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    answersArray: [
      "getElementById()",
      "getElementsByClassName()",
      "Both A and B",
      "None of the above",
    ],
    correctAnswer: "Both A and B",
  },
  {
    question:
      "What keyword is used to check whether a given property is valid or not?",
    answersArray: ["is in", "in", "lies", "exists"],
    correctAnswer: "in",
  },
];

const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answers button");
const scoreContainer = document.getElementById("scoreContainer");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initialsForm");
const initialsInput = document.getElementById("initials");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("timer");
const timerContainer = document.getElementById("timerContainer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerId;

function startQuiz() {
  // hide start button
  const startButton = document.getElementById("startBtn");
  startButton.classList.add("hide");

  // show quiz container
  quizContainer.classList.remove("hide");

  // start timer
  startTimer();

  // display first question
  displayNextQuestion();
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

function displayNextQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = currentQuestion.answersArray[i];
    answerButtons[i].addEventListener("click", checkAnswer);
  }
}

function checkAnswer() {
  const selectedAnswer = this.textContent;
  const currentQuestion = questionsArray[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  if (isCorrect) {
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    timeLeft -= 10;
    feedbackElement.textContent = "Wrong!";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questionsArray.length) {
    endQuiz();
  } else {
    displayNextQuestion();
  }
}

function endQuiz() {
  // stop timer
  clearInterval(timerId);

  // hide quiz container
  quizContainer.classList.add("hide");

  // show score container
  scoreContainer.classList.remove("hide");

  // display score
  scoreElement.textContent = score;
}

function saveScore(e) {
  e.preventDefault();

  const initials = initialsInput.value.trim();
  if (typeof initials !== "string") {
    feedbackElement.textContent =
      "Please enter a valid string for your initials.";
    return;
  }

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const newScore = {
    initials: initials.toUpperCase(),
    score: score,
  };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.assign("./highscores.html");
}
