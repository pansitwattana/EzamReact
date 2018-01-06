import solver from './Solver'

test('Solver 5x=7 -> x=7/5', () => {
  const answer = solver('5x=7')
  expect(answer).toBe('7/5')
  expect(answer).toBeDefined()
})

// test('Solver x^3-2x-x^2=0 -> x=-1,0,2', () => {
//   const answer = solver('x^3-2x-x^2=0')
//   expect(answer).toBe('-1,0,2')
// })

// test('Solver x^4+13x^3-43x^2-1045x-3150=0 -> x=-10,-7,-5,9', () => {
//   const answer = solver('x^4+13x^3-43x^2-1045x-3150=0')
//   expect(answer).toBe('-10,-7,-5,9')
// })

test('Solver (x-3)(x+5)=0 -> x=-3,5', () => {
  const answer = solver('(x-3)(x+5)=0')
  // expect(answer).toBe('3,-5')
  expect(answer).toBe('-5,3')
})

// test('Solver x^2+3x+7=0 -> x=1', () => {
//   const answer = solver('x^2+3x+7=0')
//   expect(answer).toBe('−1.5+2.179449i,−1.5−2.179449i')
// })

test('Solver 5y=3 -> y=3/5', () => {
  expect(solver('5y=3', 'y')).toBe('3/5')
})

// test('Solver \\frac{1}{y}=3 -> y=1/3', () => {
//   expect(solver('\\frac{1}{y}=3', 'y')).toBe('1/3')
// })

// test('Solver (1/y)=3 -> y=1/3', () => {
//   expect(solver('(1/y)=3', 'y')).toBe('1/3')
// })

test('Solver y/5=3 -> y=15', () => {
  expect(solver('y/5=3', 'y')).toBe('15')
})

// test('Solver y=(x+\\frac{1}{x})(x-\\frac{1}{x}+1)', () => {
//   const answer = solver('y=(x+(1)/(x))(x-(1)/(x)+1)')
//   expect(solver(answer)).toBe(null)
// })

test('Solver y=5x^2+7 -> can not do error detection', () => {
  const answer = solver('y=5x^2+7')
  expect(answer).toBe(null)
})

// test('y=2x', () => {
//   expect(solver('y=2x')).toBe(null)
// })

test('Solver should return False when Variable is wrong', () => {
  expect(solver('5y=3', 'x')).toBe(null)
})

test('Solver should return False when empty string', () => {
  expect(solver('')).toBeFalsy()
})

// test('Solver for \\left(x-1\\right)^2=\\left(4\\sqrt{x-4}\\right)^2', () => {
//   expect(solver('\\left(x-1\\right)^2=\\left(4\\sqrt{x-4}\\right)^2')).toBe('3')
// })
