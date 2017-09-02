const Keys = {
  PLUS: '+',
  MINUS: '-',
  NEGATIVE: 'NEGATIVE',
  TIMES: '*',
  DIVIDE: '/',
  DECIMAL: 'DECIMAL',
  DOT: '.',
  PERIOD: 'PERIOD',
  PERCENT: 'PERCENT',
  CDOT: 'CDOT',
  EQUAL: '=',
  NEQ: 'NEQ',
  GT: 'GT',
  LT: 'LT',
  GEQ: 'GEQ',
  LEQ: 'LEQ',
  FRAC_INCLUSIVE: 'FRAC_INCLUSIVE',
  FRAC_EXCLUSIVE: 'FRAC_EXCLUSIVE',
  ENTER: 'ENTER',
  EXP: 'EXP',
  EXP_2: 'EXP_2',
  EXP_3: 'EXP_3',
  SQRT: 'SQRT',
  CUBE_ROOT: 'CUBE_ROOT',
  RADICAL: 'RADICAL',
  LEFT_PAREN: 'LEFT_PAREN',
  RIGHT_PAREN: 'RIGHT_PAREN',
  LN: 'LN',
  LOG: 'LOG',
  LOG_N: 'LOG_N',
  SIN: 'SIN',
  COS: 'COS',
  TAN: 'TAN',

  // TODO(charlie): Add in additional Greek letters.
  PI: 'PI',
  THETA: 'THETA',

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

  NOOP: 'NOOP',

  // Multi-functional keys.
  FRAC_MULTI: 'FRAC_MULTI',

  // A custom key that captures an arbitrary number of symbols but has no
  // 'default' symbol or action.
  MANY: 'MANY',
}

const Actions = {
  NEWLINE: 'NEWLINE',
  COMMAND: 'COMMAND',
  KEYSTROKE: 'KEYSTROKE',
  TYPE: 'TYPE',
  HIDE: 'HIDE',
}

const KeyAction = (key) => {
  if (key === Keys.ENTER) {
    return Actions.NEWLINE
  } else if (key === Keys.LEFT || key === Keys.RIGHT || key === Keys.BACKSPACE) {
    return Actions.KEYSTROKE
  } else if (key === Keys.SQRT || key === Keys.SIN) {
    return Actions.COMMAND
  } else if (key === Keys.DOWN) {
    return Actions.HIDE
  }

  return Actions.TYPE
}

export { Keys, KeyAction, Actions }
