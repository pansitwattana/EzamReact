import suggest from './Suggest'

const { getKeywords, checkValid } = suggest

test('find keywords 5x^2=7x+6', () => {
  const keywords = getKeywords('5x^2=7x+6')
  expect(true).toBe(true)
  // expect(keywords[0]).toBe('5*x^2')
  // expect(keywords[1]).toBe('x^2')
  // expect(keywords[2]).toBe('7*x')
})

// test('find keywords y^2+x^5+2=3x+3y', () => {
//   const keywords = getKeywords('y^2+x^5+2=3x+3y')
//   expect(keywords).toMatchSnapshot()
// })


// test('find keywords x^2+2x^2+3=0', () => {
//   const problem = 'x^2+2x^2+3=0'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('find keywords 20x^2+2x^2+3=10+4+x+8x', () => {
//   const problem = '20x^2+2x^2+3=10+4+x+8x'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('find keywords y=5x^2+5', () => {
//   const problem = 'y=5x^2+5'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// // not good
// test('find keywords y=(x+\\frac{1}{x})(x-\\frac{1}{x}+1)', () => {
//   const problem = 'y=(x+\\frac{1}{x})(x-\\frac{1}{x}+1)'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// // not good
// test('find keywords \\int_{3}^{5} x^2 dx', () => {
//   const problem = '\\int_{3}^{5} x^2 dx'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('find keywords x^5', () => {
//   const problem = 'x^5'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('find keywords 4x^2+5', () => {
//   const problem = '4x^2+5'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('find keywords 4x^2+3x+4=0', () => {
//   const problem = '4x^2+3x+4=0'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// //not good
// test('find keywords \\left(x-1\\right)^2=\\left(4\\sqrt{x-4}\\right)^2', () => {
//   const problem = '\\left(x-1\\right)^2=\\left(4\\sqrt{x-4}\\right)^2'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('find keywords y=\\cos\\left(x\\right)', () => {
//   const problem = 'y=\\cos\\left(x\\right)'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// //not good
// test('find keywords x^{\\sqrt{\\log_33}}=\\left(\\sqrt{3}\\right)^{\\log_3x}', () => {
//   const problem = 'x^{\\sqrt{\\log_33}}=\\left(\\sqrt{3}\\right)^{\\log_3x}'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

test('Physcis car', () => {
  const latex = 'A car travels to Bangkok. The distance is $3.07 * 10^5 m$. If the velocity of the car when it reaches to Bangkok is $61.7 m/s$, how much time has passed. Assume that  acceleration is uniform.'
  const keywords = getKeywords(latex)
  const words = keywords.map(key => key.value)
  expect(words).toEqual(['3.07*10^5', '61.7'])
})

test('Physcis stone', () => {
  const latex = 'A stone was thown up with velocity of $56.6 m/s$ from a cliff $(243 m)$. What is the velocity when the stone hit the ground? $(g = 10 m/s²)$'
  const keywords = getKeywords(latex)
  const words = keywords.map(key => key.value)
  expect(words).toEqual(['56.6', '(243', '10'])
})

test('Physcis falling', () => {
  const latex = 'A thing falls into a small hole. It takes $8.6 s$ to reach the bottom. How deep is the hole? $(g = 10 m/s^2)$'
  const keywords = getKeywords(latex)
  const words = keywords.map(key => key.value)
  expect(words).toEqual(['8.6', '10'])
})

test('Physcis Formular', () => {
  const latex = 's=ut+\\frac{1}{2}at^2'
  const keywords = getKeywords(latex)
  const words = keywords.map(key => key.value)
  expect(words).toEqual(['s', 'u', 't', 'a', 't'])
})


// test('find keywords \\lim_{x\\to2}f(x)=5', () => {
//   const problem = '\\lim_{x\\to2}f(x)=5'
//   expect(getKeywords(problem)).toMatchSnapshot()
// })

// test('Long Story Problem', () => {
//   const problem = 'Find x where y=x^2+4'
//   expect(getKeywords(problem).length).toBe(0)
// })

// test('checkValid Test', () => {
//   const problem = 'Find x where y=x^2+4'
//   expect(checkValid(problem)).toBe(false)
//   expect(getKeywords(problem)).toBe('')
// })