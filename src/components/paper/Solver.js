import AlgebraLatex from 'algebra-latex'
import algebra, { Equation } from 'algebra.js'

export default (equation, variable = 'x') => {
  const algebraObj = new AlgebraLatex(equation)
  const mathAnswer = algebraObj.toMath()
  // console.log(mathAnswer)
  if (mathAnswer === '') {
    console.error(`can not parse to AlgebraJS (${equation})`)
    return null
  }
  if (!mathAnswer.includes(variable)) {
    console.error('Variables (x) not found');
    return null
  }
  let eq
  try {
    eq = algebra.parse(mathAnswer)
  } catch (e) {
    console.error({ equation, variable, mathAnswer })
    console.error(e)
    return null
  }
  if (eq instanceof Equation) {
    const ans = eq.solveFor(variable)
    if (!ans) {
      console.error(`Algebra can not solve for ${equation}`)
      return null
    }
    return ans.toString()
  }
  console.error(`It's not an equation (${equation})`)
  return null
}
