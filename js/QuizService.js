/*
    QuizService.js
    This class uses a repository pattern to store questions 
    in an array for a quiz session.  Encapsulating this makes 
    it easier to switch over to using a database later.
*/
export default class {
    constructor() {
        this.questions = [];
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    getQuestions() {
        return this.questions;
    }

    clearQuestions() {
        this.questions = [];
    }
}