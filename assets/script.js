let questionsArray = [
    {
        question:'Which of the following is not javascript data types?',
        answersArray:['Null type', 'Undefined type', 'Number type','All of the above'],
        correctAnswer:'All of the above'
    },
    {
        question:'Which of the following can be used to call a JavaScript Code Snippet?',
        answersArray:['Function/Method', 'Preprocessor', 'Triggering Event','RMI'],
        correctAnswer:'Function/Method'
    },
    {
        question:'How can a datatype be declared to be a constant type?',
        answersArray:['var', 'constant', 'let','const'],
        correctAnswer:'const'
    },
    {
        question:'Which of the following methods is used to access HTML elements using Javascript?',
        answersArray:['getElementById()', 'getElementsByClassName()', 'Both A and B','None of the above'],
        correctAnswer:'Both A and B'
    },
    {
        question:'What keyword is used to check whether a given property is valid or not?',
        answersArray:['is in', 'in', 'lies','exists'],
        correctAnswer:'in'
    }
]

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