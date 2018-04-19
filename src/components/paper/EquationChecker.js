import { ErrorChecker, type, status } from './ErrorChecker'
import solver from './Solver'

class EquationChecker extends ErrorChecker {
  constructor(problem, finalAnswer) {
    super(problem, finalAnswer)
    let answer = solver(problem)
    if (answer) {
      this.answer = answer
      this.status = status.OK
    }
    else {
      if (finalAnswer) {
        this.status = status.FINALCHECK
      } else {
        this.status = status.FAIL
      }
    }
    this.type = type.EQUATION
  }

  isCorrect(solution) {
    if (status === status.FAIL || this.answer === null) {
      return null
    }
    
    const value = solver(solution)
    if (value !== null) {
      return value === this.answer
    }
    else {
      return true
    }
  }
}

export default EquationChecker
