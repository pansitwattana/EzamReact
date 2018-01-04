import AlgebraLatex from 'algebra-latex'
import algebraJS from 'algebra.js'

export default (expression) => {
  if (!expression) {
    return null
  }

  const algebraObj = new AlgebraLatex(expression)
  // const mathAnswer = algebraObj.toMath()
  // console.log(mathAnswer)

  let result
  try {
    result = algebraObj.toAlgebra(algebraJS)
  } catch (e) {
    console.error(e)
    return null
  }

  return result
}