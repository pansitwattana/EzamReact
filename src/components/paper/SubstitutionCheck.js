import GetVariables from "../../calculation/GetVariables";
import Substitution from "../../calculation/Substitution";
import SplitEquation from "../../calculation/SplitEquation";
import Solver from "./Solver";

const calculateKeyValue = (latex, key, values) => {
  const equation = SplitEquation(latex)
  if (equation.lhs !== null && equation.rhs !== null) {
    const leftSubValue = Substitution(equation.lhs, values)
    const rightSubValue = Substitution(equation.rhs, values)
    if (leftSubValue === null || rightSubValue === null) {
      return null
    }

    const lhsValue = leftSubValue.toString()
    const rhsValue = rightSubValue.toString()
    const newEquation = `${lhsValue}=${rhsValue}`
    const result = Solver(newEquation, key)
    return result
  } else if (equation.rhs) {
    const rightSubValue = Substitution(equation.rhs, values)
    if (rightSubValue === null) {
      return null
    }
    const rhsValue = rightSubValue.toString()
    return rhsValue
  }

  return null
}

const randomNumbers = variables => {
  let randNums = variables.map(variable => (10 * Math.random() + 1).toString())
  let values = {}
  if (variables.length > 1) {
    variables.forEach((variable, index) => {
      if (index !== 0)
        values[variable] = randNums[index]
    })
  } else {
    values[variables[0]] = randNums[0]
  }
  return values
}

export default (formular1, formular2) => {
  let formularLower1 = formular1.toLowerCase()
  let formularLower2 = formular2.toLowerCase()

  const variables = GetVariables(formularLower1)
  if (variables === null || variables.length === 0) {
    return null
  }

  const key = variables[0]
  const values = randomNumbers(variables)
  
  const keyValue = calculateKeyValue(formularLower1, key, values)
  const keyValue2 = calculateKeyValue(formularLower2, key, values)

  if (keyValue === null || keyValue2 === null) {
    return null
  }

  return keyValue === keyValue2
}
