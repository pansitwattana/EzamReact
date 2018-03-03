import algebra from 'algebra.js'
import parser from './Parser'

export default (expression, variables) => {
  if (!variables) {
    // return 'No variable pass through parameter'
    return null
  }

  const keyVariables = Object.keys(variables)

  

  let expr = parser(expression)
  if (!expr) {
    // return 'can not parse expression'
    return null
  }

  //check adjency variables
  let cloneExpression = expr
  let replaceXExpression = cloneExpression
  keyVariables.forEach(key => {
    const regExp = new RegExp(key, 'g')
    replaceXExpression = replaceXExpression.replace(regExp, 'x')
  })
  let willReplaceX = replaceXExpression
  let tempReplace = willReplaceX
  let tempExp = expression
  while (willReplaceX.includes('xx')) {
    const index = willReplaceX.indexOf('xx') // xxx ?
    if (index !== -1) {
      tempExp = cloneExpression.substr(0, index + 1)
      tempExp += '*' + cloneExpression.substr(index + 1, cloneExpression.length)

      willReplaceX = tempReplace.substr(0, index + 1)
      willReplaceX += '*' + tempReplace.substr(index + 1, expression.length)
      // console.log(index, newExpression)
      cloneExpression = tempExp
    }
    tempReplace = willReplaceX
  }

  let algebraObj
  try{
    algebraObj = algebra.parse(cloneExpression)
  } catch (e) {
    // console.log(e)
    // return `can not parse to algebra.js (${expr})`
    return null
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
      // return `${variable} (${val}) can not parse`
      return null
    }

    let valAlgebra
    try{
      valAlgebra = algebra.parse(valExpr)
    } catch (e) {
      console.log(e)
      // return `can not parse to algebra.js (${valExpr})`
      return null
    }

    valToReplace[variable] = valAlgebra
  }


  const answer = algebraObj.eval(valToReplace)

  return answer
}
