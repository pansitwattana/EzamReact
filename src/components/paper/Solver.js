import AlgebraLatex from 'algebra-latex'
import algebra, { Equation } from 'algebra.js'

export default (equation, variable = 'x') => {
  const algebraObj = new AlgebraLatex(equation)
  const mathAnswer = algebraObj.toMath()
  if (mathAnswer === '') {
    return false
  }
  let eq
  try {
    eq = algebra.parse(mathAnswer)
  } catch (e) {
    console.log(e)
    return false
  }
  if (eq instanceof Equation) {
    const ans = eq.solveFor(variable)
    return ans.toString()
  }
  return false
}
