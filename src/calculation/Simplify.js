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
    let latex = result.toTex();
    let useToReplace = latex.slice()
    let useToFindFrac = latex.slice()
    let willReplace = ''
    let startIndex = 0
    let endIndex = 0
    let diff = 0
    while (true) {
      const fracIndex = useToFindFrac.indexOf('\\frac')
      if (fracIndex === -1) {
        break;
      }
      startIndex = fracIndex
      endIndex = startIndex + 7
      const splitLatex = latex.slice(fracIndex + 6, latex.length)
      const bracketIndex = splitLatex.indexOf('}')
      const topNumber = splitLatex.slice(0, bracketIndex)
      endIndex += bracketIndex + 1
      if (!isNaN(parseInt(topNumber))) {
        const number = parseInt(topNumber)
        
        const backSplit = splitLatex.slice(bracketIndex + 2, splitLatex.length)
        const bracketIndex2 = backSplit.indexOf('}')
        const botNumber = backSplit.slice(0, bracketIndex2)
        endIndex += bracketIndex2 + 1
        if (!isNaN(parseInt(botNumber))) {
          const number2 = parseInt(botNumber)

          const value = number / number2
          willReplace = latex.slice(startIndex + diff, endIndex)
          useToReplace = useToReplace.replace(willReplace, value.toString())
          useToFindFrac = useToReplace.slice()
          useToFindFrac = useToFindFrac.slice(endIndex, useToFindFrac.length)
          diff += endIndex
          // useToFindFrac = splitLatex.slice(bracketIndex2 + 2, splitLatex.length)
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return useToFindFrac
    // return math.format(result, { precision: 13 });
  } catch (e) {
    console.error(e)
    return null
  }
}