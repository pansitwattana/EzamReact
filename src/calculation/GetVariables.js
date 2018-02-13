import parser from './Parser'

export default (equation) => {
  const expression = parser(equation)
  if (!expression) {
    return null
  }
  // console.log(expression)

  let variables = expression.replace(/[^A-Za-z]/g, '');

  variables = variables.split('')

  const uniqueVars = variables.filter((item, pos) => {
    return variables.indexOf(item) === pos;
  })

  const lowerCase = uniqueVars.map(variable => variable.toLowerCase())
  // console.log({ variables })
  return lowerCase
}