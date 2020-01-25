/*
  This object uses a repository pattern to store questions
  in an array for a quiz session.  Encapsulating this makes
  it easier to switch over to using a database later.
*/
class QuizService {
  constructor() {
    // array to hold questions for this quiz session
    this._questions = [];
    // this._results = [];
  }

  addQuestion(question) {
    // the questions array is in memory now, but this could
    // easily call into an api
    return this._questions.push(question);
  }

  // return all questions for this session as a getter property
  get questions() {
    return this._questions;
  }

  // return the number of questions
  get questionCount() {
    return this._questions.length;
  }

  // empties out questions array
  clearQuestions() {
    this._questions = [];
  }

  validateQuestions() {
    const errors = [];
    // call each question in the current quiz's validate method
    // and push any errors to the array to be returned
    this._questions.forEach((question, index) => {
      if (!question.validate()) {
        errors.push(index);
      }
    });

    // return array containing the indices of missed questions
    // this isn't used yet, but could be used to highlight wrong
    // answers
    return errors;
  }
}