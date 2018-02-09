import parser from './Parser'

export default (equation) => {
  const expression = parser(equation)
  if (!expression) {
    return null
  }
  // console.log(expression)

  let variables = expression.replace(/[0-9^*+-=/]+/g, "")

  variables = variables.split('')
  // console.log({ variables })
  return variables
}