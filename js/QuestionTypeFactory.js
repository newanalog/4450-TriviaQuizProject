/*    
  This object uses a factory pattern to return a question
  object based on the type of question asked for.
  Muliple-choice, true-false, and text-based supported.
*/
class QuestionTypeFactory {
  // return question object based on question type
  create(questionConfig) {
    switch (questionConfig.questionType) {
      case "multiple-choice":
      case "true-false":
        // true-false is just a special case of multiple choice
        // they both can be represented by the same type of object
        return new MultipleChoice(questionConfig);
        break;
      case "text-based":
        return new TextBased(questionConfig);
        break;
      default:
        break;
    }
  }
}

/*
  This object defines a multiple choice question and is able
  to produce the correct DOM node and validate user input.
*/
class MultipleChoice {
  constructor(questionConfig) {
    // assign properties of question config to this object
    Object.assign(this, questionConfig);
    // id will be the type of question and the question index
    this.id = "";
    // group name to use when naming our elements
    this.groupName = "";
  }

  // function to create dom node with question and radio buttons
  render(index) {
    // create a unique id for the wrapper and radio group to use
    this.id = `${this.questionType}-${index}`;
    // create a groupname for the radio buttons
    this.groupName = `${this.id}-choice`;

    // create a div for the wrapper, question, and choices
    const wrapperDiv = createElement("div", {
      id: this.id,
      className: "question"
    });
    // div with the question text inside
    const questionDiv = createElement("div", {
      className: "question-text",
      innerText: this.question
    });
    // div to hold all the radio inputs
    const choicesDiv = createElement("div", { className: "choices" });

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
      const label = createElement("label", { htmlFor: radioId });
      label.appendChild(document.createTextNode(choice));

      // create div for radio input and append to choices
      const choiceDiv = createElement("div", { className: "choice" });
      choiceDiv.appendChild(input);
      choiceDiv.appendChild(label);
      choicesDiv.appendChild(choiceDiv);
    });

    // return the entire question node
    return wrapperDiv;
  }

  // function to validate given answer against correct answer from config
  validate() {
    // radio options should always be grouped, this is just a guard
    if (this.groupName === "") return false;

    // getElementsByName doesn't return an actual array, the slice call
    // here converts array-like things into a real array
    const radioItems = [].slice.call(
      document.getElementsByName(this.groupName)
    );

    // get the user's selected radio item
    const selectedAnswer = radioItems.find(item => item.checked);

    // not selecting an item counts as a missed question
    if (!selectedAnswer) return false;

    // compare the value of the radio item to the correct answer
    return (
      selectedAnswer.value.toLowerCase() ===
      this.correctAnswers[0].toLowerCase()
    );
  }
}

/*
  This object defines a text-based question and is able
  to produce the correct DOM node and validate user input.
*/
class TextBased {
  constructor(questionConfig) {
    // assign properties of question config to this object
    Object.assign(this, questionConfig);
    this.id = ""; // id for question itself
    this.inputId = ""; // id for input box
  }

  // function to create dom node with question and radio buttons
  render(index) {
    // id will be the type of question and the question index
    this.id = `${this.questionType}-${index}`;
    // input id will have question id with -text appended
    this.inputId = `${this.id}-text`;

    // create a wrapper div to hold the question and input box
    const wrapperDiv = createElement("div", {
      id: this.id,
      className: "question"
    });

    // div with the question text inside
    const questionDiv = createElement("div", {
      className: "question-text",
      innerHTML: this.question
    });

    // create a div to hold the answer input element
    const inputDiv = createElement("div", { className: "userText" });
    const inputElement = createElement("input", {
      type: "text",
      id: this.inputId
    });
    inputDiv.appendChild(inputElement);

    // place input element in question div
    wrapperDiv.appendChild(questionDiv);
    wrapperDiv.appendChild(inputDiv);

    // return the entire question node
    return wrapperDiv;
  }

  // function to validate given answer against correct answer from config
  validate() {
    const inputElement = document.getElementById(this.inputId);
    const userAnswer = inputElement.value.trim();
    // make regex to match against any accepted answer
    const regex = new RegExp(this.correctAnswers.join("|"), "i");

    // return result of regex test against user input
    return regex.test(userAnswer);
  }
}