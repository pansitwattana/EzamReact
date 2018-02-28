import uuid from 'uuid'
import { Parser } from '../../calculation'
import getVariables from '../../calculation/GetVariables'

const finalize = (array) => {
  return array.filter(function(item, pos) {
    return array.indexOf(item) === pos && item !== "x" && item.length < 10 && item !== "";
  })
}

const addIds = (keywords) => {
  return keywords.map(keyword => ({ value: keyword, id: uuid() }))
}

const getTerms = (equation) => {
  // const equationNoMulti = equation.replace('*', '')
  // console.log(equationNoMulti)
  const filterUnneccesary = equation.replace(/[()]/gi, '')
  const terms = filterUnneccesary.match(/(\+|-)?[a-z0-9.^*/]+/gi)
  if (!terms) {
    return []
  }

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
    return !term.match(/^\d+$/) || term.length !== 1
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

  return finalize(results)
}

const checkValid = (math) => {
  return Parser(math) !== null
}

const getKeywords = (text = '') => {
  if (text === null) {
    return []
  }

  if (text.length < 80) {
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
    
    const variables = getVariables(text)

    return [...keywords, ...variables]
  }
  else {
    let splitText = text.split('$')
    let keywords = splitText.filter((text, index) => index % 2 === 1)
    if (keywords) {
      let removeNoises = keywords.map(keyword => {
        const splitKeyword = keyword.split(' ')
        const keywordsFilter = splitKeyword.filter(text => !text.match(/[a-zA-Z=]+/))
        // const keywordsFilter = splitKeyword.filter(text => /[^a-zA-Z=]+$/.test(text))
        return keywordsFilter.join('')
      })
      return removeNoises
    }
    return keywords
  }
}

export default {
  getKeywords: (text) => addIds(getKeywords(text)), // get text within $..$ split to array
  checkValid,
  getSolutionKeywords: (method, oldKeywords) => {
    const keywords = getKeywords(method)
    const results = [...keywords, ...oldKeywords.map(key => key.value)]
    console.log(results)
    return addIds(finalize(results))
  }
}
