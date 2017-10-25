import solver from './Solver'

test('Solver 5x=7 -> x=7/5', () => {
  const answer = solver('5x=7')
  expect(answer).toBe('7/5')
  expect(answer).toBeDefined()
})

test('Solver (x-3)(x+5)=0 -> x=-3,5', () => {
  const answer = solver('(x-3)(x+5)=0')
  expect(answer).toBe('3,-5')
  expect(answer).toBe('-5,3')
})

test('Solver x^2+3x+7=0 -> x=1', () => {
  const answer = solver('x^2+3x+7=0')
  expect(answer).toBe('')
})

test('Solver 5y=3 -> y=3/5', () => {
  expect(solver('5y=3', 'y')).toBe('3/5')
})

test('Solver should return False when Variable is wrong', () => {
  expect(solver('5y=3', 'x')).toBe("Variables (x) not found")
})

test('Solver should return False when empty string', () => {
  expect(solver('')).toBeFalsy()
})
