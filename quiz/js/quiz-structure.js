import codify from './codify.js';
import createModalWindow from './modal.js';

// DOM Variables
const quizTitle = document.querySelector('.quiz-title');
const quizQuestion = document.querySelector('.quiz-question');
const codeBlock = document.querySelector('.quiz-code-block pre');
const quizAnswers = document.querySelector('.quiz-answers');
const scoreLine = document.querySelector('.score-line');
const scoreCounter = document.querySelector('.quiz-score span');

// Variables
const quizUrl = 'js/db-emulation.json';

// Functions

// Getting Data from server
async function getQuiz(url) {
  const data = await fetch(url);
  const dataParsed = await data.json();
  return dataParsed;
}

// Filling code board with new Data
function codeFiller(data, questNum) {
  const type = data.quizQuestions[questNum].questionType;
  if (type === 'withCode') {
    codeBlock.parentNode.style.display = 'block';
    const rawCode = data.quizQuestions[questNum].questionCode;
    codeBlock.innerHTML = codify(rawCode);
    return;
  }

  codeBlock.parentNode.style.display = 'none';
}

// Filling title with new Data
function titleFiller(data, questNum) {
  const question = data.quizQuestions[questNum].question;
  const { quizId: id } = data;
  quizTitle.innerText = `quiz ${id}`;
  quizQuestion.innerText = question;
}

// Filling answer with new Data
function answersFiller(data, questNum) {
  const answers = data.quizQuestions[questNum].questionAnswers;
  quizAnswers.innerHTML = '';

  answers.forEach((e, i) => {
    const answer = document.createElement('button');
    answer.classList.add('quiz-clause');
    answer.innerText = e;
    answer.setAttribute('data-answer', i + 1);
    quizAnswers.append(answer);
  });
}

// Function for updatin score
const score = (function () {
  const scoreTable = [];

  return function (data, userAnswerInx, questNum) {
    const answerInfo = createAnswerInfo(data, userAnswerInx, questNum);
    scoreTable.push(answerInfo);
    return scoreTable;
  };
})();

function createAnswerInfo(data, userAnswerInx, questNum) {
  const answerInfo = data.quizQuestions[questNum];
  const { question, rightAnswer: rightAnswerInx } = answerInfo;
  const rightAnswer = answerInfo.questionAnswers[rightAnswerInx - 1];
  const userAnswer = answerInfo.questionAnswers[userAnswerInx - 1];
  const isCorrect = rightAnswerInx == userAnswerInx;
  return {
    question,
    rightAnswer,
    userAnswer,
    isCorrect,
  };
}

// Function for right score column
function scoreColumn(score, length) {
  scoreCounter.innerText = `${score}/${length}`;
  const completePercents = (score * 100) / length;
  scoreLine.style.height = `${completePercents + 1}%`;
}

// General manipulating function
const questionFullfill = await (async function () {
  let questionNum = 0;

  // Getting data just 1 time with the closure
  const data = await getQuiz(quizUrl);

  return function (answer) {
    const length = data.quizQuestions.length;

    // If this question is the last
    if (questionNum === length) {
      const answers = document.querySelectorAll('.quiz-clause');
      answers.forEach((e) => e.classList.remove('active'));
      const answersInfo = score(data, answer, questionNum - 1);
      const modalContainer = document.body;
      document.removeEventListener('click', answerButtonListener);
      scoreColumn(questionNum, length);

      createModalWindow(modalContainer, answersInfo);
      return;
    }

    // Else - keep it up
    codeFiller(data, questionNum);
    titleFiller(data, questionNum);
    answersFiller(data, questionNum);
    scoreColumn(questionNum, length);
    // Check for first call
    if (answer) {
      score(data, answer, questionNum - 1);
    }
    questionNum++;
  };
})();

questionFullfill();
// Event Listeners

function answerButtonListener(e) {
  if (!e.target.dataset.answer) {
    return;
  }
  const answerButton = e.target;

  if (answerButton.classList.contains('active')) {
    const answer = answerButton.dataset.answer;
    questionFullfill(answer);
    return;
  }
  const answers = document.querySelectorAll('.quiz-clause');
  answers.forEach((e) => e.classList.remove('active'));
  answerButton.classList.add('active');
}

document.addEventListener('click', answerButtonListener);
