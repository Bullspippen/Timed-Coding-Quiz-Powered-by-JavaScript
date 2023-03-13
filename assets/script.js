import { questionsArray } from './assets/questions.js';

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const resultsContainer = document.getElementById('results-container');
const submitButton = document.getElementById('submit-btn');
const initialsInput = document.getElementById('initials');

let shuffledQuestions, currentQuestionIndex;
let timeLeft, timerId;
const timeLimit = 60; // seconds
const penalty = 10; // seconds

// Load the questions from the questions.js file
function loadQuestions() {
  return questionsArray;
}

// Start the quiz by hiding the start button and displaying the first question
function startQuiz() {
  shuffledQuestions = shuffle(loadQuestions());
  currentQuestionIndex = 0;
  timeLeft = timeLimit;
  setNextQuestion();
  startTimer();
  startButton.classList.add('hide');
  questionContainer.classList.remove('hide');
}

// Shuffle the questions array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Set the next question and update the answer buttons
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Show the question and answer buttons
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answersArray.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('btn');
    if (answer === question.correctAnswer) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// Reset the answer buttons to their default state
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Select an answer to the question
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (!correct) {
    timeLeft = Math.max(timeLeft - penalty, 0);
    timerElement.innerText = timeLeft;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    clearInterval(timerId);
    endQuiz();
  }
}

// Set the status class for an element
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  }
}

// Clear the status class for an element
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
}

// Start the timer
function startTimer() {
  timerElement.innerText = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endQuiz();
    }
  }, 1000);
}

// End the quiz by hiding the question container and displaying the results container
function endQuiz() {
  questionContainer.classList.add('hide');
  resultsContainer.classList.remove('hide');
  submitButton.addEventListener('click', saveScore);
}

// Save the user's score
localStorage.setItem('userScore', score);

// Display the user's final score
displayScore();