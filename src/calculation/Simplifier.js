import Simplify from './Simplify'
import Split from './SplitEquation'

export default (expression) => {
  const equation = Split(expression)

  if (equation === null) {
    return expression
  }

  if (equation.rhs && equation.lhs) {
    const lhs = Simplify(equation.lhs) || equation.lhs
    const rhs = Simplify(equation.rhs) || equation.rhs
    return lhs + ' = ' + rhs
  }
  
  return Simplify(expression)
}