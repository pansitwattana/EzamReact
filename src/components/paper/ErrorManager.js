import EquationChecker from './EquationChecker'
import DiffentialChecker from './DifferentialChecker'
import PhysicsChecker from './PhysicsChecker'
import { status } from './ErrorChecker'

class ErrorManager {
  constructor(problem) {
    this.problem = problem
    let isEquation = false
    let isDifferential = false
    let isKinetic = false
    this.problem.tags.forEach(tag => {
      if (tag.name === "Equation") {
        isEquation = true
      }
      else if (tag.name === "Differential") {
        isDifferential = true
      }
      else if (tag.subject === 'Physics' || tag.subject === 'Chemical') {
        isKinetic = true
      }
    })
    if (isEquation) this.checker = new EquationChecker(problem.latex, problem.answer)
    else if (isDifferential) this.checker = new DiffentialChecker(problem.latex, problem.answer)
    else if (isKinetic) {
      console.log('enable check physics')
      console.log(problem)
      this.checker = new PhysicsChecker(problem, problem.answer)
    }

    if (this.checker) {
      if (this.checker.status === status.FAIL) {
        console.log(`Error failed to check`)
      }
      else {
        console.log(`Error checker enabled ${this.checker.type}`)
      }
    }
    else {
      console.log('Error checker does not support')
    }
  }

  check(solutions) {
    if (this.checker) {
      return this.checker.checkAll(solutions)
    }
    else {
      return null
    }
  }

  hasChecker() {
    if (this.checker && this.checker.status !== status.FAIL) {
      return true
    }
    return false
  }
}

export default ErrorManager
