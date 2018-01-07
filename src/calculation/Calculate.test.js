import { Calculate } from './index'

test('Cal 13616807201/200000000 - 68 -> answer = 16807201/200000000', () => {
  const answer = Calculate('13616807201/200000000-68').toString()
  expect(answer).toBe('0.084036005')
  // expect(answer).toMatchSnapshot()
})

test('Cal 20/5=4', () => {
  expect(Calculate('20/5')).toMatchSnapshot()
  expect(Calculate('20/5')).toBe('4')
  // expect(Calculate('20/5').constant().valueOf()).toBe(4)
})

test('Cal 25^5+8=2.4', () => {
  expect(Calculate('25^5+8')).toMatchSnapshot()
  // expect(Calculate('25^5+8').toString()).toBe('9765633')
  
})

test('Cal //frac{5}{20}=1/4', () => {
  expect(Calculate('\\frac{5}{20}')).toBe('0.25')
  expect(Calculate('\\frac{5}{20}')).toMatchSnapshot()
})

test('Cal 20/5=4', () => {
  expect(Calculate('20/5')).toBe('4')
  expect(Calculate('20/5')).toMatchSnapshot()
  // expect(Calculate('20/5').constant().valueOf()).toBe(4)
})

test('Cal (5*2.001^3+6*2.001^2+4)-(5*2^3+6*2^2+4)=16807201/200000000', () => {
  expect(Calculate('(5*2.001^3+6*2.001^2+4)-(5*2^3+6*2^2+4)')).toBe('0.084036005')
  expect(Calculate('(5*2.001^3+6*2.001^2+4)-(5*2^3+6*2^2+4)')).toMatchSnapshot()
})

test('Cal 0.5*2.001^2-0.5*2^2=4', () => {
  expect(Calculate('0.5*2.001^2-0.5*2^2')).toBe('0.0020005')
  expect(Calculate('0.5*2.001^2-0.5*2^2')).toMatchSnapshot()
})

test('Cal sin(30)=0.5', () => {
  expect(Calculate('\\sin (30 deg)')).toBe('0.5')
})