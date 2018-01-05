import ErrorChecker from './ErrorChecker'

test('error', () => {
  const checker = new ErrorChecker('5x^3+6x^2+4')
  const solution1 = '15x^2+12x'
  const solution2 = '15x^2+6x'
  // f(2+0.001)-f(1)
  // (5*2.001^2+6*2.001^2+4)-(5*2^3+6*2^2+4)
  // expect(checker.dy).toBe(0.084036005)
  expect(checker.isCorrect(solution1)).toBe(true)
  expect(checker.isCorrect(solution2)).toBe(false)
})

test('error', () => {
  // f(2+0.001)-f(1)
  // 0.5*2.001^2-0.5*2^2
  const checker = new ErrorChecker('0.5x^2')
  const solution1 = 'x'
  const solution2 = '1.3x'
  const solution3 = '1.2x'
  const solution4 = '1.1x'
  const solution5 = '0.9x'
  const solution6 = '0.8x'
  const solution7 = '0.7x'
  const solution8 = '0.6x'
  const solution9 = '0.5x'
  const solution10 = '1.01x'
  // expect(checker.dy).toBe(0.0020005)
  expect(checker.isCorrect(solution1)).toBe(true)
  // expect(checker.error).toBe(0.0005)
  expect(checker.isCorrect(solution2)).toBe(false)
  // expect(checker.error).toBe(0.5995)
  expect(checker.isCorrect(solution3)).toBe(false)
  // expect(checker.error).toBe(0.3995)
  expect(checker.isCorrect(solution4)).toBe(false)
  // expect(checker.error).toBe(0.1995)
  expect(checker.isCorrect(solution5)).toBe(false)
  // expect(checker.error).toBe(0.2005)
  expect(checker.isCorrect(solution6)).toBe(false)
  // expect(checker.error).toBe(0.4005)
  expect(checker.isCorrect(solution7)).toBe(false)
  // expect(checker.error).toBe(0.6005)
  expect(checker.isCorrect(solution8)).toBe(false)
  // expect(checker.error).toBe(0.8005)
  expect(checker.isCorrect(solution9)).toBe(false)
  // expect(checker.error).toBe(1.0005)
  expect(checker.isCorrect(solution10)).toBe(false)
  // expect(checker.error).toBe(1.0005)
})
