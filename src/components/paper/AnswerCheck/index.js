import Type from './Constant'
import math from 'mathjs'
import SplitEquation from '../../../calculation/SplitEquation';
import GetVariables from '../../../calculation/GetVariables';
import Simplify from '../../../calculation/Simplify';
import SubstituteLatex from '../../../calculation/SubstituteLatex';
import SubstitutionCheck from '../SubstitutionCheck';

function isNumeric(num){
  return !isNaN(num)
}

const getResult = (answer) => {
  let result = {
    type: Type.Single,
    value: answer,
    values: [answer],
  }
  const equation = SplitEquation(answer)
  if (equation.lhs === null) {
    const variables = GetVariables(equation.rhs)
    if (variables.length === 0 && equation.rhs) {
      result.value = equation.rhs
      let values = equation.rhs.split(',')
      values = values.map(value => Simplify(value))
      result.values = values
    } else if (variables.length === 1) {
      result.type = Type.Function
      result = {
        type: Type.Function,
        value: equation.rhs,
        values: [answer],
      }
    } else {
      result.type = Type.MultiVariables
    }
  } else {
    const variables = GetVariables(equation.rhs)
    if (variables.length === 0) {
      let values = equation.rhs.split(',')
      values = values.map(value => Simplify(value))
      result = {
        value: equation.rhs,
        type: Type.Variables,
        values
      }
    } else if (variables.length === 1) {
      result = {
        type: Type.Function,
        value: equation.rhs,
        values: [answer],
      }
    } else {
      result.type = Type.MultiVariables
    }
  }
  return result
}
export default {
  getResult,
  checkAnswer: (answer, finalAnswer) => {
    if (finalAnswer === '') {
      return false
    }
    if (finalAnswer === answer) {
      return true
    }

    const result = getResult(answer)
    const format = math.format(result.values[0])
    
    const finalResult = getResult(finalAnswer)
    const options = { notation: 'exponential', precision: 2 }
    if (result.type === Type.Single && finalResult.type === Type.Single ||
      result.type === Type.Single && finalResult.type === Type.Variables || 
      result.type === Type.Variables && finalResult.type === Type.Single ||
      result.type === Type.Variables && finalResult.type === Type.Variables
    ) {
      const results1 = result.values.map(val => {
        let parse = parseFloat(val)
        if (isNaN(parse)) {
          parse = SubstituteLatex(val)
        }
        return parse !== NaN ? math.format(parse, options) : val
      }).sort()
      const results2 = finalResult.values.map(val => {
        let parse = parseFloat(val)
        if (isNaN(parse)) {
          parse = SubstituteLatex(val)
        }
        return parse !== NaN ? math.format(parse, options) : val
      }).sort()
      if (results1.length !== results2.length) {
        return false
      }
      let isError = false
      results1.forEach((res, index) => {
        if (res !== results2[index]) {
          isError = true
          return
        }
      })
      return !isError
    } else if (result.type === Type.Single && (finalResult.type === Type.Function || finalResult.type === Type.MultiVariables) ||
      (result.type === Type.Function && finalResult.type === Type.Single && result.type === Type.MultiVariables && finalResult.type === Type.Single)
    ) {
      return false
    } else if (result.type === Type.Function && finalResult.type === Type.Function) {
      return SubstitutionCheck(result.value, finalResult.value)
    }
    return null
  }
}
