import checker from './SubstitutionCheck'

test('check formular of s=ut+\\frac{1}{2}at^2', () => {
  expect(checker('s=ut+\\frac{1}{2}at^2', 's=ut+\\frac{1}{2}at^2')).toBe(true)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's-ut=\\frac{1}{2}at^2')).toBe(true)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's-ut-\\frac{1}{2}at^2=0')).toBe(true)
  expect(checker('s=ut+\\frac{1}{2}at^2', '0=-s+ut+\\frac{1}{2}at^2')).toBe(true)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's=\\frac{1}{2}at^2+ut')).toBe(true)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's=0.5at^2+ut')).toBe(true)
  expect(checker('s=ut+\\frac{1}{2}at^2', '-s=-0.5at^2-ut')).toBe(true)
})

test('check negative formular of s=ut+\\frac{1}{2}at^2', () => {
  expect(checker('s=ut+\\frac{1}{2}at^2', 's=ut-\\frac{1}{2}at^2')).toBe(false)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's+ut=\\frac{1}{2}at^2')).toBe(false)
  expect(checker('s=ut+\\frac{1}{2}at^2', '-s+ut-\\frac{1}{2}at^2=0')).toBe(false)
  expect(checker('s=ut+\\frac{1}{2}at^2', '0=-s+ut+\\frac{1}{3}at^2')).toBe(false)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's=-\\frac{1}{2}at^2+ut')).toBe(false)
  expect(checker('s=ut+\\frac{1}{2}at^2', 's=0.51at^2+ut')).toBe(false)
  expect(checker('s=ut+\\frac{1}{2}at^2', '-s=-0.5at^2-ut+1')).toBe(false)
})

test('check formular of f=ma with case-sensitive', () => {
  expect(checker('F=MA', 'F=MA')).toBe(true)
  expect(checker('F=MA', 'F=ma')).toBe(true)
  expect(checker('F=MA', 'F=mA')).toBe(true)
  expect(checker('F=MA', 'F=Ma')).toBe(true)
  expect(checker('F=MA', 'f=Ma')).toBe(true)
  expect(checker('F=MA', 'f=mA')).toBe(true)
  expect(checker('F=MA', 'ma=f')).toBe(true)
  expect(checker('F=MA', 'ma=F')).toBe(true)
  expect(checker('F=MA', 'mA=F')).toBe(true)
  expect(checker('F=MA', 'MA=F')).toBe(true)
  expect(checker('F=MA', 'MA-F=0')).toBe(true)
  expect(checker('F=MA', 'F-MA=0')).toBe(true)
  expect(checker('F=MA', 'F-Ma=0')).toBe(true)
  expect(checker('F=MA', '-Ma+F=0')).toBe(true)
})

test('Check Sub Test of 10x', () => {
  expect(checker('10x', '10x')).toBe(true)
  expect(checker('10x', '\\frac{20}{2}x')).toBe(true)
  expect(checker('10x', '5x+5x')).toBe(true)
  expect(checker('10x', '11x-1x')).toBe(true)
  expect(checker('10x', '10\\frac{x^2}{x}')).toBe(null) // this case can't solve
})
