import { questionsArray } from './questions.js';

let welcomePage = document.getElementById('welcomePage')
let questionPage = document.getElementById('questionsPage')
let scorePage = document.getElementById('scorePage')

let questions = document.getElementById('questions')
let answers = document.getElementById('answers')

let countdown;
let timerEl = document.getElementById('timer')
let time = 60;
timerEl.textContent = 'Time Left: '+time;
let secondsLeft;
let questionIndex = 0;
let numberCorrect;
let numberIncorrect;
let questionArrayOrder;

let scoreEl = document.getElementById('score')
let finalScore =0

let inputEl = document.getElementById('inputInitials')

let sectionsArray = [welcomePage, questionPage, scorePage]

function hidePages(){
    for (let i = 0; i < sectionsArray.length; i++) {
        if(!sectionsArray[i].classList.contains('hide')){
            sectionsArray[i].classList.add('hide')
        }
        
    }
}

function questionOrder(){
    let arrayIndex = [];
    for (let i = 0; i < questionsArray.length; i++) {
        arrayIndex.push(i)
    }

    return arrayIndex;
}

function startQuiz(){
    hidePages()
    questionPage.classList.remove('hide');

    secondsLeft = time;

    countdown = setInterval(() => {
        timerEl.textContent = 'Time Left: '+ secondsLeft;
        secondsLeft--;

        if(secondsLeft < 0){
            clearInterval(countdown)
            secondsLeft = time;
        }
    }, 1000)
    
    questionArrayOrder = questionOrder(questionsArray)

    questionDisplay(questionsArray, questionArrayOrder[questionIndex])
}

function questionDisplay(arr, index){
    questions.textContent = arr[index].question

    let ans;
    let but;
    let relativeAnswers = arr[index].answersArray;

    for (let i = 0; i < relativeAnswers.length; i++) {
        ans = document.createElement('LI')
        but = document.createElement('button')
        
        but.textContent = relativeAnswers[i]
        ans.addEventListener('click', nextQuestion)
        ans.appendChild(but)
        answers.appendChild(ans)
    }

}

function nextQuestion(event){
    let answerChosen = event.target.textContent
    let rightAnswer = questionsArray[questionArrayOrder[questionIndex]].correctAnswer

    if( answerChosen === rightAnswer){
        numberCorrect++
    }else{
        secondsLeft -= 10;
        numberIncorrect++
    }
    timerEl.textContent = 'Time Left: '+ secondsLeft;

    questionIndex++;

    clearPreviousQuestion()

    if(questionIndex < questionsArray.length){
        questionDisplay(questionsArray, questionArrayOrder[questionIndex])
    }
    else{
        finalScore = secondsLeft;
        scoreEl.textContent = finalScore
        scorePage.classList.remove('hide')
        clearInterval(countdown)
    }
    
}

function clearPreviousQuestion(){
    questions.textContent = '';
    while(answers.hasChildNodes()){
        answers.removeChild(answers.childNodes[0])
    }
}

function submitInitials(){
    console.log(inputEl.value)
}