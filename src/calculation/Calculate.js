import parser from './Parser'

export default (expression) => {
  if (!expression) {
    return 'No expression pass through parameter'
  }
  
  const algebraObj = parser(expression)
  if (!algebraObj) {
    return `Can not parse ${expression}`
  }

  return algebraObj
}