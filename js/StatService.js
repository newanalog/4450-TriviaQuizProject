/* 
  This object is used to hold store and retrieve
  user quiz attempt results
*/
class StatService {
  constructor() {
    // store this as variable to avoid typos when referencing later
    this.storageKey = "triviaQuizResults";

    // get our historical results if they exist
    const storageValue = localStorage.getItem(this.storageKey);

    if (storageValue == null) {
      // if we haven't stored the values before, initialize with empty array
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  clearHistory() {
    // remove our local storage key
    localStorage.removeItem(this.storageKey);
  }

  getStoredResults() {
    // get the stored local storage string and parse it as JSON
    const storageValue = localStorage.getItem(this.storageKey);
    let parsed;
    try {
      // parse the result if possible, else return empty array
      parsed = JSON.parse(storageValue) || [];
    } catch (e) {
      // no logger service here, if there was an error, we
      // most likely just didn't have any historical results
      parsed = [];
    }
    return parsed;
  }

  addResult(result) {
    // get current stored results
    const historicalResults = this.getStoredResults();
    // determine how many attempts have been made
    const attemptCount = historicalResults.length + 1;
    // add the attempt count to the result
    result = Object.assign(result, { attempt: attemptCount });
    
    // add the new result to the front of the array
    historicalResults.unshift(result);
    // store our updated array as a string in local storage
    localStorage.setItem(this.storageKey, JSON.stringify(historicalResults));
  }

  get stats() {
    // this function maps the historical results for the session
    // and returns them along with an overall score for all attempts
    const attempts = this.getStoredResults().map((result) => {
      // each result here represents one attempt at the quiz
      const correct = result.questionCount - result.errors.length;
      const missed = result.errors.length;
      const score = Math.round((correct / result.questionCount) * 100);
      return {
        attempt: result.attempt,
        correct: correct,
        missed: missed,
        totalQuestions: result.questionCount,
        score: score
      };
    });

    // this reduction just aggregates the sum of attempt scores to use in
    // the overall score calculation
    const scoreSum = attempts.reduce((acc, curr) => acc + curr.score, 0);
    const overallScore = Math.round(scoreSum / attempts.length);

    // returns an array with stats for each attempt as well as overall
    // score across all attempts
    return { attempts, overallScore };
  }
}