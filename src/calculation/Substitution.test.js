import Substitution from './Substitution'
import { Subsitute } from './index';

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
  expect(answer.toString()).toBe('109/12')
  expect(answer2.toString()).toBe('109/12')
  expect(answer3.toString()).toBe('109/12')
  expect(answer4.toString()).toBe('109/12')
})

test('Eval without variable', () => {
  expect(Subsitute('2', { x: '4' }).toString()).toBe('2')
})

test('Eval 5x^2+4x+x+x/3 -> x=4', () => {
  const answer = Substitution('5x^2+4x+x+x/3', { x: '4' })
  expect(answer.toString()).toBe('304/3')
})

test('Eval 5x^2+4x+x+x/3 -> x=4', () => {
  const answer = Substitution('5x^2+4x+x+x/3', { x: '4' })
  expect(answer.toString()).toBe('304/3')
})

test('Eval 5x^3+6x^2+4 -> x=2+0.001', () => {
  const f20001 = Substitution('5x^3+6x^2+4', { x: '2+0.001' })
  const f2 = Substitution('5x^3+6x^2+4', { x: '2' })
  expect(f20001.toString()).toBe('13616807201/200000000')
  expect(f2.toString()).toBe('68')

  // expect(f20001.value - f2.value).toBe('0.084036005')
})

test('Eval without seconde parameter', () => {
  const answer = Substitution('5x^2+4x+x+x/3')
  expect(answer.toString()).toBe('No variable pass through parameter')
})
