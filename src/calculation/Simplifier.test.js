import Simplifier from './Simplifier'

test('5x=4x+40x+7/14', () => {
  expect(Simplifier('5x=4x+40x+7/14')).toBe('5 * x = 44 * x + 1 / 2')
})

test('4x+40x+7/14', () => {
  expect(Simplifier('4x+40x+7/14')).toBe('44 * x + 1 / 2')
})

test('\\frac{dy}{dx}=4x+40x+7/14', () => {
  expect(Simplifier('\\frac{dy}{dx}=4x+40x+7/14')).toBe('dy / dx = 44 * x + 1 / 2')
})