const option1 = document.querySelector('.option1'),
	option2 = document.querySelector('.option2'),
	option3 = document.querySelector('.option3'),
	option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'); // номер вопроса
const numberOfAllQuestions = document.getElementById('number-of-all-questions'); // кол-во вопросов

let indexOfQuestion; // индекс текущего вопроса
let indexOfPage = 0; // индекс тек. страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'); // кол-во тру ответов
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'); // кол-во всех вопросов в модал окне
const btnTryAgain = document.getElementById('btn-try-again'); // кнопка повторить

const result = document.querySelector('.result');


const questions = [
	{
		question: 'Переменные wayup и Wayup(с большой буквы) – это одна и та же или разные?',
		options: [
			'Одна и та же',
			'Разные',
			'С большой буквы переменные называть нельзя',
			'Слово "wayup" является зарезервированным, его нельзя использовать',
		],
		rightAnswer: 1
	},
	{
		question: 'Что получится, если сложить true + false?',
		options: [
			'"truefalse"',
			'0',
			'1',
			'NaN',
		],
		rightAnswer: 2
	},
	{
		question: 'Какие конструкции для циклов есть в javascript?',
		options: [
			'Только две: for и while.',
			'Только одна: for.',
			'Три: for, while и do...while.',
			'Все ответы не верны',
		],
		rightAnswer: 2
	}
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
	option4.innerHTML = questions[indexOfQuestion].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1; // устанвока номера тек. стр
	indexOfPage++;
}

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDublicate = false; // якорь для проверки одинаковых вопросов

	if (indexOfPage == questions.length) {
		quizOver();
	} else {
		if (completedAnswers.length > 0) {
			completedAnswers.forEach(item => {
				if (item == randomNumber) {
					hitDublicate = true;
				}
			});
			if (hitDublicate == true) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		};
		if (completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		}
	}
	completedAnswers.push(indexOfQuestion);
}

const checkAnswer = (el) => {
	if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	}
	disabledOptions();
}

for (option of optionElements) {
	option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
			item.classList.add('correct');
		}
	})
}

const enableOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	})
};

const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	});
}

const updateAnswerTracker = status => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
	if (!optionElements[0].classList.contains('disabled')) {
		alert('Выберите один из вариков');
	} else {
		randomQuestion();
		enableOptions();
	}
}

const results = () => {
	if (score <= 1) {
		result.innerHTML = 'Далеко тебе до фронта'
	} else if (score == 2) {
		result.innerHTML = 'А ты не плох'
	} else {
		result.innerHTML = 'Да ты мощный фронтендер'
	}
}

const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('active');
	correctAnswer.innerHTML = score;
	numberOfAllQuestions2.innerHTML = questions.length;
	results();
}

const tryAgain = () => {
	window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
	validate();
})

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
})