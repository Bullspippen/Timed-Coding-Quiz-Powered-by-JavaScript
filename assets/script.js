const questionsArray = [
  {
    question: "Which of the following is not javascript data types?",
    answers: [
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
    answers: [
      "Function/Method",
      "Preprocessor",
      "Triggering Event",
      "RMI",
    ],
    correctAnswer: "Function/Method",
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    answers: ["var", "constant", "let", "const"],
    correctAnswer: "const",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    answers: [
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
    answers: ["is in", "in", "lies", "exists"],
    correctAnswer: "in",
  },
];

const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementsByClassName("answers")[0].children;
const scoreContainer = document.getElementById("scoreContainer");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initialsForm");
const initialsInput = document.getElementById("initials");
const feedbackContainer = document.getElementById("feedbackContainer");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("timer");

let currentQuestionIndex;
let score;
let timerId;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timerElement.textContent = 60;
  scoreElement.textContent = score;
  feedbackElement.textContent = "";
  initialsInput.value = "";
  hideElements(scoreContainer, initialsForm, feedbackContainer);
  showElements(quizContainer, timerElement);
  setQuestion();
  startTimer();
}

function setQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    answerButtons[i].textContent = currentQuestion.answers[i];
    answerButtons[i].removeEventListener("click", handleAnswerButtonClick);
    answerButtons[i].addEventListener("click", handleAnswerButtonClick);
  }
}

function handleAnswerButtonClick() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  const selectedAnswer = this.textContent;
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong!";
    timerElement.textContent = Math.max(Number(timerElement.textContent) - 10, 0);
  }
  scoreElement.textContent = score;
  currentQuestionIndex++;
  if (currentQuestionIndex === questionsArray.length) {
    endQuiz();
  } else {
    setQuestion();
  }
}

function startTimer() {
  timerId = setInterval(() => {
    timerElement.textContent = Math.max(Number(timerElement.textContent) - 1, 0);
    if (timerElement.textContent === "0") {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerId);
  hideElements(quizContainer, timerElement);
  showElements(scoreContainer, initialsForm, feedbackContainer);
  scoreElement.textContent = score;
  feedbackElement.textContent = "";
}
