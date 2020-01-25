// declare a service to hold state of this quiz session
let quizService;
// declare a service to hold user quiz results
let statService;
// declare a factory that can dynamically create questions based on type
let factory;
// declare a timer service because we only ever want one timer running
let timerService;

window.onload = function () {
  // instantiate our services and factory after the window loads
  quizService = new QuizService();
  statService = new StatService();
  factory = new QuestionTypeFactory();
  timerService = new TimerService();

  createAppStructure(); // create skeleton of page
  createMenuItems(); // creating start button which has an event to kick things off
};

function createAppStructure() {
  // this function just builds the page layout
  // the sections and divs here will be used to hold quiz elements
  const main = createElement("main");
  const homeSection = createElement("section", { id: "home-section" });
  const quizSection = createElement("section", {
    id: "quiz-section",
    className: "hidden"
  });
  const statsDiv = createElement("div", { id: "stats" });
  const startDiv = createElement("div", { id: "start" });
  const settingsDiv = createElement("div", { id: "settings" });
  const questionsDiv = createElement("div", { id: "questions" });
  const finishDiv = createElement("div", { id: "finish" });
  const timerDiv = createElement("div", { id: "timer-wrapper" });

  homeSection.appendChild(settingsDiv);
  homeSection.appendChild(startDiv);
  homeSection.appendChild(statsDiv);

  quizSection.appendChild(timerDiv);
  quizSection.appendChild(questionsDiv);
  quizSection.appendChild(finishDiv);
  // being a single page app, there are two display modes:
  // home - to set quiz options, display results, and start the quiz
  // quiz - to display the questions and timer
  main.appendChild(homeSection);
  main.appendChild(quizSection);
  document.body.appendChild(main);
}

// add elements to the home screen, variable names are self-descriptive
function createMenuItems() {
  const settingsDiv = document.getElementById("settings");
  const configCountDiv = createElement("div");
  const configTimeDiv = createElement("div");
  const countLabel = createElement("label", {
    innerText: "Number of questions:",
    className: "config-label"
  });
  const countInput = createElement("input", {
    id: "question-count-config",
    className: "config-input",
    type: "number",
    min: 1,
    max: 15,
    defaultValue: 5
  });
  const timeLabel = createElement("label", {
    innerText: "Time Limit in minutes (0 for untimed):",
    className: "config-label"
  });
  const timeInput = createElement("input", {
    id: "question-time-config",
    className: "config-input",
    type: "number",
    min: 0,
    max: 5,
    defaultValue: 0
  });

  configCountDiv.appendChild(countLabel);
  configCountDiv.appendChild(countInput);

  configTimeDiv.appendChild(timeLabel);
  configTimeDiv.appendChild(timeInput);

  settingsDiv.appendChild(configCountDiv);
  settingsDiv.appendChild(configTimeDiv);

  // this is the start button to begin a quiz attempt
  const startDiv = document.getElementById("start");
  const startButton = createElement("button", {
    id: "start-button",
    innerText: "Start Quiz"
  });

  startButton.addEventListener("click", event => {
    // clicking the start button hides the home section
    // and displays a quiz
    setDisplayMode("quiz");

    // pass user quiz parameters to renderQuestion function
    renderQuestions(countInput.value, timeInput.value);

    // the finish button will be used to submit the quiz
    // answers and return to the home "mode" that shows
    // the start button and stats
    createFinishButton(quizService);

    // the quit button will return to the home "mode"
    // and does not count as an attempt
    createQuitButton();
  });

  startDiv.appendChild(startButton);
}

function setDisplayMode(mode) {
  // this function switches between "home mode" and "quiz mode"
  // the reason for this is so we don't have to create multiple
  // pages.  this will be a single page application
  const homeSection = document.getElementById("home-section");
  const quizSection = document.getElementById("quiz-section");
  const questionsDiv = document.getElementById("questions");
  const timerDiv = document.getElementById("timer-wrapper");
  const finishDiv = document.getElementById("finish");
  const statsDiv = document.getElementById("stats");
  switch (mode) {
    case "home":
      // in home mode we want to display the settings, start button,
      // and stats and hide the quiz elements
      homeSection.classList.remove("hidden");
      quizSection.classList.add("hidden");
      clearChildren(questionsDiv);
      clearChildren(timerDiv);
      clearChildren(finishDiv);
      clearChildren(statsDiv);
      break;
    case "quiz":
      // in quiz mode we only want to display quiz elements like
      // questions and the submit answer button
      homeSection.classList.add("hidden");
      quizSection.classList.remove("hidden");
      break;
    // we won't get down here, but if we do...nothing happens
    default:
      break;
  }
}

