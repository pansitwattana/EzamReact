import algebra from 'algebra.js'
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
  let algebraObj 
  try{
    algebraObj = algebra.parse(expr)
  } catch (e) {
    console.error(`Can not parse ${expr}`)
    return null
  }

  return algebraObj
}