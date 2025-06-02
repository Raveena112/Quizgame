const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const categoryEl = document.getElementById("category");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const categorySelect = document.getElementById("category-select");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timeoutSound = document.getElementById("timeout-sound");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const allQuestions = {
  "Countries": [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin"], answer: "Paris" },
    { question: "Which country has Tokyo as its capital?", options: ["China", "Japan", "Thailand"], answer: "Japan" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["India", "Japan", "Australia"], answer: "Japan" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra"], answer: "Canberra" },
    { question: "Which country is shaped like a boot?", options: ["Spain", "Italy", "Greece"], answer: "Italy" }
  ],
  "Animals": [
    { question: "Which is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe"], answer: "Blue Whale" },
    { question: "Which animal is known as the king of the jungle?", options: ["Tiger", "Lion", "Leopard"], answer: "Lion" },
    { question: "What do pandas eat?", options: ["Meat", "Bamboo", "Fish"], answer: "Bamboo" },
    { question: "Which bird is a symbol of peace?", options: ["Eagle", "Dove", "Crow"], answer: "Dove" },
    { question: "Which animal is known to have a pouch?", options: ["Dog", "Cat", "Kangaroo"], answer: "Kangaroo" }
  ],
  "General Knowledge": [
    { question: "Who invented the light bulb?", options: ["Newton", "Einstein", "Edison"], answer: "Edison" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Mars" },
    { question: "Which is the longest river?", options: ["Amazon", "Nile", "Ganga"], answer: "Nile" },
    { question: "Which is the tallest mountain?", options: ["K2", "Everest", "Kilimanjaro"], answer: "Everest" },
    { question: "What is H2O?", options: ["Salt", "Water", "Acid"], answer: "Water" }
  ],
  "Current Affairs": [
    { question: "Who is the current president of the USA?", options: ["Joe Biden", "Donald Trump", "Barack Obama"], answer: "Joe Biden" },
    { question: "Which country recently hosted the G20 summit?", options: ["India", "USA", "Japan"], answer: "India" },
    { question: "What is the name of India's Moon mission?", options: ["Chandrayaan", "Mangalyaan", "Suryayaan"], answer: "Chandrayaan" },
    { question: "Which tech company launched ChatGPT?", options: ["Google", "OpenAI", "Meta"], answer: "OpenAI" },
    { question: "Which country won the FIFA World Cup 2022?", options: ["Argentina", "France", "Brazil"], answer: "Argentina" }
  ]
};

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedCategory = btn.dataset.category;
    questions = shuffleArray(allQuestions[selectedCategory]);
    categoryEl.textContent = `Category: ${selectedCategory}`;
    categorySelect.classList.add("hide");
    quizBox.classList.remove("hide");
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
  });
});

nextBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showQuestion() {
  resetOptions();
  const currentQ = questions[currentQuestionIndex];
  questionEl.textContent = currentQ.question;

  currentQ.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => {
      clearInterval(timerInterval);
      selectAnswer(btn, currentQ.answer);
    });
    optionsEl.appendChild(btn);
  });

  startTimer(currentQ.answer);
}

function resetOptions() {
  optionsEl.innerHTML = "";
  timeLeft = 10;
  timerEl.textContent = timeLeft;
}

function startTimer(correctAnswer) {
  timerEl.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showCorrectAnswer(correctAnswer);
      disableOptions();
      timeoutSound.play();
      setTimeout(() => {
        timeoutSound.pause();
        timeoutSound.currentTime = 0;
      }, 3000);
    }
  }, 1000);
}

function selectAnswer(selectedBtn, correctAnswer) {
  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.style.backgroundColor = "green";
    score++;
    correctSound.play();
  } else {
    selectedBtn.style.backgroundColor = "red";
    showCorrectAnswer(correctAnswer);
    wrongSound.play();
  }
  disableOptions();
}

function showCorrectAnswer(correctAnswer) {
  Array.from(optionsEl.children).forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "green";
    }
  });
}

function disableOptions() {
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
