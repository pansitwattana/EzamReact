import checker from './index'
import Constant from './Constant';

const { getResult, checkAnswer } = checker

// checkAnswer function

test('check for answer = 0.5', () => {
  expect(checkAnswer('0.5', '0.05*10')).toBe(true)
  expect(checkAnswer('0.5', '\\frac{1}{2}')).toBe(true)
  expect(checkAnswer('0.5', '1/2')).toBe(true)
})

test('check for 2 answer type Single', () => {
  expect(checkAnswer('5,6', '5,6')).toBe(true)
  expect(checkAnswer('5,6', '5, 6')).toBe(true)
  expect(checkAnswer('5, 6', '5, 6')).toBe(true)
  expect(checkAnswer('5,6', ' 6,5')).toBe(true)
  expect(checkAnswer('5 ,6', '6 ,5')).toBe(true)
  expect(checkAnswer('0.5,5', '\\frac{1}{2},5')).toBe(true)
  expect(checkAnswer('0.5,5', '5,\\frac{1}{2}')).toBe(true)
  expect(checkAnswer('\\frac{1}{2},5,1', '5,1,\\frac{1}{2}')).toBe(true)
  expect(checkAnswer('0.5,5,1,0', '5,1,\\frac{1}{2},0')).toBe(true)
  expect(checkAnswer('0.5,5,1,0', '5.0,1.0000,\\frac{1.0}{2.000},0.0')).toBe(true)
  expect(checkAnswer('0.500,5,1.0,0.0', '5.0,1.0000,\\frac{1.0}{2.000},0.0')).toBe(true)
  
})

test('false check for 2 answer type Single', () => {
  expect(checkAnswer('5,6', '6,6')).toBe(false)
  expect(checkAnswer('5,6', '5, 5')).toBe(false)
  expect(checkAnswer('5, 6', '6')).toBe(false)
  expect(checkAnswer('5,6', ' 5 ')).toBe(false)
  expect(checkAnswer('5 ,6', '')).toBe(false)
  expect(checkAnswer('0.5,5,33', '\\frac{1}{3},5,1')).toBe(false)
  expect(checkAnswer('0.5,5', 'xx')).toBe(false)
  expect(checkAnswer('0.5,5,1', '11121o4opxci091389asoasiofpuoi')).toBe(false)
  expect(checkAnswer('0.5,5,1,0', '5,12,\\frac{1}{2},0')).toBe(false)
})

test('check for 2 answer type Single And Variables', () => {
  expect(checkAnswer('x=5,6', 'x=5,6')).toBe(true)
  expect(checkAnswer('x=5,6', 'x=6,5')).toBe(true)
  expect(checkAnswer('x=5,6', '5,6')).toBe(true)
  expect(checkAnswer('x=5,6', '6,5')).toBe(true)
  expect(checkAnswer('5,6', 'x=6,5')).toBe(true)
  expect(checkAnswer('5,6', 'x=5,6')).toBe(true)
  expect(checkAnswer('5,6', 'x= 6, 5')).toBe(true)
  expect(checkAnswer('5,6,40', 'x=40,6,5')).toBe(true)
  expect(checkAnswer('x=5,6,40', 'x=40,6,5')).toBe(true)
  expect(checkAnswer('x=\\frac{-3}{5}, 2', 'x=2,\\frac{-3}{5}')).toBe(true)
  expect(checkAnswer('x=\\frac{-3}{5}, 2', 'x=2,-0.6')).toBe(true)
  expect(checkAnswer('x=-\\frac{3}{5}, 2', 'x=-\\frac{3}{5},2')).toBe(true)
  expect(checkAnswer('x=5', '5')).toBe(true)
})

test('false check for 2 answer type Single And Variables', () => {
  expect(checkAnswer('x=\\frac{1}{2},6', 'x=5,\\frac{1}{2}')).toBe(false)
  expect(checkAnswer('x=5,6', 'x=6,5,7')).toBe(false)
  expect(checkAnswer('x=5,6', '5,6,7')).toBe(false)
  expect(checkAnswer('x=5,6', '6,5,1')).toBe(false)
  expect(checkAnswer('5,6', 'x=6,5,0')).toBe(false)
  expect(checkAnswer('5', 'x=5,6')).toBe(false)
  expect(checkAnswer('5,6', 'x= 6, 5.1')).toBe(false)
  expect(checkAnswer('5,6,40', 'x=40,0.6,5')).toBe(false)
  expect(checkAnswer('x=5.1,6,40', 'x=40,6,5')).toBe(false)
  expect(checkAnswer('x=\\frac{1}{2},6', 'x=40,6,51')).toBe(false)
  expect(checkAnswer('x=\\frac{-3}{5}, 2', '(5x+3)(x-2)=0')).toBe(false)
})

