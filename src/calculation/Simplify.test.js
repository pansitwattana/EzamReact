import Simplify from './Simplify'

test('simplify 2 * 1 * x ^ (2 - 1)', () => {
  expect(Simplify('2 * 1 * x ^ (2 - 1)')).toBe('2 * x')
})

test('simplify 77*3sin(5x/10)', () => {
  expect(Simplify('77*3sin(5x/10)')).toBe('231 * sin(x / 2)')
})

test('simplify 10x+5x+77/3sin(5x/10)', () => {
  expect(Simplify('10x+5x+77/3sin(5x/10)')).toBe('15 * x + sin(x / 2) * 77 / 3')
})