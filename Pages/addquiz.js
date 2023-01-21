// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, 
    set, 
    ref,
push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

var question = document.getElementById('question');
var option = document.getElementById('option');
var optionsParent = document.getElementById('optionsParent');
var correctAnswerElem = document.getElementById('correctAnswer');

var options = []
var correctAnswer

function renderOptions() {
    optionsParent.innerHTML = ''
    for (var i = 0; i < options.length; i++) {
        optionsParent.innerHTML += `<li onclick="setCorrectAnswer('${options[i]}')" class='p-2 bg-light fs-5 rounded shadow my-2'>${options[i]}</li>`
    }
}

window.addOption = function () {
    options.push(option.value)
    console.log(options)
    renderOptions()
}

window.setCorrectAnswer = function (a) {
    correctAnswer = a
    correctAnswerElem.innerHTML = correctAnswer
}

window.submitQuestion = function() {
    var obj = {
        question : question.value,
        options : options,
        correctAnswer : correctAnswer
}

obj.id = push(ref(db, `questions/`)).key

const reference = ref(db, `questions/${obj.id}`)
set(reference, obj)
console.log(obj)
}
