// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
    getDatabase,
    ref,
    onChildAdded,
    push
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArdnONFHPdOfF0_tNKj5ZVq0b3gC1X3Bo",
    authDomain: "database-quiz-app.firebaseapp.com",
    projectId: "database-quiz-app",
    storageBucket: "database-quiz-app.appspot.com",
    messagingSenderId: "904847300209",
    appId: "1:904847300209:web:67d945a803f1ba57a36dd0",
    measurementId: "G-22J27T57Q6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()

var loader = document.getElementById('loader')
var showQuestion = document.getElementById('showQuestion')

function getDataFromDatabase() {
    loader.style.display = 'block'
    showQuestion.style.display = 'none'

    const reference = ref(db, 'questions/')
    onChildAdded(reference, function (data) {
        console.log(data.val())
        questions.push(data.val())
        loader.style.display = 'none'
        showQuestion.style.display = 'block'
        renderQuestion()
    })
}
getDataFromDatabase()

var questions = []

var currentQuestion = document.getElementById('currentQuestion');
var totalQuestion = document.getElementById('totalQuestion');
var question = document.getElementById('question');
var answerParent = document.getElementById('answerParent');
var score = 0;
var indexNum = 0;

window.nextQuestion = function () {
    if (indexNum + 1 == questions.length) {
        alert("Your Score is " + score)
    } else {
        indexNum++
        renderQuestion()
    }
}

window.checkQuestion = function (a, b) {
    if (a == b) {
        score++
        console.log(score)
    }
    nextQuestion()
}
function renderQuestion() {
    currentQuestion.innerHTML = indexNum + 1
    totalQuestion.innerHTML = questions.length

    var obj = questions[indexNum]

    question.innerHTML = obj.question
    answerParent.innerHTML = ''
    for (var i = 0; i < obj.options.length; i++) {
        answerParent.innerHTML += `<div class="col-md-4">
        <div class="p-2">
            <button onclick="checkQuestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark fs-4 rounded-pill w-100">
                ${obj.options[i]}
            </button>
        </div>
    </div>`
    }
}
renderQuestion()


