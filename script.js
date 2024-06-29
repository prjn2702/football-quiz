const questions = [
    {
        question: "I was originally a striker before becoming a defender. I played 11 seasons for the same club before managing them. I've won two Bundesliga titles and a Champions League",
        answers: [
            { text: "Julian Nagelsmann", correct: false },
            { text: "Hansi Flick", correct: false },
            { text: "Jurgen Klopp", correct: true },
            { text: "Thomas Tuchel", correct: false },
        ]
    },
    {
        question: "Which manager was famously said to have given players 'the Hairdryer Treatment'?",
        answers: [
            { text: "Carlo Ancelotti", correct: false },
            { text: "Sir Alex Ferguson", correct: true },
            { text: "Jose Mourinho", correct: false },
            { text: "Pep Guardiola", correct: false },
        ]
    },
    {
        question: "Which German player is the only one from his country who has won the FIFA World Cup as both captain and manager?",
        answers: [
            { text: "Lothar Matthaus", correct: false },
            { text: "Joachim Loew", correct: false },
            { text: "Gerd Muller", correct: false },
            { text: "Franz Beckenbauer", correct: true },
        ]
    },
    {
        question: "Which of the following has not won 6 Champions Leagues?",
        answers: [
            { text: "Francisco 'Paco' Gento", correct: false },
            { text: "Cristiano Ronaldo", correct: true },
            { text: "Toni Kroos", correct: false },
            { text: "Luka Modric", correct: false },
        ]
    },
    {
        question: "Which is the only team that has participated in each FIFA WC so far?",
        answers: [
            { text: "Brazil", correct: true },
            { text: "France", correct: false },
            { text: "England", correct: false },
            { text: "Germany", correct: false },
        ]
    },
    {
        question: "Who is the only player to win the Champions League with three different clubs?",
        answers: [
            { text: "Samuel Eto'o", correct: false },
            { text: "Toni Kroos", correct: false },
            { text: "Clarence Seedorf", correct: true },
            { text: "Zlatan Ibrahimovic", correct: false },
        ]
    },
    {
        question: "Which of the following players has scored a goal in every minute of a football match (1-90)?",
        answers: [
            { text: "Didier Drogba", correct: false },
            { text: "Cristiano Ronaldo", correct: true },
            { text: "Neymar", correct: false },
            { text: "Lionel Messi", correct: false },
        ]
    },
    {
        question: "Which of the following is the only player to win the world cup golden ball twice?",
        answers: [
            { text: "Lionel Messi", correct: true },
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Miroslav Klose", correct: false },
            { text: "Kylian Mbappe", correct: false },
        ]
    },
    {
        question: "Which football stadium is known as 'The Theatre of Dreams'?",
        answers: [
            { text: "Estadio Santiago Bernabeu", correct: false },
            { text: "Anfield", correct: false },
            { text: "San Siro", correct: false },
            { text: "Old Trafford", correct: true },
        ]
    },
    {
        question: "Who is the only goalkeeper to win the Ballon d'Or?",
        answers: [
            { text: "Thibaut Courtois", correct: false },
            { text: "Oliver Kahn", correct: false },
            { text: "Lev Yashin", correct: true },
            { text: "Iker Casillas", correct: false },
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();
