import AlgebraLatex from 'algebra-latex'
import algebra, { Equation } from 'algebra.js'

export default (equation, variable = 'x') => {
  const algebraObj = new AlgebraLatex(equation)
  const mathAnswer = algebraObj.toMath()
  console.log(mathAnswer)
  if (mathAnswer === '') {
    return false
  }
  if (!mathAnswer.includes(variable)) {
    return 'Variables (x) not found';
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
    if (ans) {
      return ans.toString()
    }
  }
  return false
}
