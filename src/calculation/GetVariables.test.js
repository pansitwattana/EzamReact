import GetVariables from './GetVariables'

test('get Var from v^2=u^2+2as ', () => {
  expect(GetVariables('v^2=u^2+2as')[0]).toBe('v')
  // expect(GetVariables('v^2=u^2+2as')[1]).toBe('u')
})

test('get Var from s=ut+\\frac{1}{2}at^2 ', () => {
  expect(GetVariables('s=ut+\\frac{1}{2}at^2')).toEqual(['s', 'u', 't', 'a'])
  // expect(GetVariables('v^2=u^2+2as')[1]).toBe('u')
})

test('get Var from V=IR', () => {
  expect(GetVariables('V=IR')).toEqual(['v', 'i', 'r'])
  // expect(GetVariables('v^2=u^2+2as')[1]).toBe('u')
})

test('get Var from 2,\\frac{-3}{5}', () => {
  expect(GetVariables('2,\\frac{-3}{5}')).toEqual([])
  // expect(GetVariables('v^2=u^2+2as')[1]).toBe('u')
})
