import EquationChecker from './EquationChecker'

test('5x=7', () => {
  const checker = new EquationChecker('5x=7')
  const correctSolution1 = 'x=7/5'
  const correctSolution2 = 'x=1.4'
  const wrongSolution = 'x=2'
  const wrongSolution2 = 'x=1'
  
  expect(checker.isCorrect(correctSolution1)).toBe(true)
  expect(checker.isCorrect(correctSolution2)).toBe(true)
  expect(checker.isCorrect(wrongSolution)).toBe(false)
  expect(checker.isCorrect(wrongSolution2)).toBe(false)
})

// test('x^3-2x-x^2=0', () => {
//   const checker = new EquationChecker('x^3-2x-x^2=0')
//   const correctSolution1 = 'x(x^2-2-x)=0'
//   const correctSolution2 = 'x(x^2-x-2)=0'
//   const correctSolution3 = 'x(x-2)(x+1)=0'
//   const correctSolution4 = 'x=0,-1,2'
  
//   expect(checker.isCorrect(correctSolution1)).toBe(true)
//   expect(checker.isCorrect(correctSolution2)).toBe(true)
//   expect(checker.isCorrect(correctSolution3)).toBe(true)
//   expect(checker.isCorrect(correctSolution4)).toBe(true)
// })

test('checkAll', () => {
  const checker = new EquationChecker('x=3x+9')
  const solutions = [
    'x=-4.5',
    'x=-9/2',
    'x=0',
    'x=4.5',
  ]
  expect(checker.checkAll(solutions)).toEqual([true, true, false, false])
})
