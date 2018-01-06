import ErrorChecker from './ErrorChecker'
import solver from './Solver'

class EquationChecker extends ErrorChecker {
  constructor(problem) {
    super(problem)
    this.answer = solver(problem)
  }

  isCorrect(solution) {
    if (this.answer === null) {
      return null
    }
    
    const value = solver(solution)
    return value === this.answer
  }
}

export default EquationChecker
