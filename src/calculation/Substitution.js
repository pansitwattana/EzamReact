import parser from './Parser'

export default (expression, variables) => {
  if (!variables) {
    return 'No variable pass through parameter'
  }

  let expr = parser(expression)

  let valToReplace = variables
  for (const variable in variables) {
    const val = variables[variable]
    if (!expression.includes(variable)) {
      return `Variables ${variable}=${val} not found`;
    }
    const valAlgebra = parser(val)
    if (valAlgebra == null) {
      return `${variable} (${val}) can not parse`
    }
    valToReplace[variable] = valAlgebra
  }


  const answer = expr.eval(valToReplace)

  return answer
}
