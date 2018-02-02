import math from 'mathjs'
import parser from './Parser'

export default (expression) => {
  if (!expression) {
    console.error('No expression pass through parameter')
    return null
  }
  const expr = parser(expression)
  if (!expr) {
    console.error(`Can not parse ${expression}`)
    return null
  }
  
  try {
    const result = math.simplify(expr); 
    return result.toTex()
    // return math.format(result, { precision: 13 });
  } catch (e) {
    console.error(e)
    return null
  }
}