/*
    main.js
    Script to hold main logic that is loaded on page load.
*/
import QuestionPool from './QuestionPool.js';
import QuestionFactory from './QuestionFactory.js';
import QuizService from './QuizService.js';

// get a factory that can dynamically create questions based on type
const factory = new QuestionFactory();
// get a service to hold state of this single quiz session
const service = new QuizService();

window.onload = function () {
    // render each question from the pool on page load
    renderQuestions();
}

function renderQuestions() {
    QuestionPool.forEach(item => {
        // destructure the array item from the pool
        let [questionType, question, correctAnswer, ...choices] = item;

        // create a "questionConfig" object to send to factory
        const questionConfig = {
            questionType: questionType,
            question: question,
            correctAnswer: correctAnswer,
            choices: choices
        }

        // add factory-created question to this quiz session
        service.addQuestion(factory.create(questionConfig));
    });

    service.getQuestions().forEach((question, index) => {
        // loop through each question and call its render method
        // index is passed in to ensure unique element ids and names
        const questionNode = question.render(index);
        // append the question to the app div
        document.getElementById("app").appendChild(questionNode);
    });
}