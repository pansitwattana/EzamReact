import Substitution from './Substitution'

test('Eval 2x^2 + y + 1/3 -> x=2, y=3/4', () => {
  const answer = Substitution('2x^2+y+1/3', {
    x: '2',
    y: '3/4',
  })
  const answer2 = Substitution('2x^2+y+1/3', {
    x: '2',
    y: '0.75',
  })
  const answer3 = Substitution('2x^2+y+1/3', {
    y: '6/8',
    x: '4/2',
  })
  const answer4 = Substitution('2x^2+y+1/3', {
    y: '0.3/0.4',
    x: '2*1',
  })
  expect(answer).toBe('109/12')
  expect(answer2).toBe('109/12')
  expect(answer3).toBe('109/12')
  expect(answer4).toBe('109/12')
})

test('Eval 5x^2+4x+x+x/3 -> x=4', () => {
  const answer = Substitution('5x^2+4x+x+x/3', { x: '4' })
  expect(answer).toBe('304/3')
})

test('Eval 5x^2+4x+x+x/3 -> x=4', () => {
  const answer = Substitution('5x^2+4x+x+x/3', { x: '4' })
  expect(answer).toBe('304/3')
})

test('Eval 5x^3+6x^2+4 -> x=2+0.001', () => {
  const f20001 = Substitution('5x^3+6x^2+4', { x: '2+0.001' })
  const f2 = Substitution('5x^3+6x^2+4', { x: '2' })
  expect(f20001).toBe('13616807201/200000000')
  expect(f2).toBe('68')

  // expect(f20001.value - f2.value).toBe('0.084036005')
})

test('Eval without seconde parameter', () => {
  const answer = Substitution('5x^2+4x+x+x/3')
  expect(answer).toBe('No variable pass through parameter')
})
