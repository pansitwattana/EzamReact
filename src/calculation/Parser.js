import AlgebraLatex from 'algebra-latex'

export default (expression) => {
  if (!expression) {
    return null
  }

  const algebraObj = new AlgebraLatex(expression)
  // const mathAnswer = algebraObj.toMath()
  // console.log(mathAnswer)

  let mathExpression
  try {
    mathExpression = algebraObj.toMath()
  } catch (e) {
    console.error(e)
    return null
  }

  return mathExpression
}