class ErrorChecker {
  constructor(problem) {
    this.problem = problem
    this.type = type.NONE
    this.status = status.FAIL
  }

  isCorrect() {
    return false
  }

  checkAll(solutions) {
    return solutions.map(solution => this.isCorrect(solution))
  }
}

const type = {
  NONE: 0,
  EQUATION: 1,
  DIFFERENTIAL: 2,
  PHYSICS: 3,
}

const status = {
  OK: 0,
  FAIL: 1,
}

export { ErrorChecker, type, status }
