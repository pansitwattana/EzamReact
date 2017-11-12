import suggest from './Suggest'
const { getKeywords, checkValid } = suggest

test('find keywords', () => {
  const keywords = getKeywords('5x^2=7x+6')
  expect(keywords[0]).toBe('5*x^2')
  expect(keywords[1]).toBe('7*x')
})

test('find keywords', () => {
  const keywords = getKeywords('y^2+x^5+2=3x+3y')
  expect(keywords[0]).toBe('y^2')
  expect(keywords[1]).toBe('x^5')
  expect(keywords[2]).toBe('3*x')
})


test('find keywords', () => {
  const problem = 'x^2+2x^2+3=0'
  expect(getKeywords(problem)[0]).toBe('x^2')
})

test('differential problem', () => {
  const problem = 'x^2+2x^2+3=0'
  expect(getKeywords(problem)[0]).toBe('x^2')
})

test('Long Story Problem', () => {
  const problem = 'Find x where y=x^2+4'
  expect(getKeywords(problem).length).toBe(0)
})

test('checkValid Test', () => {
  expect(checkValid('Find x where y=x^2+4')).toBe(false)
})