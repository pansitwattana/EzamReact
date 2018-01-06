import algebra from 'algebra.js'
import parser from './Parser'

export default (expression) => {
  if (!expression) {
    return 'No expression pass through parameter'
  }
  const expr = parser(expression)
  if (!expr) {
    return `Can not parse ${expression}`
  }
  let algebraObj 
  try{
    algebraObj = algebra.parse(expr)
  } catch (e) {
    return `Can not parse ${expr}`
  }

  return algebraObj
}