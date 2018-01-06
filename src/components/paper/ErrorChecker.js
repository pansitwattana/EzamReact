class ErrorChecker {
  constructor(problem) {
    this.problem = problem
  }

  isCorrect() {
    return false
  }

  checkAll(solutions) {
    return solutions.map(solution => this.isCorrect(solution))
  }
}

export default ErrorChecker
