import { ErrorChecker, type, status }from './ErrorChecker'
import { Subsitute, Calculate, Split } from '../../calculation'

class DifferentialChecker extends ErrorChecker {
  constructor(problem, answer) {
    const problemSpliting = Split(problem)
    super(problemSpliting.rhs || problem, answer)

    this.type = type.DIFFERENTIAL
    this.x = 2
    this.dx = 0.0001
    const fxplusdx = Subsitute(this.problem, {
      x: (this.x + this.dx).toString(),
    })
    const fx = Subsitute(this.problem, {
      x: this.x.toString(),
    })
    const minus = `${fxplusdx}-${fx}`
    const dyObject = Calculate(minus)
    if (dyObject === null) {
      if (answer) {
        this.status = status.FINALCHECK
      } else {
        this.status = status.FAIL
      }
      return
    }

    this.status = status.OK
    this.dy = dyObject
  }

  isCorrect(solution) {
    if (status === status.FAIL) {
      return null
    }
    const splitedSolution = Split(solution).rhs || solution
    const dybydx = this.dy / this.dx
    const rightSide = Subsitute(splitedSolution, {
      x: this.x.toString(),
    })
    const error = Calculate(`${dybydx}-${rightSide}`)
    if (!error) {
      return false
    }
    const value = Math.abs(error)
    this.error = value
    return value <= this.x * this.dy
  }
}

export default DifferentialChecker
