/*
    QuizService.js
    This class uses a repository pattern to store questions 
    in an array for a quiz session.  Encapsulating this makes 
    it easier to switch over to using a database later.
*/
export default class {
    constructor() {
        // array to hold questions for this quiz session
        this.questions = [];
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    getQuestions() {
        // return all the questions for this session
        return this.questions;
    }

    getQuestionCount() {
        return this.questions.length;
    }

    clearQuestions() {
        this.questions = [];
    }

    validateQuestions() {
        const errors = [];
        // call each question in the current quiz's validate method
        // and push any errors to the array to be returned
        this.questions.forEach((question, index) => {
            if (!question.validate()) {
                errors.push(index);
            }
        });

        return errors;
    }
}