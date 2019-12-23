/*
    MultipleChoice.js
    This class defines a multiple choice question and is able
    to produce the correct DOM node. It will later have a function 
    to verify the selected answer against the questionConfig's
    correct answer property.
*/
import { createElement } from './Common.js';

export default class {
    constructor(questionConfig) {
        this.questionType = questionConfig.questionType;
        this.question = questionConfig.question;
        this.correctAnswer = questionConfig.correctAnswer;
        this.choices = questionConfig.choices;
        this.groupName = "";
    }

    // function to create dom node with question and radio buttons
    render(index) {
        index = index || 0;
        // create a unique id for the wrapper and radio group to use
        const id = `${this.questionType}-${index}`;

        // create a div for the wrapper, question, and choices
        const wrapperDiv = createElement("div", { id: id, className: "question" });
        const questionDiv = createElement("div", { className: "question-text", innerText: this.question });
        const choicesDiv = createElement("div", { className: "choices" });

        // create a groupname for the radio buttons
        this.groupName = `${id}-choice`;

        wrapperDiv.appendChild(questionDiv);
        wrapperDiv.appendChild(choicesDiv);

        this.choices.forEach((choice, index) => {
            // create radio input and label for each choice in question config
            const radioId = `${this.groupName}-${index}`;
            const input = createElement("input", {
                type: "radio",
                name: this.groupName,
                value: choice,
                id: radioId,
                defaultChecked: false,
                checked: false
            });
            const label = createElement("label", { htmlFor: radioId })
            label.appendChild(document.createTextNode(choice));

            const choiceDiv = createElement("div", { className: "choice" });
            choiceDiv.appendChild(input);
            choiceDiv.appendChild(label);
            choicesDiv.appendChild(choiceDiv);
        });

        return wrapperDiv;
    }
}