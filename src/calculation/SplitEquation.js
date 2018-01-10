export default (equation) => {
  const equations = equation.split('=')
  if (equations.length === 2) {
    return {
      lhs: equations[0],
      rhs: equations[1],
    }
  }
  return {
    rhs: equation,
    lhs: null,
  }
}

// export default (equation) => {
//   const equationObj = parser(equation)
//   if (equationObj) {
//     const { lhs, rhs } = equationObj
//     if (rhs && lhs) {
//       return {
//         rhs: rhs.toString(),
//         lhs: lhs.toString(),
//       }
//     }
//   }

//   return {
//     rhs: null,
//     lhs: null,
//   }
// }