test('check from 0.01', () => {
  expect(checkAnswer('0.01', '1/100')).toBe(true)
  expect(checkAnswer('1848', 'V=1848')).toBe(true)
  
  expect(checkAnswer('1848', '11848')).toBe(false)
})

test('check from 10x', () => {
  expect(checkAnswer('10x', '10x')).toBe(true)
  expect(checkAnswer('10x', 'dy/dx=10x')).toBe(true)
  expect(checkAnswer('dy/dx=10x', 'dy/dx=10x')).toBe(true)
  expect(checkAnswer('dy/dx=10x', '5*2x')).toBe(true)
  expect(checkAnswer('dy/dx=10x', '10x^2/x')).toBe(null) //this case can't solve
  
  expect(checkAnswer('dy/dx=10x', '10.1x')).toBe(false)
  expect(checkAnswer('dy/dx=10x', '10x^2/2x')).toBe(false)
})

test('check from 89.80', () => {
  expect(checkAnswer('89.80', '89.80')).toBe(true)
  expect(checkAnswer('89.7973', 'v=89.79732735443746')).toBe(true)
  expect(checkAnswer('89.80', 'v=89.79732735443746')).toBe(true)
})

// test('check from 2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}', () => {
//   expect(checkAnswer('2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}', 'dy/dx=-\\frac{1}{x^3}+2x+1-\\frac{1}{x^2}')).toBe(true)
//   expect(checkAnswer('2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}', 'dy/dx=2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}')).toBe(true)

//   expect(checkAnswer('2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}', 'dy/dx=-\\frac{1}{x^3}+2x-1-\\frac{1}{x^2}')).toBe(false)
// })

test('check from \\frac{y^3}{3}+\\frac{5y^2}{2}+20y+c', () => {
  expect(checkAnswer('\\frac{y^3}{3}+\\frac{5y^2}{2}+20y+c', '\\frac{y^3}{3}+\\frac{5y^2}{2}+20y+c')).toBe(true)
  // expect(checkAnswer('\\frac{y^3}{3}+\\frac{5y^2}{2}+20y+c', '\\frac{y^3}{3}+20y+\\frac{5y^2}{2}+c')).toBe(true)
  // expect(checkAnswer('\\frac{y^3}{3}+\\frac{5y^2}{2}+20y', '\\frac{y^3}{3}+10y+10y+\\frac{5y^2}{2}')).toBe(true)

  // expect(checkAnswer('\\frac{y^3}{3}+\\frac{5y^2}{2}+20y+c', '\\frac{y^3}{3}+\\frac{5y^2}{2}+20y')).toBe(false)
})

test('check from answer = "386110.13085910655" and  \\mathrm{s}=386110.13085910655', () => {
  expect(checkAnswer('386110.1308591065', '\\mathrm{s}=386110.13085910655')).toBe(true)

})

// get type function

test('get type single', () => {
  const result = getResult('25')
  expect(result.type).toBe(Constant.Single)
  expect(result.value).toBe('25')
  expect(result.values).toEqual(['25'])
})

test('get type single', () => {
  const result = getResult('\\frac{1}{2}')
  expect(result.type).toBe(Constant.Single)
  expect(result.value).toBe('\\frac{1}{2}')
})

test('get type single(multi values)', () => {
  const result = getResult('5,6')
  expect(result.type).toBe(Constant.Single)
  expect(result.value).toBe('5,6')
  expect(result.values).toEqual(['5', '6'])
})

test('get type single(multi values)', () => {
  const result = getResult('x=5,6')
  expect(result.type).toBe(Constant.Variables)
  expect(result.value).toBe('5,6')
  expect(result.values).toEqual(['5', '6'])
})

test('get type variables (x=...)', () => {
  const result = getResult('x=25')
  expect(result.type).toBe(Constant.Variables)
  expect(result.value).toBe('25')
  expect(result.values).toEqual(['25'])
})

test('get type variables (\\frac{dy}{dx}=3x^2)', () => {
  const result = getResult('\\frac{dy}{dx}=3x^2')
  expect(result.type).toBe(Constant.Function)
  expect(result.value).toBe('3x^2')
  // expect(result.values).toEqual(['3\\cdot{ x}^{2}'])
})

test('get type variables 10x', () => {
  const result = getResult('10x')
  expect(result.type).toBe(Constant.Function)
  expect(result.value).toBe('10x')
  expect(result.values).toEqual(['10x'])
})

test('get type variables 2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}', () => {
  const result = getResult('2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}')
  expect(result.type).toBe(Constant.Function)
  expect(result.value).toBe('2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}')
  expect(result.values).toEqual(['2x+1-\\frac{1}{x^3}-\\frac{1}{x^2}'])
})