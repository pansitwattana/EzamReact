const Keys = {
  // greek letter
  ALPHABET: 'ABC',
  ALPHA: '\\alpha',
  BETA: '\\beta',
  DELTA: '\\delta',
  ETA: '\\eta',
  MU: '\\mu',
  EPSILON: '\\epsilon',
  IOTA: '\\iota',
  KAPTA: '\\kappa',
  PI: '\\pi',
  LAMBDA: '\\lambda',
  THETA: '\\theta',
  SIGMA: '\\sigma',
  XI: '\\xi',
  OMEGA: '\\omega',
  ZETA: '\\zeta',

  // operator
  PLUS: '+',
  MINUS: '-',
  PLUSMINUS: '\\pm',
  NEGATIVE: 'NEGATIVE',
  TIMES: '\cdot',
  DIVIDE: '/',
  DECIMAL: 'DECIMAL',
  DOT: '.',
  PERIOD: 'PERIOD',
  PERCENT: 'PERCENT',
  CLEAR: 'CLEAR',
  CDOT: 'CDOT',
  EQUAL: '=',
  NOTEQUAL: '\\neq',
  NUMBER: '123',
  GT: 'GT',
  LT: 'LT',
  GEQ: 'GEQ',
  LEQ: 'LEQ',
  FRAC_INCLUSIVE: 'FRAC_INCLUSIVE',
  FRAC_EXCLUSIVE: 'FRAC_EXCLUSIVE',
  ENTER: 'Enter',
  EXP: '^',
  EXP_2: '^2',
  EXP_3: '^3',
  EXP_4: '^4',
  EXP_5: '^5',
  EXP_6: '^6',
  EXP_7: '^7',
  EXP_8: '^8',
  EXP_9: '^9',
  SUB_2: '_2',
  SUB_3: '_3',
  SUB_4: '_4',
  SUB_5: '_5',
  SUB_6: '_6',
  SUB_7: '_7',
  SUB_8: '_8',
  SUB_9: '_9',

  SQRT: '\\sqrt ',
  CUBE_ROOT: 'CUBE_ROOT',
  RADICAL: 'RADICAL',
  LEFT_PAREN: 'LEFT_PAREN',
  RIGHT_PAREN: 'RIGHT_PAREN',
  LN: '\\ln ',
  LOG: '\\log_{10}',
  LOG_N: 'LOG_N',
  LOG_2: '\\log_{2}',
  SIN: '\\sin ',
  COS: '\\cos ',
  TAN: 'TAN',
  // TODO(charlie): Add in additional Greek letters.
  
  // control key
  UP: 'UP',
  RIGHT: 'Right',
  DOWN: 'DOWN',
  LEFT: 'Left',
  BACKSPACE: 'Backspace',
  DISMISS: 'DISMISS',

  JUMP_OUT_PARENTHESES: 'JUMP_OUT_PARENTHESES',
  JUMP_OUT_EXPONENT: 'JUMP_OUT_EXPONENT',
  JUMP_OUT_BASE: 'JUMP_OUT_BASE',
  JUMP_INTO_NUMERATOR: 'JUMP_INTO_NUMERATOR',
  JUMP_OUT_NUMERATOR: 'JUMP_OUT_NUMERATOR',
  JUMP_OUT_DENOMINATOR: 'JUMP_OUT_DENOMINATOR',

  DIFF: '\\frac{dy}{dx}',
  INT: '\\int ',
}

const Actions = {
  NEWLINE: 'NEWLINE',
  COMMAND: 'COMMAND',
  COMMANDOPEN: 'COMMANDOPEN',
  KEYSTROKE: 'KEYSTROKE',
  LATEX: 'LATEX',
  TYPE: 'TYPE',
  HIDE: 'HIDE',
  CLEAR: 'CLEAR',
  ALPHABET: 'ALPHABET',
  NUMBER: 'NUMBER',
  DELETE: 'DELETE',
}

const KeyAction = (key) => {
  if (key === Keys.BACKSPACE) {
    return Actions.DELETE
  }

  return Actions.TYPE
}

export { Keys as MathJaxKeys, KeyAction, Actions }
