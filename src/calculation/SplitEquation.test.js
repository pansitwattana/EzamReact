import split from './SplitEquation'

test('Split y=5x^3+2 get 5x^3+2', () => {
  const equation = 'y=5x^3+2'
  expect(split(equation).rhs).toBe('5x^3+2')
  expect(split(equation).lhs).toBe('y')
})

test('Split \\frac{dy}{dx}=15x^2+6 get 15x^2+6', () => {
  const equation = '\\frac{dy}{dx}=15x^2+6'
  expect(split(equation).rhs).toBe('15x^2+6')
  expect(split(equation).lhs).toBe('\\frac{dy}{dx}')
})

test('Split non-equation (lhs) get null', () => {
  expect(split('5x^3+2').lhs).toBe(null)
  expect(split('5').lhs).toBe(null)
  expect(split('53').lhs).toBe(null)
  expect(split('53y').lhs).toBe(null)
  expect(split('w53yzx^7').lhs).toBe(null)
})

test('Split non-equation (rhs) get equation', () => {
  expect(split('5x^3+2').rhs).toBe('5x^3+2')
  expect(split('5x2').rhs).toBe('5x2')
})
