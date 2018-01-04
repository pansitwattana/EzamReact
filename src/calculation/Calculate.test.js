import Calculate from './Calculate'

test('Cal 13616807201/200000000 - 68 -> answer = 16807201/200000000', () => {
  const answer = Calculate('13616807201/200000000-68')
  expect(answer).toBe('16807201/200000000')
})

test('Cal 20/5=2.4', () => {
  expect(Calculate('20/5')).toBe('4')
})

test('Cal 25^5+8=2.4', () => {
  expect(Calculate('25^5+8')).toBe('9765633')
})

test('Cal //frac{5}{20}=1/4', () => {
  expect(Calculate('\\frac{5}{20}')).toBe('1/4')
})

test('Cal 20/5=2.4', () => {
  expect(Calculate('20/5')).toBe('4')
})

test('Cal sin(30)=0.5', () => {
  expect(Calculate('\\sin (30)')).toBe('0.5')
})