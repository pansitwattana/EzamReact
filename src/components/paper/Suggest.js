import AlgebraLatex from 'algebra-latex'
import { parse } from 'algebra.js'

const getTerms = (equation) => {
  // const equationNoMulti = equation.replace('*', '')
  // console.log(equationNoMulti)
  const terms = equation.match(/(\+|-)?[a-z0-9.^*]+/gi)
  const withoutPlusTerm = terms.map((term) => {
    if (term === '') {
      return term
    }
    if (term[0] === '+') {
      return term.slice(1)
    }
    return term
  })
  const withoutANumber = withoutPlusTerm.filter((term) => {
    return !term.match(/^\d+$/)
  })
  return withoutANumber
}

const parseToMath = (latex) => {
  const algebraObj = new AlgebraLatex(latex)
  const mathEquation = algebraObj.toMath()
  return mathEquation
}

const checkValid = (math) => {
  
  let eq
  try {
    eq = parse(math)
  } catch (e) {
    return false
  }
  return true
}

export default {
  getKeywords: (text) => {
    const keywords = []
    if (text.indexOf('x') !== -1) {
      keywords.push('x')
    }
    if (text.indexOf('y') !== -1) {
      keywords.push('y')
    }
    const math = parseToMath(text)
    
    if (math !== '') {
      if (checkValid(text)) {
        const terms = getTerms(math)
        console.log(terms)
        return terms
      }
    }
    
    return keywords
  },
  checkValid,
}
