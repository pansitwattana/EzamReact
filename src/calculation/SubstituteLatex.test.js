import SubstituteLatex from './SubstituteLatex'

test('first case', () => {
  const latex = '4x^2+\\frac{4}{3}=0'
  expect(SubstituteLatex(latex)).toBe('4x^2+1.3=0')
})

test('second case', () => {
  const latex = '\\frac{50}{100}+\\frac{7}{5}=0'
  expect(SubstituteLatex(latex)).toBe('0.5+1.4=0')
})

test('third case', () => {
  const latex = '\\frac{\\frac{7}{5}}{100}=0'
  expect(SubstituteLatex(latex)).toBe('\\frac{1.4}{100}=0')
})
