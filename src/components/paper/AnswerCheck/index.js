import Type from './Constant'
import math from 'mathjs'
import SplitEquation from '../../../calculation/SplitEquation';
import GetVariables from '../../../calculation/GetVariables';
import Simplify from '../../../calculation/Simplify';

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
    } else {
      // result.type = Type.MultiVariables
    }
  } else {
    const variables = GetVariables(equation.rhs)
    if (variables.length <= 1) {
      let values = equation.rhs.split(',')
      values = values.map(value => Simplify(value))
      result = {
        value: equation.rhs,
        type: Type.Variables,
        values
      }
    } else {
      // result.type = Type.MultiVariables
    }
  }
  return result
}
export default {
  getResult,
  checkAnswer: (answer, finalAnswer) => {
    const result = getResult(answer)
    const finalResult = getResult(finalAnswer)
    const options = { notation: 'fixed', precision: 4 }
    if (result.type === Type.Single && finalResult.type === Type.Single ||
      result.type === Type.Single && finalResult.type === Type.Variables || 
      result.type === Type.Variables && finalResult.type === Type.Single ||
      result.type === Type.Variables && finalResult.type === Type.Variables
    ) {
      const results1 = result.values.map(val => math.format(val, options)).sort()
      const results2 = finalResult.values.map(val => math.format(val, options)).sort()
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
    }
    return null
  }
}
