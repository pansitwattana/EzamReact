import { ErrorChecker, type, status } from './ErrorChecker'
import solver from './Solver'
import substitute from '../../calculation/Substitution'
import split from '../../calculation/SplitEquation'
import getVariables from '../../calculation/GetVariables'

class PhysicsChecker extends ErrorChecker {
  constructor(problem) {
    super(problem)
    const solution = problem.solutions[0]
    if (solution) {
      const answers = solution.answers
      if (answers.length > 0) {
        let formular = answers[0].latex
        formular = formular.toLowerCase()
        const variables = getVariables(formular)
        if (variables === null || variables.length === 0) {
          this.status = status.FAIL
          return
        }
        const key = variables[0]
        this.variables = variables
        // console.log(variables)
    
        const values = this.randomNumbers(variables)
        this.key = key
        this.values = values
        
        this.keyValue = this.calculateKeyValue(formular, key, values)
        if (this.keyValue === null) {
          this.status = status.FAIL
        } else {
          this.status = status.OK
        }
      }
    }
    else {
      this.status = status.FAIL
    }
    this.type = type.PHYSICS
  }

  //override
  isCorrect(method, index) {
    if (status === status.FAIL) {
      return null
    }
    const { key, keyValue, values } = this

    if (index === 0) {
      const methodLower = method.toLowerCase()
      const value = this.calculateKeyValue(methodLower, key, values)
      // console.log(value, keyValue)
      if (value === null || keyValue === null) {
        return null
      }
      return value === keyValue
      //Split Equation(formular)
      //Substitution(left formular, this.variables) //except key
      //Substitution(right formular, this.variables) //except key
      //Concat formular (after sub)
      //value = Solve (key)
      //if (value === this.value) 
      // return true
    }
    else {
      const { answer } = this
      const variables = getVariables(method)
      if (variables.length > 1) {
        return null
      }
      
      const variable = variables[0]
      const result = solver(method, variable)
      if (answer === null || answer === undefined) {
        this.methodVariables = variables
        this.answer = result
        return true
      }
      else {
        if (result === null) {
          return null
        }

        return answer === result
      }
    }
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

  reset() {
    this.answer = null
  }
}

export default PhysicsChecker
