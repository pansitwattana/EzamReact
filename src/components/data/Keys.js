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
  TIMES: '\\cdot',
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
  EXP_1: '\\^1',
  EXP_2: '\\^2',
  EXP_3: '\\^3',
  EXP_4: '\\^4',
  EXP_5: '\\^5',
  EXP_6: '\\^6',
  EXP_7: '\\^7',
  EXP_8: '\\^8',
  EXP_9: '\\^9',

  SUB_1: '\\_1',
  SUB_2: '\\_2',
  SUB_3: '\\_3',
  SUB_4: '\\_4',
  SUB_5: '\\_5',
  SUB_6: '\\_6',
  SUB_7: '\\_7',
  SUB_8: '\\_8',
  SUB_9: '\\_9',

  SQRT: '\\sqrt',
  SQRT_3: '\\sqrt[3]{}',
  SQRT_4: '\\sqrt[4]{}',
  CUBE_ROOT: 'CUBE_ROOT',
  RADICAL: 'RADICAL',
  LEFT_PAREN: 'LEFT_PAREN',
  RIGHT_PAREN: 'RIGHT_PAREN',
  LN: '\\ln',
  LOG: '\\log_{10}',
  LOG_N: 'LOG_N',
  LOG_2: '\\log_{2}',
  SIN: '\\sin',
  COS: '\\cos',
  TAN: 'TAN',
  // TODO(charlie): Add in additional Greek letters.
  
  // control key
  UP: 'UP',
  RIGHT: 'Right',
  DOWN: 'DOWN',
  LEFT: 'Left',
  BACKSPACE: 'Backspace',
  DISMISS: 'DISMISS',
  DELETE: 'Delete',

  JUMP_OUT_PARENTHESES: 'JUMP_OUT_PARENTHESES',
  JUMP_OUT_EXPONENT: 'JUMP_OUT_EXPONENT',
  JUMP_OUT_BASE: 'JUMP_OUT_BASE',
  JUMP_INTO_NUMERATOR: 'JUMP_INTO_NUMERATOR',
  JUMP_OUT_NUMERATOR: 'JUMP_OUT_NUMERATOR',
  JUMP_OUT_DENOMINATOR: 'JUMP_OUT_DENOMINATOR',

  DIFF: '\\frac{dy}{dx}',
  INT: '\\int',
}

const Actions = {
  NEWLINE: 'NEWLINE',
  COMMAND: 'COMMAND',
  COMMANDOPEN: 'COMMANDOPEN',
  KEYSTROKE: 'KEYSTROKE',
  LATEX: 'LATEX',
  LATEXLEFT: 'LATEXLEFT',
  TYPE: 'TYPE',
  HIDE: 'HIDE',
  CLEAR: 'CLEAR',
  ALPHABET: 'ALPHABET',
  NUMBER: 'NUMBER',
  DELETE: 'DELETE',
}

const KeyAction = (key) => {
  if (key === Keys.ENTER) {
    return Actions.NEWLINE
  } else if (key === Keys.LEFT || key === Keys.RIGHT || key === Keys.BACKSPACE) {
    return Actions.KEYSTROKE
  } else if (key === Keys.SQRT) {
    return Actions.COMMAND
  } else if (key === Keys.SIN || key === Keys.COS || key === Keys.TAN) {
    return Actions.COMMANDOPEN
  } else if (key === Keys.LOG || key === Keys.LOG_2 || key === Keys.INT || key === Keys.DIFF || key === Keys.EXP_2 || key === Keys.EXP_3 ||
            key === Keys.PLUSMINUS || key === Keys.ALPHA || key === Keys.BETA || key === Keys.MU || key === Keys.EPSILON || key === Keys.ZETA ||
            key === Keys.NOTEQUAL || key === Keys.SUB_2 || key === Keys.SUB_3 || key === Keys.SUB_4 || key === Keys.SUB_5 || key === Keys.SUB_6 ||
            key === Keys.SUB_7 || key === Keys.SUB_8 || key === Keys.SUB_9 || key === Keys.EXP_4 || key === Keys.EXP_5 || key === Keys.EXP_6 ||
            key === Keys.EXP_7 || key === Keys.EXP_8 || key === Keys.EXP_9 || key === Keys.SIGMA || key === Keys.OMEGA || key === Keys.XI ||
            key === Keys.LN || key === Keys.TIMES || key === Keys.THETA || key === Keys.ETA || key === Keys.PI || key === Keys.IOTA) {
    return Actions.LATEX
  } else if (key === Keys.SQRT_3 || key === Keys.SQRT_4) {
    return Actions.LATEXLEFT
  } else if (key === Keys.DOWN) {
    return Actions.HIDE
  } else if (key === Keys.CLEAR) {
    return Actions.CLEAR
  } else if (key === Keys.ALPHABET) {
    return Actions.ALPHABET
  } else if (key === Keys.NUMBER) {
    return Actions.NUMBER
  } else if (key === Keys.DELETE) {
    return Actions.DELETE
  }

  return Actions.TYPE
}

export { Keys, KeyAction, Actions }
