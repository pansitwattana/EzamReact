import EquationChecker from './EquationChecker'
import DiffentialChecker from './DifferentialChecker'
import { debug } from 'util';

class ErrorManager {
  constructor(problem) {
    this.problem = problem
    let isEquation = false
    let isDifferential = false
    this.problem.tags.forEach(tag => {
      if (tag.name === "Equation") {
        isEquation = true
      }
      else if (tag.name === "Differential") {
        isDifferential = true
      }
    })
    if (isEquation) this.checker = new EquationChecker(problem.latex)
    else if (isDifferential) this.checker = new DiffentialChecker(problem.latex)

    if (this.checker) {
      console.log(`error checker enabled ${this.checker.type}`)
    }
    else {
      console.log('error checker disabled')
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
    if (this.checker) {
      return true
    }
    return false
  }
}

export default ErrorManager
