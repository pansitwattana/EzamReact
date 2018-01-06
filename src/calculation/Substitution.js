import algebra from 'algebra.js'
import parser from './Parser'

export default (expression, variables) => {
  if (!variables) {
    return 'No variable pass through parameter'
  }

  let expr = parser(expression)
  if (!expr) {
    return 'can not parse expression'
  }

  let algebraObj
  try{
    algebraObj = algebra.parse(expr)
  } catch (e) {
    console.log(e)
    return `can not parse to algebra.js (${expr})`
  }
  

  let valToReplace = variables
  for (const variable in variables) {
    const val = variables[variable]
    if (!expression.includes(variable)) {
      return `Variables ${variable}=${val} not found`;
    }
    const valExpr = parser(val)
    if (valExpr == null) {
      return `${variable} (${val}) can not parse`
    }

    let valAlgebra
    try{
      valAlgebra = algebra.parse(valExpr)
    } catch (e) {
      console.log(e)
      return `can not parse to algebra.js (${valExpr})`
    }

    valToReplace[variable] = valAlgebra
  }


  const answer = algebraObj.eval(valToReplace)

  return answer
}
