import math from 'mathjs'
import { ErrorChecker, type, status } from './ErrorChecker'
import solver from './Solver'
import substitute from '../../calculation/Substitution'
import split from '../../calculation/SplitEquation'
import getVariables from '../../calculation/GetVariables'
import { isNumber } from 'util';

class PhysicsChecker extends ErrorChecker {
  constructor(problem, answer) {
    super(problem, answer)
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
          if (answer) {
            this.status = status.FINALCHECK
          } else {
            this.status = status.FAIL
          }
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

  setFormular(formular) {
    const variables = getVariables(formular)
    const key = variables[0]
    this.variables = variables
    // console.log(variables)

    const values = this.randomNumbers(variables)
    this.key = key
    this.values = values
    
    this.keyValue = this.calculateKeyValue(formular, key, values)
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
        // for case second formular
        this.setFormular(method)
        this.answer = null
        // console.log(value, keyValue)
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
        const options = { notation: 'fixed', precision: 1 }
        const roundAnswer = math.format(answer, options)
        const roundResult = math.format(result, options)
        const answerNumber = this.parseToFloat(answer)
        const resultNumber = this.parseToFloat(result)
        if (answerNumber && resultNumber) {
          return answerNumber.toFixed(1) === resultNumber.toFixed(1)
        }
        return roundAnswer === roundResult
      }
    }
  }

  parseToFloat(frac) {
    if (isNumber(frac)) {
      return Number(frac)
    } else {
      const numbers = frac.split('/')
      if (numbers.length == 2) {
        const firstNo = parseFloat(numbers[0])
        const secNo = parseFloat(numbers[1])
        if (isNumber(firstNo) && isNumber(secNo)) {
          const result = firstNo / secNo
          return result
        }
      }
      return null
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
    const equation = split(latex)
    if (equation.lhs !== null && equation.rhs !== null) {
      const leftSubValue = substitute(equation.lhs, values)
      const rightSubValue = substitute(equation.rhs, values)
      if (leftSubValue === null || rightSubValue === null) {
        return null
      }

      const lhsValue = leftSubValue.toString()
      const rhsValue = rightSubValue.toString()
      const newEquation = `${lhsValue}=${rhsValue}`
      const result = solver(newEquation, key)
      return result
    } else if (equation.rhs) {
      const rightSubValue = substitute(equation.rhs, values)
      if (rightSubValue === null) {
        return null
      }
      const rhsValue = rightSubValue.toString()
      return rhsValue
    }

    return null
  }

  reset() {
    this.answer = null
  }
}

export default PhysicsChecker
