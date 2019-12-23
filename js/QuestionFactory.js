/*
    QuestionFactory.js
    This class uses a factory pattern to return a question 
    object based on the type of question asked for.  
    Only multiple choice is supported at first.
*/
import MultipleChoice from './MultipleChoice.js';

export default class {
    // return question object based on question type
    create(questionConfig) {
        switch (questionConfig.questionType) {
            case "multiple-choice":
                return new MultipleChoice(questionConfig);
            default:
                break;
        }
    }
}