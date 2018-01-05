import Calculate from './Calculate'

test('Cal 13616807201/200000000 - 68 -> answer = 16807201/200000000', () => {
  const answer = Calculate('13616807201/200000000-68').toString()
  expect(answer).toBe('16807201/200000000')
})

test('Cal 20/5=4', () => {
  expect(Calculate('20/5').toString()).toBe('4')
  expect(Calculate('20/5').constant().valueOf()).toBe(4)
})

test('Cal 25^5+8=2.4', () => {
  expect(Calculate('25^5+8').toString()).toBe('9765633')
  expect(Calculate('25^5+8').constant().valueOf()).toBe(9765633)
})

test('Cal //frac{5}{20}=1/4', () => {
  expect(Calculate('\\frac{5}{20}').toString()).toBe('1/4')
  expect(Calculate('5/20').constant().valueOf()).toBe(0.25)
})

test('Cal 20/5=4', () => {
  expect(Calculate('20/5').toString()).toBe('4')
  expect(Calculate('20/5').constant().valueOf()).toBe(4)
})

test('Cal (5*2.001^3+6*2.001^2+4)-(5*2^3+6*2^2+4)=16807201/200000000', () => {
  expect(Calculate('(5*2.001^3+6*2.001^2+4)-(5*2^3+6*2^2+4)').toString()).toBe('16807201/200000000')
  expect(Calculate('(5*2.001^3+6*2.001^2+4)-(5*2^3+6*2^2+4)').constant().valueOf()).toBe(0.084036005)
})

test('Cal 0.5*2.001^2-0.5*2^2=4', () => {
  expect(Calculate('0.5*2.001^2-0.5*2^2').toString()).toBe('4001/2000000')
  expect(Calculate('0.5*2.001^2-0.5*2^2').constant().valueOf()).toBe(0.0020005)
})
// test('Cal sin(30)=0.5', () => {
//   expect(Calculate('\\sin (30)').toString()).toBe('0.5')
// })