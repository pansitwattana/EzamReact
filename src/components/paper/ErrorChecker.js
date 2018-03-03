import checker from './AnswerCheck'
const { checkAnswer } = checker

class ErrorChecker {
  constructor(problem, answer) {
    this.problem = problem
    this.finalAnswer = answer
    this.type = type.NONE
    this.status = status.FAIL
  }

  finalCheck(method) {
    if (this.finalAnswer) {
      return checkAnswer(this.finalAnswer, method)
    }
    return null
  }

  isCorrect() {
    return false
  }

  checkAll(solutions) {
    this.reset()
    return solutions.map((solution, index) => {
      if (index < solutions.length - 1) {
        return this.isCorrect(solution, index)
      } else {
        const isCorrect = this.finalCheck(solution)
        if (isCorrect !== null) {
          return isCorrect
        } else {
          return this.isCorrect(solution, index)
        }
      }
    })
  }

  reset() {
    
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
