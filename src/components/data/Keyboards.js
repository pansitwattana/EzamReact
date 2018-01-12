import { Keys } from './Keys'

const Math = {
  value: [
    [Keys.LOG, '<', '>', Keys.PLUSMINUS, Keys.EXP, Keys.BACKSPACE],
    [Keys.INT, Keys.SIN, '7', '8', '9', Keys.DIVIDE],
    [Keys.DIFF, Keys.SQRT, '4', '5', '6', Keys.TIMES],
    [Keys.EXP_2, 'x', '1', '2', '3', Keys.MINUS],
    ['(', ')', '.', '0', Keys.EQUAL, Keys.PLUS],
  ],
  down: [
    [Keys.LOG_2, '<=', '>=', null, Keys.EXP, Keys.BACKSPACE],
    [null, Keys.COS, Keys.SUB_7, Keys.SUB_8, Keys.SUB_9, Keys.DIVIDE],
    [Keys.DIFF, Keys.SQRT, Keys.SUB_4, Keys.SUB_5, Keys.SUB_6, Keys.TIMES],
    [Keys.EXP_3, 'y', null, Keys.SUB_2, Keys.SUB_3, Keys.MINUS],
    ['[', ']', ',', '0', Keys.NOTEQUAL, Keys.PLUS],
  ],
  up: [
    [Keys.LN, null, null, null, Keys.EXP, Keys.BACKSPACE],
    [Keys.INT, Keys.COS, Keys.EXP_7, Keys.EXP_8, Keys.EXP_9, Keys.DIVIDE],
    [Keys.DIFF, Keys.SQRT, Keys.EXP_4, Keys.EXP_5, Keys.EXP_6, Keys.TIMES],
    [Keys.EXP_4, 'z', null, Keys.EXP_2, Keys.EXP_3, Keys.MINUS],
    ['{', '}', ',', '0', Keys.NOTEQUAL, Keys.PLUS],
  ],
  symbol: [
    ['log', '<', '>', '±', '^', 'DEL'],
    ['int', 'sin', '7', '8', '9', '÷'],
    ['dy/dx', '√', '4', '5', '6', '×'],
    ['^2', 'x', '1', '2', '3', '-'],
    ['(', ')', '.', '0', '=', '+'],
  ],
  action: Keys.ALPHABET,
}

const Alphabet = {
  value: [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
    [Keys.NUMBER, '', ' ', '', '', 'y', 'z', Keys.BACKSPACE],
  ],
  down: [
    [Keys.ALPHA, Keys.BETA, 'C', Keys.DELTA, Keys.EPSILON, 'f(', 'g(x)', 'h'],
    [Keys.IOTA, 'j', Keys.KAPPA, Keys.LAMBDA, Keys.MU, Keys.ETA, Keys.THETA, Keys.PI],
    ['q', 'r', Keys.SIGMA, Keys.THETA, 'u', 'v', Keys.OMEGA, Keys.XI],
    [Keys.NUMBER, '', ' ', '', '', 'y', Keys.ZETA, Keys.BACKSPACE],
  ],
  up: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    [Keys.NUMBER, '', ' ', '', '', 'Y', 'Z', Keys.BACKSPACE],
  ],
  symbol: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    ['123', ' ', '  ', '   ', '     ', 'Y', 'Z', Keys.BACKSPACE],
  ],
  action: Keys.NUMBER,
}

export { Math, Alphabet }
