import ErrorChecker from './ErrorChecker'
import { Subsitute, Calculate } from '../../calculation'

class DifferentialChecker extends ErrorChecker {
  constructor(problem) {
    super(problem)
    this.x = 2
    this.dx = 0.0001
    const fxplusdx = Subsitute(problem, {
      x: (this.x + this.dx).toString(),
    })
    const fx = Subsitute(problem, {
      x: this.x.toString(),
    })
    const minus = `${fxplusdx}-${fx}`
    this.dy = Calculate(minus).constant().valueOf()
  }

  isCorrect(solution) {
    const dybydx = this.dy / this.dx
    const rightSide = Subsitute(solution, {
      x: this.x.toString(),
    })
    const error = Calculate(`${dybydx}-${rightSide}`)
    const value = Math.abs(error.constant().valueOf())
    this.error = value
    if (!value) {
      return false
    }
    return value < this.x * this.dy
  }
}

export default DifferentialChecker
