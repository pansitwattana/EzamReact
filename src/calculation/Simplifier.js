import Simplify from './Simplify'
import Split from './SplitEquation'
import SubstituteLatex from './SubstituteLatex'

export default (expression) => {
  const equation = Split(expression)

  if (equation === null) {
    return expression
  }

  let result = ''
  if (equation.rhs && equation.lhs) {
    const lhs = Simplify(equation.lhs) || equation.lhs
    const rhs = Simplify(equation.rhs) || equation.rhs
    result = lhs + ' = ' + rhs
  } else {
    result = Simplify(expression)
  }
  
  const resultSub = SubstituteLatex(result)

  return resultSub
}