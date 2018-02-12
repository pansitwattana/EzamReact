import DifferentialChecker from './DifferentialChecker'

test('error', () => {
  const checker = new DifferentialChecker('5x^3+6x^2+4')
  const solution1 = '15x^2+12x'
  const solution2 = '15x^2+6x'
  // f(2+0.001)-f(1)
  // (5*2.001^2+6*2.001^2+4)-(5*2^3+6*2^2+4)
  // expect(checker.dy).toBe(0.084036005)
  expect(checker.isCorrect(solution1)).toBe(true)
  expect(checker.isCorrect(solution2)).toBe(false)
})

test('error', () => {
  const checker = new DifferentialChecker('y=5x^3+6x^2+4')
  const solution1 = 'dy/dx=15x^2+12x'
  const solution2 = 'dy/dx=15x^2+6x'
  const solution3 = "y^'=15x^2+6x"
  // f(2+0.001)-f(1)
  // (5*2.001^2+6*2.001^2+4)-(5*2^3+6*2^2+4)
  // expect(checker.dy).toBe(0.084036005)
  expect(checker.isCorrect(solution1)).toBe(true)
  expect(checker.isCorrect(solution2)).toBe(false)
  expect(checker.isCorrect(solution3)).toBe(false)
})

test('error', () => {
  // f(2+0.001)-f(1)
  // 0.5*2.001^2-0.5*2^2
  const checker = new DifferentialChecker('0.5x^2')
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

test('checkAll method from super', () => {
  const checker = new DifferentialChecker('x^5+3x^7+7x+3x')
  expect(checker.isCorrect('5x^4+21x^6+7+3')).toBe(true)
  const solutions = [
    '5x^4+21x^6+7+3',
    '5x^4+21x^6+10',
    '5x^4+21x^5+10',
  ]
  const results = checker.checkAll(solutions)
  expect(results).toEqual([true, true, false])
})

// failed case in minus
// test('checkAll method from super', () => {
//   const checker = new DifferentialChecker('x^-5')
//   expect(checker.isCorrect('-5x^-4')).toBe(true)
// })

test('check diff y=2x', () => {
  const checker = new DifferentialChecker('y=2x')
  expect(checker.isCorrect('2')).toBe(true)
  const solutions = [
    'dy/dx=2',
    "y^'=2",
    '3',
  ]
  const results = checker.checkAll(solutions)
  expect(results).toEqual([true, true, false])
})
