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
    [Keys.LOG_2, '<=', '>=', Keys.PLUSMINUS, Keys.EXP, Keys.BACKSPACE],
    [Keys.INT, Keys.COS, '7', '8', '9', Keys.DIVIDE],
    [Keys.DIFF, Keys.SQRT, '4', '5', '6', Keys.TIMES],
    [Keys.EXP_3, 'y', '1', 'Keys.EXP_2', 'Keys.EXP_3', Keys.MINUS],
    ['[', ']', ',', '0', Keys.NOTEQUAL, Keys.PLUS],
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
    [Keys.ALPHA, Keys.BETA, 'C', 'd', Keys.EPSILON, 'f(', 'g(x)', 'h(x)'],
    ['i', 'j', 'k', 'l', Keys.MU, 'n', Keys.THETA, 'p'],
    ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
    [Keys.NUMBER, '', ' ', '', '', 'y', 'z', Keys.BACKSPACE],
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
