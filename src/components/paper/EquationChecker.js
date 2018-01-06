import { ErrorChecker, type, status } from './ErrorChecker'
import solver from './Solver'

class EquationChecker extends ErrorChecker {
  constructor(problem) {
    super(problem)
    let answer = solver(problem)
    if (answer) {
      this.answer = answer
      this.status = status.OK
    }
    else {
      this.status = status.FAIL
    }
    this.type = type.EQUATION
  }

  isCorrect(solution) {
    if (status === status.FAIL || this.answer === null) {
      return null
    }
    
    const value = solver(solution)
    return value === this.answer
  }
}

export default EquationChecker
