import GetVariables from './GetVariables'

test('get Var from v^2=u^2+2as ', () => {
  expect(GetVariables('v^2=u^2+2as')[0]).toBe('v')
  // expect(GetVariables('v^2=u^2+2as')[1]).toBe('u')
})