function getRandomQuestions(count) {
  // array to hold the selected questions
  const result = [];
  // get a copy of the questions so we aren't using the original array
  const candidates = [...questionPool.questions];

  // for as many questions as they asked for
  for (let i = 0; i < count; i++) {
    // get an int representing some index of the question array
    const rand = Math.floor(Math.random() * candidates.length);
    // select and remove the question at that index so it
    // doesn't get picked twice
    const picked = candidates.splice(rand, 1)[0];
    // place the question into our results
    result.push(picked);
  }

  return result; // return the randomly selected questions
}

function renderQuestions(count, time) {
  // clear questions from last quiz attempt
  quizService.clearQuestions();

  // get number of questions from the questionPool JSON
  const randomQuestions = getRandomQuestions(count);

  // iterate questions from the questionPool JSON
  randomQuestions.forEach(item => {
    // pass item to factory to create correct question type object
    const question = factory.create(item);
    // add our factory-created question to the quiz service
    quizService.addQuestion(question);
  });

  // get reference to div that holds the timer
  const timerDiv = document.getElementById("timer-wrapper");
  // if they requested a time limit...
  if (time > 0) {
    timerDiv.classList.remove("hidden"); // show the timer div
    timerService.create(time); // create timer with requested limit
    timerService.start(); // start the timer
  } else {
    timerDiv.classList.add("hidden"); // don't show the timer div
  }

  quizService.questions.forEach((question, index) => {
    // loop through each question and call its render method.
    // index is passed in to ensure unique element ids and names
    const questionNode = question.render(index);
    // append the question to the app div
    document.getElementById("questions").appendChild(questionNode);
  });
}

function createFinishButton() {
  // reference to div that will hold the finish button
  const finish = document.getElementById("finish");

  // this button is used to score the quiz
  const finishButton = createElement("button", {
    id: "submit-answers",
    innerText: "Submit Answers"
  });

  finishButton.addEventListener("click", () => {
    // when the button is clicked, the submitAnswers function
    // will use the quiz service to retrieve the results
    const result = submitAnswers();
    // if we want to do anything with the results before returning
    // to the home mode, we could do that here.  we don't for now.
    statService.addResult(result);

    // clean up running timer
    timerService.clear();

    // reset the display to the home mode with the start button and stats
    restart();
  });

  finish.appendChild(finishButton);
}

function createQuitButton() {
  // button to click to abort a quiz attempt
  const finish = document.getElementById("finish");
  const quitButton = createElement("button", {
    id: "quit-button",
    innerText: "Quit"
  });

  // clicking the button resets the screen
  quitButton.addEventListener("click", restart);
  finish.appendChild(quitButton);
}

function submitAnswers() {
  // get the number of errors and a question count for this attempt
  const errors = quizService.validateQuestions();
  const questionCount = quizService.questionCount;
  return { errors, questionCount };
}

function renderStats() {
  // get reference to the stats div
  const statsDiv = document.getElementById("stats");

  // get the calculated stats from the quiz service
  const stats = statService.stats;

  // if there were no attempts, we have nothing to do here
  if (stats.attempts.length === 0) {
    return false;
  }

  // create a wrapper for the stats and append the overall score
  const listWrapper = createElement("div", { id: "stats-wrapper" });
  const overallScore = createElement("div", {
    innerText: `Overall Score: ${stats.overallScore}%`,
    className: "overall-score"
  });

  listWrapper.appendChild(overallScore);

  // create a ul element to list our previous attempt scores
  const list = createElement("ul", { id: "stats-list" });

  stats.attempts.forEach(attempt => {
    // each attempt gets a li element with its individual score
    const item = createElement("li", {
      innerText: `Attempt ${attempt.attempt}: ${attempt.score}%`
    });
    list.appendChild(item);
  });

  listWrapper.appendChild(list);
  statsDiv.appendChild(listWrapper);
}

function restart(results) {
  // sets the display back the home "mode" and shows the stats
  setDisplayMode("home");
  renderStats();
}

// helper function to make element creation less verbose
function createElement(tagName, attributes) {
  let el = document.createElement(tagName);
  // overwrite any element defaults attributes argument values and return the element
  return Object.assign(el, attributes);
}

// helper function to clear a div
function clearChildren(element) {
  while (element.lastChild) {
    // keep removing last child element as long as one exists
    element.removeChild(element.lastChild);
  }
}

function disableInputs() {
  const questionsDiv = document.getElementById("questions");
  // get all input elements in the questions div and disable them
  const inputs = questionsDiv.querySelectorAll("input");
  inputs.forEach(i => (i.disabled = true));
}