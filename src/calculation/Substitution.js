import algebra from 'algebra.js'
import parser from './Parser'

export default (expression, variables) => {
  if (!variables) {
    return 'No variable pass through parameter'
  }

  const keyVariables = Object.keys(variables)

  

  let expr = parser(expression)
  if (!expr) {
    return 'can not parse expression'
  }

  //check adjency variables
  let cloneExpression = expr
  let replaceXExpression = expression
  keyVariables.forEach(key => {
    replaceXExpression = replaceXExpression.replace(key, 'x')
  })

  const index = replaceXExpression.indexOf('xx') // xxx ?

  if (index !== -1) {
    let newExpression = expression.substr(0, index + 1)
    newExpression += '*' + expression.substr(index + 1, expression.length)
    console.log(index, newExpression)
    cloneExpression = newExpression
  }

  let algebraObj
  try{
    algebraObj = algebra.parse(cloneExpression)
  } catch (e) {
    // console.log(e)
    return `can not parse to algebra.js (${expr})`
  }
  
  
  let valToReplace = Object.assign({}, variables);
  for (const variable in valToReplace) {
    const val = valToReplace[variable]
    if (!expression.includes(variable)) {
      continue
      // try {
      //   const answer = algebraObj.eval()
      //   if (answer) {
      //     return answer
      //   }
      //   return `Variables ${variable}=${val} not found`;
      // } catch(e) {
      //   return expression
      // }
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
