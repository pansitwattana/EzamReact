import PhysicsChecker from './PhysicsChecker'
import { status } from './ErrorChecker'

test('Formular of v^2-u^2=2as detection', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 'v^2=u^2+2as' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  
  expect(checker.isCorrect('v^2-u^2=2as', 0)).toBe(true)
  expect(checker.isCorrect('v^2-2as=u^2', 0)).toBe(true)
  expect(checker.isCorrect('v^2+u^2=2as', 0)).toBe(false)
  expect(checker.isCorrect('v^2=u^2', 0)).toBe(false)
  expect(checker.isCorrect('v^2+u^2+2as=0', 0)).toBe(false)
})

test('Formular of v^2-u^2=2as and method detection', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 'v^2=u^2+2as' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  
  const solutions = ['v^2=u^2+2as', '25=4+4*10*s', '25=4+40\\cdot s', 's=21/40']

  expect(checker.checkAll(solutions)).toEqual([true, true, true, true])
})

test('Formular of v^2-u^2=2as and method detection', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 'v^2=u^2+2as' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  
  const solutions = ['v^2=u^2+2as', 'v^2=56.6^2+2\\cdot 10\\cdot 243', 'v^2=\frac{201589}{25}']

  expect(checker.checkAll(solutions)).toEqual([true, true, null])
})

test('Formular of s=ut+\frac{1}{2}at^2 no method check', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 's=ut+\\frac{1}{2}at^2' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  
  expect(checker.isCorrect('s=ut+1/2at^2', 0)).toBe(true)
  expect(checker.isCorrect('s=ut', 0)).toBe(false)
  expect(checker.isCorrect('s=ut^2', 0)).toBe(false)
  expect(checker.isCorrect('s-ut=1/2at^2', 0)).toBe(true)
  expect(checker.isCorrect('s=ut+\\frac{1}{2}at^2', 0)).toBe(true)
  expect(checker.isCorrect('s=ut+\\frac{1}{2}at^3', 0)).toBe(false)
})

test('Formular of s=ut+\frac{1}{2}at^2 method check', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 's=ut+\\frac{1}{2}at^2' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  const solutions = [
    's=ut+\\frac{1}{2}at^2', 
    's=50*20+\\frac{1}{2}5*20^2',
    's-1000=\\frac{1}{2}5*20^2',
    's-100=\\frac{1}{2}5*20^2',
  ]
  
  expect(checker.checkAll(solutions)).toEqual([true, true, true, false])
})

test('Formular of s=ut+\\frac{1}{2}at^2 method check2', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 's=ut+\\frac{1}{2}at^2' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  const solutions = [
    's=ut+\\frac{1}{2}at^2+a', 
    's=50*20+\\frac{1}{2}5*20^2',
    's-1000=\\frac{1}{2}5*20^2',
    's-100=\\frac{1}{2}5*20^2',
  ]
  
  expect(checker.checkAll(solutions)).toEqual([false, true, true, false])
})

test('Formular of s=ut+\frac{1}{2}at^2 method check2', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 's=ut+\\frac{1}{2}at^2' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  const solutions = [
    's=ut+\\frac{1}{2}at^2', 
    '500=0+\\frac{1}{2}\\cdot a\\cdot30^2',
    '500=a\\cdot450',
    'a=\\frac{450}{500}',
  ]
  
  expect(checker.checkAll(solutions)).toEqual([true, true, true, false])
})

test('Formular of V=IR method check2', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 'V=IR' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  expect(checker.isCorrect('V=IR', 0)).toBe(true)
  expect(checker.isCorrect('v=ir', 0)).toBe(true)
  // expect(checker.isCorrect('\\frac{v}{i}=r', 0)).toBe(true)
})

test('Formular of V=IR check methods', () => {
  const problem = {
    solutions: [{
      answers: [{ latex: 'V=IR' }, { latex: '25=4+4*10*s' }, { latex: '25=4+40\\cdot s' }, { latex: 's=21/40' }]
    }]
  }
  const checker = new PhysicsChecker(problem)
  const solutions = [
    'V=IR', 
    '50=5*R',
    'R=50/5',
    'R=10',
  ]
  
  expect(checker.checkAll(solutions)).toEqual([true, true, true, true])
})

test('2 Formular test of F=ma check methods', () => {
  const problem = {
    solutions: [{
      answers: [{
        latex: 'F=ma'
      }, 
      {
        latex: 'a=\\frac{\\left(5.82\\cdot10^6\\right)}{6.94\\cdot10^9}'
      },
      {
        latex: 'a=\\frac{291}{347000}'
      },
      {
        latex: 's=ut+\\frac{1}{2}at^2'
      },
      {
        latex: 's=57.2\\cdot25.4+\\frac{1}{2}\\cdot\\frac{291}{347000}\\cdot25.4^2',
      }, {
        latex: '\\mathrm{s}=1453.150520979827'
      }]
    }],
    answer: '1453.150520979827',
  }
  const checker = new PhysicsChecker(problem, problem.answer)
  const solutions = ["F=ma", "5.82\\cdot10^6=6.94\\cdot10^9\\cdot a", "a=\\frac{\\left(5.82\\cdot10^6\\right)}{6.94\\cdot10^9}", "a=\\frac{291}{347000}", "s=ut+\\frac{1}{2}at^2", "s=57.2\\cdot25.4+\\frac{1}{2}\\cdot\\frac{291}{347000}\\cdot25.4^2", "\\mathrm{s}=1453.150520979827"]
  
  expect(checker.checkAll(solutions)).toEqual([true, true, true, true, null, true, true])
})