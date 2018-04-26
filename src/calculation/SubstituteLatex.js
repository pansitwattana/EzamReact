import math from 'mathjs'

const regex = /\\frac({?[0-9]*})({?[0-9]*})/g
const replaceRegex = /(}|{)/g

export default (latex) => {
  if (latex === NaN) {
    return latex
  }

  let m;
  let matches = []
  while ((m = regex.exec(latex)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    let firstValue = 1
    let replaceString = ''
    m.forEach((match, groupIndex) => {
      if (groupIndex == 0) {
        replaceString = match
      }
      else if (groupIndex == 1) {
        firstValue = match.replace(replaceRegex, '')
      } else if (groupIndex == 2) {
        const secondValue = match.replace(replaceRegex, '')
        matches.push({ value: firstValue / secondValue, replaceString })
      }
    });
  }

  // const result = latex.replace(regex, value)
  let result = latex
  matches.forEach(({ value, replaceString }) => {
    result = result.replace(replaceString, value.toFixed(1))
  })

  return result
}
