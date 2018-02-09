import { ErrorChecker, type, status } from './ErrorChecker'
import solver from './Solver'
import substitute from '../../calculation/Substitution'
import split from '../../calculation/SplitEquation'
import getVariables from '../../calculation/GetVariables'

class PhysicsChecker extends ErrorChecker {
  constructor(problem) {
    const { answers, latex } = problem
    super(latex)
    if (answers && answers.length > 0) {
      this.answers = answers
      const variables = getVariables(latex)
      const key = variables[0]
      this.variables = variables
      if (variables === null || variables.length === 0) {
        this.status = status.FAIL
        return
      }      
      // console.log(variables)

      const values = this.randomNumbers(variables)
      this.key = key
      this.values = values
      
      this.keyValue = this.calculateKeyValue(latex, key, values)
      if (this.keyValue === null) {
        this.status = status.FAIL
      }

      this.status = status.OK
    }
    else {
      this.status = status.FAIL
    }
    this.type = type.PHYSICS
  }

  //override
  isCorrect(method) {
    if (status === status.FAIL || this.answer === null) {
      return null
    }
    const { key, keyValue, values } = this
    const value = this.calculateKeyValue(method, key, values)
    console.log(value, keyValue)
    if (value === null || keyValue === null) {
      return null
    }
    //Split Equation(formular)
    //Substitution(left formular, this.variables) //except key
    //Substitution(right formular, this.variables) //except key
    //Concat formular (after sub)
    //value = Solve (key)
    //if (value === this.value) 
    // return true
    
    return value === keyValue
  }

  randomNumbers(variables) {
    let randNums = variables.map(variable => (10 * Math.random() + 1).toString())
    let values = {}
    variables.forEach((variable, index) => {
      if (index !== 0)
        values[variable] = randNums[index]
    })
    return values
  }

  calculateKeyValue(latex, key, values) {
    // console.log({ values, key: this.key })
    const equation = split(latex)
    // console.log(latexSplit)
    const lhsValue = substitute(equation.lhs, values).toString()
    const rhsValue = substitute(equation.rhs, values).toString()
    // console.log(lhsValue.toString())
    // console.log(rhsValue.toString())
    const newEquation = `${lhsValue}=${rhsValue}`
    // console.log(newEquation)
    const result = solver(newEquation, key)
    // console.log(result)
    return result
  }
}

export default PhysicsChecker
