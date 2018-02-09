import PhysicsChecker from './PhysicsChecker'

test('Formular of v^2-u^2=2as detection', () => {
  const problem = {
    latex: 'v^2=u^2+2as',
    answers: ['v^2=u^2+2as', '25=4+4*10*s', '25=4+40\\cdot s', 's=21/40']
  }
  const checker = new PhysicsChecker(problem)
  
  expect(checker.isCorrect('v^2-u^2=2as')).toBe(true)
  expect(checker.isCorrect('v^2-2as=u^2')).toBe(true)
  expect(checker.isCorrect('v^2+u^2=2as')).toBe(false)
  expect(checker.isCorrect('v^2=u^2')).toBe(false)
  expect(checker.isCorrect('v^2+u^2+2as=0')).toBe(false)
})