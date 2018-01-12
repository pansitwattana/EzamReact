import uuid from 'uuid'
import { Parser }from '../../calculation'

const getTerms = (equation) => {
  // const equationNoMulti = equation.replace('*', '')
  // console.log(equationNoMulti)
  const filterUnneccesary = equation.replace(/[()]/gi, '')
const terms = filterUnneccesary.match(/(\+|-)?[a-z0-9.^*/]+/gi)
  const filterOperator = terms.map(term => {
    if (term === '') {
      return term
    }
    const firstChar = term[0]
    if (firstChar === '+' || firstChar === '-') {
      return term.slice(1)
    }
    return term
  })
  const removeSingleNumber = filterOperator.filter(term => {
    return !term.match(/^\d+$/)
  })

  const filterConstant = removeSingleNumber.map(term => {
    const subTerms = term.split('*')
    
    if (subTerms.length >= 2) {
      return subTerms[1]
    }
    else {
      return term
    }
  })
  
  const results = removeSingleNumber.concat(filterConstant)
  
  const uniqueResults = results.filter(function(item, pos) {
    return results.indexOf(item) === pos && item !== "x" && item.length < 6;
  })

  return uniqueResults
}

const checkValid = (math) => {
  return Parser(math) !== null
}

export default {
  getKeywords: (text) => {
    let terms = []
    const math = Parser(text)
    if (math === null) {
      return []
    }
    
    terms = getTerms(math)
    
    if (terms.length === 0 && math.indexOf('y') !== -1) {
      terms.push('y')
    }

    const keywords = terms
    return keywords.map(keyword => ({ value: keyword, id: uuid() }))
  },
  checkValid,
}
