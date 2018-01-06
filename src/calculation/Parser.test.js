import parser from './Parser'

test('parse 3x^2', () => {
  const result = parser('3x^2')
  expect(result.toString()).toBe('3*x^2')
})

test('parse x^2+y^3=10x+6', () => {
  const result = parser('x^2+y^3=10x+6')
  expect(result.toString()).toBe('x^2+y^3=10*x+6')
})

test('parse sin(2)', () => {
  const result = parser('\\sin (30)')
  expect(result.toString()).toBe('sin(30)')
})

test('parse \\sin\\left(x\\right)', () => {
  const result = parser('\\sin\\left(x\\right)')
  expect(result.toString()).toBe('sin(x)')
})

test('parse tan(2)', () => {
  const result = parser('\\tan{2}')
  expect(result.toString()).toBe('tan(2)')
})

test('parse sqrt(2)', () => {
  const result = parser('\\sqrt{2}')
  expect(result.toString()).toBe('sqrt(2)')
})

test('parse const latex = \\sin 0.7 + \\tan{32*4x} - \\sqrt {33} + \\cos (8)', () => {
  const latex = '\\sin 0.7 + \\tan{32*4x} - \\sqrt {33} + \\cos (8)'
  expect(parser(latex).toString()).toBe('sin(0.7)+tan(32*4*x)-sqrt(33)+cos(8)')
})
