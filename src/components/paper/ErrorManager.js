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
      else if (tag.name === 'Kinetics') {
        isKinetic = true
      }
    })
    if (isEquation) this.checker = new EquationChecker(problem.latex)
    else if (isDifferential) this.checker = new DiffentialChecker(problem.latex)
    else if (isKinetic) {
      this.checker = new PhysicsChecker(problem)
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
