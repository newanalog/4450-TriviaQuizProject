/* 
  This object is used to hold store and retrieve
  user quiz attempt results
*/
class StatService {
  constructor() {
    this._results = [];
  }

  addResult(result) {
    // determine how many attempts have been made
    const attemptCount = this._results.length + 1;
    // add the attempt count to the result
    result = Object.assign(result, { attempt: attemptCount });
    // prepend the result to the front of the results array
    // this is done so that we can see most recent attempt first
    this._results.unshift(result);
  }

  get stats() {
    // this function maps the historical results for the session
    // and returns them along with an overall score for all attempts
    const attempts = this._results.map((result, index) => {
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