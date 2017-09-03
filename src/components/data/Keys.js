const Keys = {
  ALPHABET: 'ALPHABET',
  PLUS: '+',
  MINUS: '-',
  NEGATIVE: 'NEGATIVE',
  TIMES: '*',
  DIVIDE: '/',
  DECIMAL: 'DECIMAL',
  DOT: '.',
  PERIOD: 'PERIOD',
  PERCENT: 'PERCENT',
  CLEAR: 'CLEAR',
  CDOT: 'CDOT',
  EQUAL: '=',
  NEQ: 'NEQ',
  NUMBER: 'NUMBER',
  GT: 'GT',
  LT: 'LT',
  GEQ: 'GEQ',
  LEQ: 'LEQ',
  FRAC_INCLUSIVE: 'FRAC_INCLUSIVE',
  FRAC_EXCLUSIVE: 'FRAC_EXCLUSIVE',
  ENTER: 'ENTER',
  EXP: '^',
  EXP_2: '^2',
  EXP_3: 'EXP_3',
  SQRT: '\\sqrt',
  CUBE_ROOT: 'CUBE_ROOT',
  RADICAL: 'RADICAL',
  LEFT_PAREN: 'LEFT_PAREN',
  RIGHT_PAREN: 'RIGHT_PAREN',
  LN: 'LN',
  LOG: '\\log_{10}',
  LOG_N: 'LOG_N',
  SIN: '\\sin',
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
  COMMANDOPEN: 'COMMANDOPEN',
  KEYSTROKE: 'KEYSTROKE',
  LATEX: 'LATEX',
  TYPE: 'TYPE',
  HIDE: 'HIDE',
  CLEAR: 'CLEAR',
  ALPHABET: 'ALPHABET',
  NUMBER: 'NUMBER',
}

const KeyAction = (key) => {
  if (key === Keys.ENTER) {
    return Actions.NEWLINE
  } else if (key === Keys.LEFT || key === Keys.RIGHT || key === Keys.BACKSPACE) {
    return Actions.KEYSTROKE
  } else if (key === Keys.SQRT) {
    return Actions.COMMAND
  } else if (key === Keys.SIN) {
    return Actions.COMMANDOPEN
  } else if (key === Keys.LOG) {
    return Actions.LATEX
  } else if (key === Keys.DOWN) {
    return Actions.HIDE
  } else if (key === Keys.CLEAR) {
    return Actions.CLEAR
  } else if (key === Keys.ALPHABET) {
    return Actions.ALPHABET
  } else if (key === Keys.NUMBER) {
    return Actions.NUMBER
  }

  return Actions.TYPE
}

export { Keys, KeyAction, Actions }
