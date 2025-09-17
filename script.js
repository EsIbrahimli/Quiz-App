const questions = [
    {
        question: "JavaScript-də hansı metod massivə yeni element sondan əlavə etmək üçün istifadə olunur?",
        answers: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "JavaScript-də hansı açar söz funksiyadan dəyər qaytarmaq üçün istifadə olunur?",
        answers: ["return", "yield", "get", "set"],
        correct: 0
    },
     {
        question: "JavaScript-də == və === operatorlarının əsas fərqi nədir?",
        answers: ["Tip yoxlaması", "Dəyər yoxlaması", "Həm tip, həm də dəyər yoxlaması", "Heç biri"],
        correct: 2
    },
     {
        question: "Aşağıdakı hansı düzgün massiv yaratmaq sintaksisidir?",
        answers: ["let arr = [];", "let arr = ();", "let arr = {};", "let arr = <>;"],
        correct: 0
    },
     {
        question: "Aşağıdakılardan hansı arrow function düzgün sintaksisdir?",
        answers: ["let sum = (a, b) => a + b;", "let sum = (a, b) -> a + b;", "let sum = function => (a, b) { return a + b; }", "let sum = (a, b) => { a + b };"],
        correct: 0
    },
     {
        question: "Hansı metod HTML elementini id ilə seçir?",
        answers: ["getElementById()", "querySelector()", "getElementsByClassName()", "querySelectorAll()"],
        correct: 0
    }
];

let currentQuestion = 0;
let timeLeft = 20;
let timer;

const questionEl = document.getElementById('question');
const answerBtns = document.querySelectorAll('.answer-btn');
const nextBtn = document.getElementById('next-btn');
const timeEl = document.getElementById('time');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');

totalQuestions.textContent = questions.length;

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    const current = questions[currentQuestion];
    questionEl.textContent = current.question;
    answerBtns.forEach((btn, index) => {
        btn.textContent = current.answers[index];
    });
    questionNumber.textContent = currentQuestion + 1;
}

function resetState() {
    answerBtns.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    clearInterval(timer);
    timeLeft = 20;
    timeEl.textContent = timeLeft;
}

answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const current = questions[currentQuestion];
        const selected = parseInt(btn.dataset.answer);

        if (selected === current.correct) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
            answerBtns[current.correct].classList.add('correct');
        }

        answerBtns.forEach(b => b.disabled = true);
        clearInterval(timer);
    });
});

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        alert("Quiz finished!");
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            answerBtns.forEach(b => b.disabled = true);
            answerBtns[questions[currentQuestion].correct].classList.add('correct');
        }
    }, 1000);
}

startQuiz();