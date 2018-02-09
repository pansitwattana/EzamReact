import Simplify from './Simplify'

test('simplify 2 * 1 * x ^ (2 - 1)', () => {
  expect(Simplify('2 * 1 * x ^ (2 - 1)')).toMatchSnapshot()
})

test('simplify 77*3sin(5x/10)', () => {
  expect(Simplify('77*3sin(5x/10)')).toMatchSnapshot()
})

test('simplify 10x+5x+77/3sin(5x/10)', () => {
  expect(Simplify('10x+5x+77/3sin(5x/10)')).toMatchSnapshot()
})